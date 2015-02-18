Channels = new Meteor.Collection('channels');

Channels.allow({
    // XX disabled for now to allow faking users
    insert : function(userId, doc){
        //return userId;
        return true;
    }
});

Channels.after.insert(function(userId, doc) {
    // channel creator auto joins
    
    PeopleInChannels.insert({
        userId : userId,
        channelId : doc._id
    });
});

ChannelSchema = new SimpleSchema({
    createdAt : {
        type : Date,
        denyUpdate: true,
        autoValue : function() {
            if (this.isInsert){
                return new Date();
            }
        }
    },
    name : {
        type : String,
        regEx : /^[a-zA-z0-9]{3,10}$/,
        unique: true
    },
    description : {
        type : String
    }
});

Channels.attachSchema(ChannelSchema);

PeopleInChannels = new Meteor.Collection('people-in-channels');

PeopleInChannels.allow({
    // XX disabled for now to allow faking users
    insert : function(userId, doc){
        return userId && (doc.userId === userId);
    }
});

PeopleInChannelsSchema = new SimpleSchema({
    userId : {
        type : String
    },
    channelId : {
        type : String
    }
});

ChannelHelpers = {
    chanelIdsForUser : function(userId){
        return PeopleInChannels.find({ userId : userId }).map(function (c) {
            return c.channelId;
        });
    } 
};
