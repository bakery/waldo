Template.mediaCard.events({
    'click .media' : function(e,template){
        var url = template.data.meta.ogUrl;

        if(!url){
            var urls = Helpers.findUrls(template.data.content);
            if(urls && urls.length > 0){
                url = urls[0];
            }
        }

        if(url){
            e.stopImmediatePropagation();
            window.open(url, '_blank', 'location=yes');
            return false;
        }
    }
});