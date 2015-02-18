Template.commentBox.events({
    'click .btn-comment' : function(e, template){
        var postId = template.data.postId;
        var commentBox = template.$('input[name="text"]');
        var commentText = commentBox.val();

        Comments.insert({
            createdAt : Helpers.getUTCNow(),
            postId : postId,
            userId : Meteor.userId(),
            text : commentText,
            authorProfile : Meteor.user().profile
        });

        commentBox.val('');
    }
});