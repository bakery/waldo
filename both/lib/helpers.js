var __currentLocation = new ReactiveVar(null);
var __currentLocationQueriedAlready = false;

Helpers = {
    formatString : function(){
        var str = _.first(arguments);
        var args = _.rest(arguments);
        return str.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    },

    getCurrentLocationOnce : function(){
        Tracker.autorun(function () {
            var position = Geolocation.latLng();

            if(position && !__currentLocationQueriedAlready){
                __currentLocationQueriedAlready = true;
                __currentLocation.set(position);
            }
        });

        return __currentLocation.get();
    },
    getRandomInt : function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomValue : function(valueOrValues){
        return _.isArray(valueOrValues) ? 
                valueOrValues[this.getRandomInt(0, valueOrValues.length - 1)] :
                valueOrValues;
    },
    shortUrl : function(url, l){
        var l = typeof(l) != "undefined" ? l : 50;
        var chunk_l = (l/2);
        var url = url.replace("http://","").replace("https://","");

        if(url.length <= l){ return url; }

        var start_chunk = this.shortString(url, chunk_l, false);
        var end_chunk = this.shortString(url, chunk_l, true);
        return start_chunk + ".." + end_chunk;
    },
    shortString : function(s, l, reverse){
        var stop_chars = [' ','/', '&'];
        var acceptable_shortness = l * 0.80; // When to start looking for stop characters
        var reverse = typeof(reverse) != "undefined" ? reverse : false;
        var s = reverse ? s.split("").reverse().join("") : s;
        var short_s = "";

        for(var i=0; i < l-1; i++){
            short_s += s[i];
            if(i >= acceptable_shortness && stop_chars.indexOf(s[i]) >= 0){
                break;
            }
        }
        if(reverse){ return short_s.split("").reverse().join(""); }
        return short_s;
    },
    /**
    * A utility function to find all URLs - FTP, HTTP(S) and Email - in a text string
    * and return them in an array.  Note, the URLs returned are exactly as found in the text.
    * 
    * @param text
    *            the text to be searched.
    * @return an array of URLs.
    */
    findUrls : function(text) {
        var source = (text || '').toString();
        var urlArray = [];
        var url;
        var matchArray;

        // Regular expression to find FTP, HTTP(S) and email URLs.
        var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

        // Iterate through any URLs in the text.
        while( (matchArray = regexToken.exec( source )) !== null ){
            var token = matchArray[0];
            urlArray.push( token );
        }

        // XX there seems to be a problem with the method grabbig '.' next to the url
        // fix this by explicitly trimming those

        return _.map(urlArray, function(url){
            return Helpers.trimString(url,'.');
        });
    },

    getUTCNow : function(){
        var now = new Date(); 
        return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
            now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()
        );
    },

    escapeRegex : function(string) {
        return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
    },

    trimString : function(str, characters, flags) {
        flags = flags || "g";
        if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
            throw new TypeError("argument must be string");
        }

        if (!/^[gi]*$/.test(flags)) {
            throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
        }

        characters = this.escapeRegex(characters);

        return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
    }
};