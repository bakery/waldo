Template.showLocation.helpers({
    location : function(){
        return Template.showLocation.current.location();
    },

    posts : function(){
        return Template.showLocation.current.posts();
    },

    isReady: function () {
        return Template.showLocation.current.ready.get();
    }
});

Template.showLocation.created = function () {

    Template.showLocation.current = this;

    var locationId = this.data._id;
    
    Template.showLocation.current.ready = new ReactiveVar(false);

    this.autorun(function () {
        var sub = Meteor.subscribe('location-feed', locationId)

        // if subscription is ready, set limit to newLimit
        if (sub.ready()) {
            Template.showLocation.current.ready.set(true);
        } else {
            Template.showLocation.current.ready.set(false);
        }

    });

    Template.showLocation.current.location = function() { 
        return Locations.findOne({ _id : locationId });
    };

    Template.showLocation.current.posts = function(){
        return Posts.find({ locationId : locationId }, {
            sort : {
                createdAt : -1
            } 
        });
    }
};