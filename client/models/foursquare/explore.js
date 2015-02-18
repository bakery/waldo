Foursquare = {
    explore : function(params, callback){
        // helper to get a venue icon
        var __getVenueIcon = function(venue){
            return venue && venue.categories &&
                [venue.categories[0].icon.prefix,'bg_','64',
                    venue.categories[0].icon.suffix].join('');
        };

        var numberOfResultsToFetch = 20;

        var queryParameters = {
            limit : numberOfResultsToFetch,
            sortByDistance : 1
        };

        Meteor.http.call('GET','https://api.foursquare.com/v2/venues/explore',
            {
                params : _.extend({}, this.__authentication(), queryParameters, params)
            },
            function(error, result){
                if(result.statusCode !== 200){
                    return;
                }

                // merge header full location with venue results

                var data = result.data.response;
                var locations = [];

                if(data.headerFullLocation){
                    locations.push({
                        name : data.headerFullLocation
                    });
                }

                if(data.groups && data.groups.length > 0){
                    _.each(data.groups[0].items, function(i){
                        locations.push(
                            _.extend(i.venue, {
                                icon : __getVenueIcon(i.venue)
                            })
                        );
                    });
                }

                if(callback && _.isFunction(callback)){
                    callback.call(null, error, locations);
                }
            }
        );
    },

    __authentication : function(){
        var key = this.__apiKey();
        return {
            client_id : key.clientId,
            client_secret : key.clientSecret,
            m : 'swarm',
            v : '20140806'
        };
    },

    __apiKey : function(){
        return Meteor.settings.public.foursquare;
    }
};