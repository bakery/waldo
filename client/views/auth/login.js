Template.login.created = function(){
    Template.current = this;
    Template.current.working = new ReactiveVar(false);
};

Template.login.helpers({
    working : function(){
        return Template.current.working.get();
    }
});

Template.login.events({
    'click .login-facebook' : function () {

        Template.current.working.set(true);

        Meteor.loginWithFacebook(function(err){
            if(!err){
                Router.go('feed');
            } else {
                Template.current.working.set(false);
            }
        });
    }
});