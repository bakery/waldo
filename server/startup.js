Meteor.startup(function(){
    Accounts.loginServiceConfiguration.remove({
        service : 'facebook'
    });

    Accounts.loginServiceConfiguration.insert({
        service     : 'facebook',
        appId       : Meteor.settings.private.facebook.applicationId,
        secret      : Meteor.settings.private.facebook.applicationSecret
    });

    // Accounts.loginServiceConfiguration.insert({
    //     service     : 'meteor-developer',
    //     clientId    : Meteor.settings.private.meteor.clientId,
    //     secret      : Meteor.settings.private.meteor.secret
    // });
});

Meteor.startup(function(){

    Posts._ensureIndex({ location : "2dsphere" });

    // Add user
    // Accounts.createUser({ 
    //     username : 'philip', 
    //     email : 'philip@thebakery.io', 
    //     password:'password', 
    //     profile: { 
    //         name : 'Philip The Baker', 
    //         imageUrl : 'https://avatars0.githubusercontent.com/u/492025?v=3&s=460'
    //     } 
    // });
});