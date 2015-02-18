Template.postItem.events({
    'click .post-content > a' : function(e){
        e.stopImmediatePropagation();
        window.open($(e.target).attr('href'), '_blank', 'location=yes');
        return false;
    }
});