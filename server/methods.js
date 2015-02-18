Meteor.methods({
    joinChannel : function(channelId){
        PeopleInChannels.insert({
            channelId : channelId,
            userId : Meteor.userId()
        });
    }
});