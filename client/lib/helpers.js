// global template helpers

var timeRightNow = new ReactiveVar(Helpers.getUTCNow());

setInterval(function(){
    timeRightNow.set(Helpers.getUTCNow());
},1000);

Template.registerHelper('prettyPostContent', function(content){
    // pretty content has pretty short urls

    var urls = Helpers.findUrls(content);

    _.each(urls, function(url){
        content = content.replace(url, 
            '<a target="_blank" href="' + url + '">' + Helpers.shortUrl(url,30) + '</a>'
        );
    });

    return content;
});

Template.registerHelper('toLowerCase', function(value){
    if (value && typeof value === 'string') {
        return value.toLowerCase();
    } else {
        return '';
    }
});

Template.registerHelper('prettyTime', function(time){
    //console.log('running prettyTime', time, 'time right now is', timeRightNow.get());
    return moment(time || this.createdAt).from(timeRightNow.get(),true);
});

Template.registerHelper('currentUserName', function(time){
    return Meteor.user().profile.name;
});

Template.registerHelper('currentUserImageUrl', function(time){
    return Meteor.user().profile.imageUrl;
});

Template.registerHelper('pluralize', function(value, singular, plural){
    return value === 1 ? [value, singular].join(' ') : [value, plural].join(' ');
});

Template.registerHelper('isCordova', function(){
    return Meteor.isCordova;
});

Template.registerHelper('isNotCordova', function(){
    return !Meteor.isCordova;
});

Template.registerHelper('compact', function(string, length){
    return string && string.length > length ? [string.substring(0,length),'...'].join('')  : string;
});