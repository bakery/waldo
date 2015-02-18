var ogs = Npm.require('open-graph-scraper');

OpenGraphScraper = {
    scrape : function(url, callback){
        var options = { 'url': url, timeout:'10000' };
        ogs(options, Meteor.bindEnvironment(callback));
    }
};