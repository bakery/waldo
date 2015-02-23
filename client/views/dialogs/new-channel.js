var validationError = new ReactiveVar(null);

Template.newChannelDialog.helpers({
    validationError : function(){
        return validationError.get();
    }
});

Template.newChannelDialog.rendered = function(){
    var template = this;
    setTimeout(function(){
        template.$('input[name="name"]').focus();
    },2000);
};

AutoForm.hooks({
    channelForm: {
        onSuccess: function(operation, result, template) {
            IonModal.close();
            IonKeyboard.close();
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