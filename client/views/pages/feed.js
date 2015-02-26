var subs = new SubsManager();

Template.feed.created = function () {

    var postsPerPage = Meteor.settings.public.waldo.feed.postsPerPage;
    
    Template.feed.current = {};
    Template.feed.current.limit = new ReactiveVar(postsPerPage);
    Template.feed.current.hasMore = new ReactiveVar(true);
    Template.feed.current.ready = new ReactiveVar(false);

    Template.feed.current.posts = function() { 
        return Posts.find({}, {
            sort : {
                createdAt : -1
            },
            limit: Template.feed.current.limit.get()
        });
    };

    this.autorun(function () {
        var location = Helpers.getCurrentLocationOnce();

        if(location){
            var subscription = subs.subscribe('feed', {
                latitude : location.lat, 
                longitude : location.lng
            }, Template.feed.current.limit.get());

            // if subscription is ready, set limit to newLimit
            if (subscription.ready()) {
                Template.feed.current.hasMore.set(
                    Template.feed.current.posts().count() >= Template.feed.current.limit.get()
                );

                Template.feed.current.ready.set(true);
            } else {
                Template.feed.current.ready.set(false);
            }
        }
    });
};

Template.feed.rendered = function(){

    var postsPerPage = Meteor.settings.public.waldo.feed.postsPerPage;

    this.$('.content').scroll(function(e){
        if(Template.feed.current.hasMore.get()){
            ScrollHelper.checkInfiniteBounds($('.content')[0], function(){
                if(Template.feed.current.ready.get()){
                    Template.feed.current.limit.set(Template.feed.current.limit.get()+postsPerPage);
                }
            });
        }
    });
};

Template.feed.helpers({
    posts: function () {
        return Template.feed.current.posts();
    },
    isReady: function () {
        return Template.feed.current.ready.get();
    }
});