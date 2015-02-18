var subs = new SubsManager();

Template.channels.created = function () {
    var instance = this;
    //instance.loaded = new ReactiveVar(0);
    instance.data.ready = new ReactiveVar(false);

    instance.autorun(function () {
        var subscription = subs.subscribe('channels');

        // if subscription is ready, set limit to newLimit
        if (subscription.ready()) {
            instance.data.ready.set(true);
        } else {
            instance.data.ready.set(false);
        }

    });

    instance.data.channels = function() { 
        return Channels.find({});
    }
};

Template.channels.helpers({
    channels: function () {
        return Template.instance().data.channels();
    },
    isReady: function () {
        return Template.instance().data.ready.get();
    }
});