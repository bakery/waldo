Template.postItem.events({

	'click .post' : function(){
		var data = Template.instance().data;
		Router.go('showPost', { _id : data.post._id });
	},

    'click .post-content > a' : function(e){
        e.stopImmediatePropagation();
        window.open($(e.target).attr('href'), '_blank', 'location=yes');
        return false;
    }
});