var selectedPost = new ReactiveVar();
var subs = new SubsManager();

Template.explore.helpers({
    selectedPost : function(){
        return selectedPost.get();
    },
    isReady : function(){
        return Template.explore.current.ready.get();
    },
    currentLocation : function(){
        return Helpers.getCurrentLocationOnce();
    },
    markers : function(){
        return _.map(Template.explore.current.posts().fetch(), function(p){
            return {
                _id : p._id,
                latitude : p.location.coordinates[1], 
                longitude : p.location.coordinates[0]
            };
        });
    }
});

Template.explore.created = function () {

    selectedPost.set(null);

    MapControl.setOnMarkerClick(function(marker){
        console.log('@@@@@ marker is clicked');
        var markerId = marker.get('_id');
        
        console.log('selected marker is', markerId);
        console.log('text is', Posts.findOne({ _id : markerId }).text);

        _.each(this.getMarkers(), function(m){ m.marker.setOpacity(m._id === markerId ? 1.0 : 0.5); });
        
        selectedPost.set(Posts.findOne({ _id : markerId }));
    });


    Template.explore.current = {};
    Template.explore.current.limit = new ReactiveVar(20);
    Template.explore.current.ready = new ReactiveVar(false);

    Template.explore.current.posts = function() { 
        return Posts.find({}, {
            sort : {
                createdAt : -1
            },
            limit: Template.explore.current.limit.get()
        });
    };

    this.autorun(function () {
        var location = Helpers.getCurrentLocationOnce();

        if(location ){
            var subscription = subs.subscribe('anonymous-feed', {
                latitude : location.lat, 
                longitude : location.lng
            }, Template.explore.current.limit.get());

            // if subscription is ready, set limit to newLimit
            if (subscription.ready()) {
                Template.explore.current.ready.set(true);
            } else {
                Template.explore.current.ready.set(false);
            }
        }
    });
};

// Template.explore.rendered = function(){
//     document.addEventListener("deviceready", function() {
//         if(Meteor.isCordova){
//             MapControl.setup($("#map_canvas")[0]);
//         }
//     });
// };