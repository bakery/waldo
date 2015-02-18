var searchResults = new ReactiveVar(null);

Template.pickLocationDialog.created = function(){
    searchResults.set(null);
};

Template.pickLocationDialog.helpers({
    locations : function(){
        return searchResults.get() || PostSession.getSuggestedLocations();
    },

    checkedAttribute : function(location){
        var selectedLocation = PostSession.getSelectedLocation();
        
        return selectedLocation && (
            (location.id === selectedLocation.id) ||  (location.name === selectedLocation.name)
        ) ? 'checked' : '';
    }
});

Template.pickLocationDialog.events({

    'click .search' : function(e, template){
        var what = template.$('input[name="what"]').val();
        var where = template.$('input[name="where"]').val();

        Foursquare.explore({
            near : where, 
            query : what
        }, function(error, locations){
            if(!error){
                searchResults.set(locations);
            }  
        });
    },

    'change input[type="radio"]' : function(e,template){
        var selectedButton = template.$('input:checked');
        var locationId = selectedButton.data('id');
        var locationName = selectedButton.data('name');
        var locations = searchResults.get() || PostSession.getSuggestedLocations();

        
        PostSession.setSelectedLocation(_.find(locations, function(l){
            return (l.id === locationId) || (l.name === locationName);
        }));

         IonModal.close();
    }
});