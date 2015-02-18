Likes = new Meteor.Collection('likes');

Likes.allow({
    insert : function(userId, doc){
        return userId;
    }
});

LikesSchema = new SimpleSchema({
    createdAt : {
        type : Date,
        denyUpdate: true,
        autoValue : function() {
            if (this.isInsert){
                return new Date();
            }
        }
    },
    userId : {
        type : String
    },
    authorProfile : {
        type : Object,
        blackbox : true
    },
    postId : {
        type : String
    }
});

Likes.attachSchema(LikesSchema);