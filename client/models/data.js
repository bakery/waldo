// temporary data mocks

Channels = {
    _authorChannels : [
        { 
            _id : '1',
            name : 'streetfood'
        },
        { 
            _id : '2',
            name : 'coworking'
        },
        { 
            _id : '3',
            name : 'events'
        }
    ],

    _allChannels : [
        {
            _id : '1',
            name : 'coworking',
            description : 'Best coworking spaces around the world',
            stats : {
                members : 1244,
                posts :  2009,
                locations : 513
            },
            isMember : true
        },
        {
            _id : '2',
            name : 'streetfood',
            description : 'Street food spots',
            stats : {
                members : 11225,
                posts :  '25k',
                locations : '19k'
            },
            isMember : true
        },
        {
            _id : '3',
            name : 'events',
            description : 'Events in major cities.<br>Curated by Eventbrite and Meetup bots',
            stats : {
                members : 11225,
                posts :  '25k',
                locations : '19k'
            }
        }
    ],

    getAllChannels : function(){
        return this._allChannels;
    },

    getAuthorChannels : function(){
        return this._authorChannels;
    },

    getChannelById : function(id){
        return _.find(this._allChannels, function(c){ return c._id === id; });
    }
};

Feed = {

    _posts : [
        { 
            _id : '1',
            content : 'The best drinks in Metro Manila http://foursquare.com/v/hfheu3. Please stop by', 
            locationName : 'Finders Keepers, Manila',
            prettyCheckinTime : '2h ago',
            photo : 'http://i.imgur.com/V9gfBbv.jpg',
            author : {
                name : 'Philip Nuzhnyy',
                profilePicture : 'https://avatars0.githubusercontent.com/u/492025?v=3&s=160' 
            }
        },
        {
            _id : '2', 
            content : 'post 2', 
            locationName : 'Finders Keepers, Manila',
            prettyCheckinTime : '2h ago',
            photo : 'http://i.imgur.com/V9gfBbv.jpg'
        },
        { 
            _id : '3',
            content : 'post 3', 
            locationName : 'Finders Keepers, Manila',
            prettyCheckinTime : '2h ago',
            photo : 'http://i.imgur.com/V9gfBbv.jpg'
        },
        { 
            _id : '4',
            content : 'post 4', 
            locationName : 'Finders Keepers, Manila',
            prettyCheckinTime : '2h ago',
            photo : 'http://i.imgur.com/V9gfBbv.jpg'
        },
        { 
            _id : '5',
            content : 'post 5', 
            locationName : 'Finders Keepers, Manila',
            prettyCheckinTime : '2h ago',
            photo : 'http://i.imgur.com/V9gfBbv.jpg'
        },
        { 
            _id : '6',
            content : 'post 6', 
            locationName : 'Finders Keepers, Manila',
            prettyCheckinTime : '2h ago',
            photo : 'http://i.imgur.com/V9gfBbv.jpg'
        },
        { 
            _id : '7',
            content : 'post 7', 
            locationName : 'Finders Keepers, Manila',
            prettyCheckinTime : '2h ago',
            photo : 'http://i.imgur.com/V9gfBbv.jpg'
        },
        { 
            _id : '8',
            content : 'post 8', 
            locationName : 'Finders Keepers, Manila',
            prettyCheckinTime : '2h ago',
            photo : 'http://i.imgur.com/V9gfBbv.jpg'
        },
        { 
            _id : '9',
            content : 'post 9', 
            locationName : 'Finders Keepers, Manila',
            prettyCheckinTime : '2h ago',
            photo : 'http://i.imgur.com/V9gfBbv.jpg'
        },
        { 
            _id : '10',
            content : 'post 10', 
            locationName : 'Finders Keepers, Manila',
            prettyCheckinTime : '2h ago',
            photo : 'http://i.imgur.com/V9gfBbv.jpg'
        }
    ],

    getPosts : function(){
        return this._posts;
    },

    getPostById : function(id){
        return _.find(this._posts, function(p){ return p._id === id; });
    },

    getPostsForChannel : function(channelId){
        return _.sample(this._posts, Helpers.getRandomInt(1, this._posts.length)); 
    }
};