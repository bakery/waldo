var subs = new SubsManager();

Template.locations.created = function () {
    var instance = this;
    //instance.loaded = new ReactiveVar(0);
    
    instance.data.ready = new ReactiveVar(false);

    instance.autorun(function () {
        var subscription = subs.subscribe('all-locations');

        // if subscription is ready, set limit to newLimit
        if (subscription.ready()) {
            instance.data.ready.set(true);
        } else {
            instance.data.ready.set(false);
        }

    });

    instance.data.locations = function() { 
        return Locations.find();
    }
};

Template.locations.helpers({
    locations: function () {
        return Template.instance().data.locations();
    },
    isReady: function () {
        return Template.instance().data.ready.get();
    }
});

// Template.locations.helpers({
//     locations : function(){
//         return [
//             { 
//                 name : 'Mandaluyong',
//                 subtitle : 'City in the Philippines',
//                 popularChannels : ['streetfood','murals']
//             },
//             { 
//                 name : 'Makati',
//                 subtitle : 'City in the Philippines',
//                 popularChannels : ['food','coworking','banks']
//             },
//             { 
//                 name : 'Kreuzberg',
//                 subtitle : 'Neighborhood in Berlin, Germany',
//                 popularChannels : ['kebabs','music','coworking']
//             },
//             { 
//                 name : 'Mission',
//                 subtitle : 'Neighborhood in San Francisco, CA',
//                 popularChannels : ['coworking','startups','food']
//             },
//             { 
//                 name : 'Trento',
//                 subtitle : 'City in Italy',
//                 popularChannels : ['food','hiking']
//             }
//         ];
//     }
// });