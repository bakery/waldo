Comments = new Meteor.Collection('comments');

Comments.allow({
    insert : function(userId, doc){
        return userId;
    }
});

CommentsSchema = new SimpleSchema({
    createdAt : {
        type : Date,
        denyUpdate: true
    },
    postId : {
        type : String
    },
    userId : {
        type : String
    },
    authorProfile : {
        type : Object,
        blackbox : true
    },
    text : {
        type : String
    }
});

Comments.attachSchema(CommentsSchema);