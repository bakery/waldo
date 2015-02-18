var postText = new ReactiveVar(null);

Template.newPostDialog.created = function(){
    PostSession.reset();
    
    var instance = this;

    if(this.data.channelId){
        instance.data.ready = new ReactiveVar(false);

        instance.autorun(function () {
            var subscription = Meteor.subscribe('channel-by-id', instance.data.channelId);

            // if subscription is ready, set limit to newLimit
            if (subscription.ready()) {
                
                PostSession.setSelectedChannels([
                    Channels.findOne({ _id : instance.data.channelId })
                ]);

                instance.data.ready.set(true);
            } else {
                instance.data.ready.set(false);
            }

        });

    } else {
        instance.data.ready = new ReactiveVar(true);
    }
};

Template.newPostDialog.helpers({

    author : function(){
        return Meteor.user();
    },

    isReady : function () {
        return Template.instance().data.ready.get();
    },

    currentGeoLocation : function(){
        return Geolocation.latLng();
    },

    selectedChannels : function(){
        return PostSession.getSelectedChannels();
    },

    selectedLocation : function(){
        return PostSession.getSelectedLocation();
    },

    postPicture : function(){
        return PostSession.getPicture();
    },

    canPost : function(){
        return PostSession.getSelectedChannels() && PostSession.getSelectedLocation() &&
            postText.get() && (postText.get().length !== 0);
    },

    postButtonCaption : function(){
        var selectedChannels = PostSession.getSelectedChannels();
        return selectedChannels && selectedChannels.length !== 0 ? [
            'Post to',
            _.reduce(selectedChannels, function(memo, channel){
                return memo + '#' + channel.name + ' ';
            }, '')
        ].join(' ') : 'Post';
    },

    postDisabled : function(){
        var canPost = PostSession.getSelectedChannels() && PostSession.getSelectedLocation() &&
            postText.get() && (postText.get().length !== 0);
        return !canPost ? { disabled : 'disabled' } : {};
    } 
});

Template.newPostDialog.events({
    'click .camera' : function(e, template){
        MeteorCamera.getPicture({
            width: 500,
            height: 500,
            quality: 100
        },
            function(error,data){
                if(!error){
                    PostSession.setPicture(data);
                }
            }
        );

        return false;
    }
});

Template.newPostDialog.rendered = function(){

    
    var template = this;
    setTimeout(function(){
        template.$('textarea').focus();
    },2000);


    this.$('textarea').bind('input propertychange', function(){
        postText.set($(this).val());
    });


    // keep an eye on suggested locations from Foursquare

    this.autorun(function(){
        // keep an eye on the location
        var location = Helpers.getCurrentLocationOnce();
        
        if(location){
            Foursquare.explore({ ll : [location.lat, location.lng].join(',') }, function(error,locations){
                
                console.log('setting locations from foursquare', locations);

                PostSession.setSuggestedLocations(locations);

                // automatically set the first location as selected
                
                if(locations && locations.length > 0){
                    PostSession.setSelectedLocation(locations[0]);
                }

            });
        }
    });
};

AutoForm.hooks({
    postForm: {

        beginSubmit: function(){
            IonModal.close();
            IonKeyboard.close();
        },

        before: {
            insert: function(doc, template) {
                var selectedChannels = PostSession.getSelectedChannels();
                var selectedLocation = PostSession.getSelectedLocation();

                if(selectedLocation && selectedLocation.location){
                    // overwrite latitude and longitude on the post

                    _.extend(doc, {
                        latitude : selectedLocation.location.lat,
                        longitude : selectedLocation.location.lng
                    });
                }

                return _.extend(doc, {
                    createdAt : Helpers.getUTCNow(),
                    channels : selectedChannels,
                    locationName : selectedLocation.name,
                    locationData : selectedLocation,
                    photo : PostSession.getPicture() 
                });
            }
        },

        onSuccess: function(operation, result, template) {
        }
    }
});