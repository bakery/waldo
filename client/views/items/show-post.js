Template.showPost.created = function () {
    
    Template.showPost.current = this;
    Template.showPost.current.ready = new ReactiveVar(false);

    this.autorun(function () {
        var subscription = Meteor.subscribe('post-by-id', Template.showPost.current.data._id);

        if (subscription.ready()) {
            Template.showPost.current.ready.set(true);
        } else {
            Template.showPost.current.ready.set(false);
        }

    });

    Template.showPost.current.getPost = function() { 
        return Posts.findOne({ _id : Template.showPost.current.data._id });
    };
};

Template.showPost.helpers({
    post: function () {
        return Template.showPost.current.getPost();
    },
    isReady: function () {
        return Template.showPost.current.ready.get();
    },
    numberOfLikes : function(){
        return Likes.find({ postId : this._id }).fetch().length;
    },
    notLikedByMe : function(){
        return !Likes.findOne({ postId : this._id, userId : Meteor.userId() });
    },
    numberOfComments : function(){
        return Comments.find({ postId : this._id }).fetch().length;
    },
    comments : function(){
        return  Comments.find({ postId : this._id }, {
            sort : {
                createdAt : -1
            }
        }).fetch();
    },
    mapOptions : function(){
        if (GoogleMaps.loaded()) {
            var post = Template.showPost.current.getPost();
            // We can use the `ready` callback to interact with the map API once the map is ready.
            GoogleMaps.ready('exampleMap', function(map) {
                Tracker.autorun(function (c) {
                    if(Helpers.getCurrentLocationOnce()){
                        var location = Helpers.getCurrentLocationOnce();

                        // Add a marker to the map once it's ready
                        var marker = new google.maps.Marker({
                            position: map.options.center,
                            map: map.instance
                        });

                        // current position
                        var myCurrentLocationMarker = new google.maps.Marker({
                            animation : google.maps.Animation.BOUNCE,
                            position: new google.maps.LatLng(location.lat, location.lng),
                            map: map.instance,
                            icon: new google.maps.MarkerImage('/bluedot.png',
                                null, null, new google.maps.Point(9, 9), new google.maps.Size(17, 17))
                        });

                        c.stop();
                    }
                });
            });

            // Map initialization options
            return {
                center: new google.maps.LatLng(post.latitude, post.longitude),
                panControl : false,
                rotateControl : false,
                streetViewControl : false,
                mapTypeControl : false,
                zoomControl: false,
                zoom: 12
            };
        }
    },
    formattedAddress : function(){
        return this.locationData && this.locationData.location &&
            this.locationData.location.formattedAddress && this.locationData.location.formattedAddress.join(', ');
    }
});

Template.showPost.events({
    'click .btn-like' : function(e,template){
        if(Meteor.user()){
            Likes.insert({
                userId : Meteor.userId(),
                postId : template.data._id,
                authorProfile : Meteor.user().profile
            });
        }
    }
});