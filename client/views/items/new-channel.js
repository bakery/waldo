var validationError = new ReactiveVar(null);

Template.newChannel.helpers({
    validationError : function(){
        return validationError.get();
    }
});

AutoForm.hooks({
    channelForm: {

        // beginSubmit: function(){
        //     window.history.back();
        // },

        // before: {
        //     insert: function(doc, template) {
        //     }
        // },

        onSuccess: function(operation, result, template) {
            Router.go('showChannel', { _id : result });
        },

        onError: function(operation, error, template) {
            console.error(operation,error);
            
            if(error.invalidKeys && (error.invalidKeys.length !== 0)){
                var topError = error.invalidKeys[0];
                if(topError.name === 'name'){
                    switch(topError.type){
                        case 'notUnique':
                            validationError.set('There\'s a channel with this name already!');
                            return;

                        case 'regEx':
                            validationError.set('A good channel name has letters and numbers - 3 to 10 of them');
                            return;

                    }
                }
            }

            validationError.set('Something is seriously broken. Sorry :(');
        }
    }
});