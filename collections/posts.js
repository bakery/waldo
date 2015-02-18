Posts = new Meteor.Collection('posts');

Posts.allow({
    // XX disabled for now to allow faking users
    insert : function(userId, doc){
        return userId;
    },

    // XX disable this
    remove : function(userId, doc){
        return userId === doc.userId;
    }
});

// XXX Bring this back after simulation
Posts.before.insert(function (userId, doc) {
    try{
        console.log('inserting stuff', doc);

        _.extend(doc, {
            userId : Meteor.userId(),
            authorProfile : Meteor.user().profile, 
            channelIds : _.map(doc.channels, function(c){ return c._id; }),
            location : {
                type : 'Point',
                coordinates : [doc.longitude, doc.latitude]
            }
        });
    
    } catch(e) {
        // simulation
    }
});

Posts.after.insert(function(userId, doc) {

    // do this on the server only
    if(!Meteor.isServer){
        return;
    }

    var postId = this._id;

    // upload image to Imugr

    if(doc.photo && !SimpleSchema.RegEx.Url.exec(doc.photo)){
        var parameters = {
            image: doc.photo,
            apiKey: Meteor.settings.private.imugr.apiKey
        };

        Imgur.upload(parameters, function (error, data) {
            if (error) {
                console.error('error uploading image', error);
            } else {
                Posts.update(postId, {
                    $set : {
                        photo : data.link
                    }
                });
            }
        });
    }

    // track location

    if(doc.locationData && doc.locationData.location &&
        doc.locationData.location.city && doc.locationData.location.country &&
        doc.locationData.location.cc){
        var data = doc.locationData.location;
        var locationId = LocationsHelpers.trackLocation(data.city, data.country, data.cc);

        Posts.update(doc, {
            $set : {
                locationId : locationId
            }
        });

    }

    // process attached links, if any

    var urls = Helpers.findUrls(doc.text);

    if(urls && (urls.length > 0)){
        // only grab the first url

        console.log('investigating link', urls[0]);

        OpenGraphScraper.scrape(urls[0], function(error,results){
            
            if(results && results.success && 
                (_.keys(_.omit(results.data, 'success')).length !== 0)){
                
                Posts.update(doc, {
                    $set : {
                        linkMetadata : _.omit(results.data, 'success')
                    }
                });
            }

        });
    }

    // update geo stats
    //Stats.processCheckin(doc);
    
});

PostSchema = new SimpleSchema({
    createdAt : {
        type : Date,
        denyUpdate: true
    },
    userId : {
        type : String,
        denyUpdate: true
    },
    text : {
        type : String
    },
    latitude : {
        type : Number,
        decimal: true
    },
    longitude : {
        type : Number,
        decimal: true
    },
    locationName : {
        type : String,
        optional : true
    },
    locationData : {
        type : Object,
        blackbox : true,
        optional : true
    },
    photo : {
        type : String,
        optional : true
    },
    media : {
        type : Object,
        optional : true,
        blackbox : true
    },
    authorProfile : {
        type : Object,
        blackbox : true
    },
    device : {
        type : Object,
        blackbox : true,
        optional : true
    },
    geography : {
        type : Object,
        blackbox : true,
        optional : true
    },
    channels : {
        type : [Object],
        blackbox : true
    },
    channelIds : {
        type : [String]
    },
    // locationId is internal location id for generated locations
    locationId : { 
        type : String,
        optional : true
    },
    linkMetadata : {
        type : Object,
        blackbox : true,
        optional : true  
    },
    location : {
        type : Object,
        blackbox : true
    }
});

Posts.attachSchema(PostSchema);

getAllPosts = function(limit){
    return Posts.find({},{
        sort : {
            created : -1
        },
        limit : limit || 100
    });
};