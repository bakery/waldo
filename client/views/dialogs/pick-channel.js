Template.pickChannelDialog.created = function () {
    var instance = this;
    //instance.loaded = new ReactiveVar(0);
    instance.data.ready = new ReactiveVar(false);

    instance.autorun(function () {
        var subscription = Meteor.subscribe('channels');

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

Template.pickChannelDialog.events({
    'change input[type="checkbox"]' : function(e,template){
        var selectedChannelIds = template.$('input:checked').map(function(){
            return $(this).data('id');  
        });
        var selectedChannels = [];

        for(var i=0; i<selectedChannelIds.length; i++){
            selectedChannels.push(Channels.findOne({ _id : selectedChannelIds[i] }));
        }


        console.log('selected', selectedChannels);

        PostSession.setSelectedChannels(selectedChannels);
    }
});

Template.pickChannelDialog.helpers({

    checkedAttribute : function(channel){
        var selectedChannels = PostSession.getSelectedChannels() || [];
        return _.find(selectedChannels, function(c){ return c._id === channel._id; }) ? 'checked' : ''; 
    },

    channels: function () {
        return Template.instance().data.channels();
    },
    isReady: function () {
        return Template.instance().data.ready.get();
    }
});