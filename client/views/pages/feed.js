var subs = new SubsManager();

Template.feed.created = function () {
    var instance = this;
    //instance.loaded = new ReactiveVar(0);
    
    instance.data.ready = new ReactiveVar(false);

    instance.autorun(function () {
        var location = Helpers.getCurrentLocationOnce();

        if(location){
            var subscription = subs.subscribe('feed', {
                latitude : location.lat, 
                longitude : location.lng
            });

            // if subscription is ready, set limit to newLimit
            if (subscription.ready()) {
                instance.data.ready.set(true);
            } else {
                instance.data.ready.set(false);
            }
        }
    });

    instance.data.posts = function() { 
        return Posts.find({}, {
            sort : {
                createdAt : -1
            }
        });
    }
};

Template.feed.helpers({
    posts: function () {
        return Template.instance().data.posts();
    },
    isReady: function () {
        return Template.instance().data.ready.get();
    }
});