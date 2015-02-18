Template.showChannel.events({
    'click .btn-post' : function(){
        IonModal.open('newPostDialog', {channelId: Template.instance().data.channel._id});
    }
});

Template.showChannel.helpers({
    channel : function(){
        return Template.showChannel.current && Template.showChannel.current.channel();
    },

    posts : function(){
        return Template.showChannel.current && Template.showChannel.current.posts();
    },

    isReady: function () {
        return Template.showChannel.current && Template.showChannel.current.ready.get();
    },

    isCurrentUserAMember : function(){
        return PeopleInChannels.findOne({
            channelId : this._id,
            userId : Meteor.userId()
        });
    },

    joinChannelScript : function(){
        //ugly workaround for now

        var script = "Meteor.call('joinChannel', '{0}', function(error){ \
            if(error){ \
                alert('that did not work :('); \
            }\
        });";

        return Helpers.formatString(script,this._id).replace(/\r?\n|\r/g,'');
    },

    launchPostScript : function(){
        var script = "IonModal.open('newPostDialog', {channelId: '{0}' });";   
        return Helpers.formatString(script, this._id);  
    }
});

Template.showChannel.created = function () {

    var channelId = this.data._id;

    Template.showChannel.current = this;
    
    
    Template.showChannel.current.ready = new ReactiveVar(false);

    this.autorun(function () {
        
        var location = Helpers.getCurrentLocationOnce();

        if(location){
            var sub = Meteor.subscribe('channel-data', channelId, {
                latitude : location.lat, 
                longitude : location.lng
            });

            // if subscription is ready, set limit to newLimit
            if (sub.ready()) {
                Template.showChannel.current.ready.set(true);
            } else {
                Template.showChannel.current.ready.set(false);
            }
        }
    });

    Template.showChannel.current.channel = function() { 
        return Channels.findOne({ _id : channelId });
    };

    Template.showChannel.current.posts = function(){
        return Posts.find({ 
                channelIds : {
                    $in : [channelId] 
                } 
            }, {
            sort : {
                createdAt : -1
            } 
        });
    };
};