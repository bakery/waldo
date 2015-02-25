var subs = new SubsManager();
var postsPerPage = Meteor.settings.public.waldo.feed.postsPerPage;

Template.feed.created = function () {
    
    Template.feed.current = this;

    var instance = this;
    //instance.loaded = new ReactiveVar(0);
    
    instance.limit = new ReactiveVar(postsPerPage);
    instance.hasMore = new ReactiveVar(true);
    instance.data.ready = new ReactiveVar(false);

    instance.data.posts = function() { 
        return Posts.find({}, {
            sort : {
                createdAt : -1
            },
            limit: Template.feed.current.limit.get()
        });
    };

    instance.autorun(function () {
        var location = Helpers.getCurrentLocationOnce();

        if(location){
            var subscription = subs.subscribe('feed', {
                latitude : location.lat, 
                longitude : location.lng
            }, instance.limit.get());

            // if subscription is ready, set limit to newLimit
            if (subscription.ready()) {
                instance.hasMore.set(
                    Template.feed.current.data.posts().count() >= Template.feed.current.limit.get()
                );

                instance.data.ready.set(true);
            } else {
                instance.data.ready.set(false);
            }
        }
    });
};

Template.feed.rendered = function(){
    this.$('.content').scroll(function(e){
        if(Template.feed.current.hasMore.get()){
            ScrollHelper.checkInfiniteBounds($('.content')[0], function(){
                if(Template.feed.current.data.ready.get()){
                    Template.feed.current.limit.set(Template.feed.current.limit.get()+postsPerPage);
                }
            });
        }
    });
};

Template.feed.helpers({
    posts: function () {
        return Template.instance().data.posts();
    },
    isReady: function () {
        return Template.instance().data.ready.get();
    }
});