Router.configure({
    layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
        Router.go('login');
    } else {
        this.next();
    }
}, {
    except: ['login']
});

Router.onBeforeAction(function() {
    GoogleMaps.load();
    this.next();
}, { only: ['showPost'] });


Router.route('/', {
    name: 'feed',
    data : function(){
        return {};
    }
});

Router.route('/login', function(){
    this.layout('layoutClean');
    this.render('login');
});

Router.route('/new-channel', {
    name: 'newChannel'
});

Router.route('/post/:_id', {
    name: 'showPost',
    data : function(){
        return {
            _id : this.params._id
        };
    }
});

Router.route('/people', {
    name: 'people'
});

Router.route('/locations', {
    name: 'locations',
    data : function(){
        return {};
    }
});

Router.route('/location/:_id', {
    name: 'showLocation',
    data : function(){
        return {
            _id : this.params._id
        };
    }
});


Router.route('/channels', {
    name: 'channels',
    data : function(){
        return {};
    }
});

Router.route('/channel/:_id', {
    name: 'showChannel',
    data : function(){
        return {
            _id : this.params._id
        };
    }
});
