Locations = new Meteor.Collection('locations');

LocationSchema = new SimpleSchema({
    createdAt : {
        type : Date,
        denyUpdate: true,
        autoValue : function() {
            if (this.isInsert){
                return new Date();
            }
        }
    },
    city : {
        type : String
    },
    country : {
        type : String
    },
    countryCode : {
        type : String
    },
    posts : {
        type : Number,
        defaultValue : 0,
        optional : true
    }
});

Locations.attachSchema(LocationSchema);

LocationsHelpers = {
    trackLocation : function(city, country, countryCode){
        var existingLocation = Locations.findOne({ city : city, country : country });
        if(existingLocation){
            Locations.update(existingLocation, {
                $inc : {
                    posts : 1
                }
            });

            return existingLocation._id;
        } else {
            return Locations.insert({
                city : city,
                country : country,
                countryCode : countryCode,
                posts : 1
            });
        }
    }
};