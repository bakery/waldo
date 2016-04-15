Meteor.startup(function(){
  Posts._ensureIndex({ location : "2dsphere" });
});