ScrollHelper = {
    getNativeMaxScroll: function(scrollEl) {
        function calculateMaxValue(maximum) {
            var $attrs = {};

            distance = ($attrs.distance || '2.5%').trim();
            isPercent = distance.indexOf('%') !== -1;
            return isPercent ?
            maximum * (1 - parseFloat(distance) / 100) :
            maximum - parseFloat(distance);
        }

        var maxValues = {
          left: scrollEl.scrollWidth,
          top:  scrollEl.scrollHeight
        };
        var computedStyle = window.getComputedStyle(scrollEl) || {};
        return {
          left: computedStyle.overflowX === 'scroll' ||
          computedStyle.overflowX === 'auto' ||
          scrollEl.style['overflow-x'] === 'scroll' ?
            calculateMaxValue(maxValues.left) : -1,
          top: computedStyle.overflowY === 'scroll' ||
          computedStyle.overflowY === 'auto' ||
          scrollEl.style['overflow-y'] === 'scroll' ?
            calculateMaxValue(maxValues.top) : -1
        };
    },

    _checkInfiniteBounds: function(scrollEl,callback) {
        var maxScroll = {};
    
        maxScroll = this.getNativeMaxScroll(scrollEl);
        if ((
            maxScroll.left !== -1 &&
            scrollEl.scrollLeft >= maxScroll.left - scrollEl.clientWidth
            ) || (
            maxScroll.top !== -1 &&
            scrollEl.scrollTop >= maxScroll.top - scrollEl.clientHeight
            )) {

            if(callback){
                callback.call(this);
            }
          }
        
    }
};

ScrollHelper.checkInfiniteBounds = _.throttle(ScrollHelper._checkInfiniteBounds,300);