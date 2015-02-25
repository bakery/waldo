Meteor.publish('channels', function(){
    return Channels.find();
});

Meteor.publish('channel-by-id', function(id){
    return Channels.find({ _id : id });
});

Meteor.publish('all-users', function(){
    return Meteor.users.find();
});

Meteor.publish('feed', function(location, limit){

    check(location, {
        latitude: Number,
        longitude: Number
    });

    check(limit, Number);

    return Posts.find({
            channelIds: { $in: ChannelHelpers.chanelIdsForUser(this.userId) },
            location : { 
                $near : {
                    $geometry: { 
                        type:"Point", 
                        coordinates:[ location.longitude, location.latitude ]
                    },
                    $maxDistance: 20*1000 // 20km 
                }
            }     
        }, {
            limit : limit,
            sort : {
                createdAt : -1
            }
        }
    );
});

Meteor.publish('post-by-id', function(id){
    return [
        Posts.find({ _id : id }),
        Likes.find({ postId : id }),
        Comments.find({ postId : id })
    ];
});

Meteor.publish('location-feed', function(locationId){
    return [
        Posts.find({ 
                channelIds: { $in: ChannelHelpers.chanelIdsForUser(this.userId) },
                locationId : locationId
            }, {
            sort : {
                createdAt : -1
            } 
        }),
        Locations.find({ _id : locationId })
    ];
});

Meteor.publish('channel-data', function(channelId, location){

    check(channelId, String);

    check(location, {
        latitude: Number,
        longitude: Number
    });

    return [
        Posts.find({ 
                channelIds : { $in : [channelId] },
                location : { 
                    $near : {
                        $geometry: { 
                            type:"Point", 
                            coordinates:[ location.longitude, location.latitude ]
                        },
                        $maxDistance: 20*1000 // 20km 
                    }
                }
            }, 
            { sort : { createdAt : -1 } }
        ),
        Channels.find({ _id : channelId }),
        PeopleInChannels.find({ userId : this.userId })
    ];
});

Meteor.publish('all-locations', function(){
    return Locations.find();
});