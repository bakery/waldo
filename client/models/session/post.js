PostSession = {
    __selectedChannelsKey : 'selected-channel',
    __selectedLocationKey : 'selected-location',
    __suggestedLocationsKey : 'suggested-locations',
    __pictureKey : 'post-picture',
    
    getSelectedChannels : function(){
        return Session.get(this.__selectedChannelsKey);
    },

    setSelectedChannels : function(channels){
        Session.set(this.__selectedChannelsKey, channels);
    },

    getSuggestedLocations : function(){
        return Session.get(this.__suggestedLocationsKey);
    },
    
    setSuggestedLocations : function(locations){
        Session.set(this.__suggestedLocationsKey, locations);
    },

    getSelectedLocation : function(){
        return Session.get(this.__selectedLocationKey);
    },

    setSelectedLocation : function(location){
        Session.set(this.__selectedLocationKey, location);
    },

    getPicture : function(){
        return Session.get(this.__pictureKey);
    },

    setPicture : function(picture){
        return Session.set(this.__pictureKey, picture);
    },

    reset : function(){
        var keys = [
            this.__selectedChannelsKey,
            this.__suggestedLocationsKey,
            this.__selectedLocationKey,
            this.__pictureKey
        ];

        _.each(keys, function(k){
            Session.set(k, null);
        });
    }
};