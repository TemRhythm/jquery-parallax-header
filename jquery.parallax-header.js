/**
 * Parallax header
 * Version: 0.0.1
 * URL: https://github.com/TemRhythm/jquery-parallax-header
 * Description: Create beautiful parallax effect for page header
 * Requires: JQUERY_2.X.X, OTHER_PLUGIN(S), ETC.
 * Author: Tem Rhythm (www.temrhythm.com)
 * Copyright: Copyright 2014 Tem Rhythm
 * License: MIT
 */

// Plugin closure wrapper
// Uses dollar, but calls jQuery to prevent conflicts with other libraries
// Semicolon to prevent breakage with concatenation
// Pass in window as local variable for efficiency (could do same for document)
// Pass in undefined to prevent mutation in ES3
;(function($, document, window, undefined) {
    // Optional, but considered best practice by some
    "use strict";

    // Name the plugin so it's only in one place
    var pluginName = 'parallax_header';

    // Default options for the plugin as a simple object
    var defaults = {
        minHeight: 30,
	      contentWrapper: '#wrapper',
	      headerShadowColor: '#000000'
    };

    // Plugin constructor
    // This is the boilerplate to set up the plugin to keep our actual logic in one place
    function Plugin(element, options) {
        this.element = element;

        // Merge the options given by the user with the defaults
        this.options = $.extend({}, defaults, options)

        // Attach data to the elment
        this.$el      = $(element);
        this.$el.data(name, this);

        this._defaults = defaults;

        var meta = this.$el.data(name + '-opts');
        this.opts = $.extend(this._defaults, options, meta);

        var contentWrapper = $(this.options.contentWrapper);


        var headerContainer= this.$el;
          var headerContainerOrigHeight = this.$el.height();
          var minHeaderHeight = this.options.minHeight;
          var headerShadowColor = this.options.headerShadowColor;
          var shadowContainer = $('<div class="shadowCont"></div>');

        contentWrapper.css('margin-top', +headerContainer.height() + 'px');
        if(contentWrapper.css('background-color') == 'rgba(0, 0, 0, 0)' || contentWrapper.css('background-image') == 'none')
            contentWrapper.css('background-color', '#FFFFFF');

          headerContainer.css({'position': 'fixed',
            'z-index': '-1',
              'top':'0',
              'right':'0',
              'left':'0',
              overflow: 'hidden'
          });
          shadowContainer.css({'background-color': headerShadowColor,
                                  'position': 'absolute',
                                  'opacity': 0,
                                  'right': 0,
                                'bottom': 0,
                                'width': '100%',
                                'height': '100%',
                                'z-index': '-1'});
          headerContainer.append(shadowContainer);
            var headerPaddingY = headerContainer.outerHeight() - headerContainer.height();
            $(document).scroll(function(){
                var scrollPos = $(document).scrollTop();
                shadowContainer.css('opacity', scrollPos/headerContainer.height());
                if(scrollPos >= headerContainerOrigHeight - minHeaderHeight - headerPaddingY){
                    headerContainer.css({'z-index':'1', 'height': minHeaderHeight + 'px'});
                }
                else{
                    headerContainer.css({'z-index':'-1', 'height': headerContainerOrigHeight + 'px'});
                }
            });

        this.init();
    }

    Plugin.prototype = {
        // Public functions accessible to users
        // Prototype methods are shared across all elements
        // You have access to this.options and this.element
        // If your plugin is complex, you can split functionality into more
        // methods like this one

        init: function() {
            // Plugin initializer - prepare your plugin
        }
    };

    $.fn.parallaxHeader = function(options) {
        // Iterate through each DOM element and return it
        return this.each(function() {
            // prevent multiple instantiations
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

    // Private function that is only called by the plugin
    var privateFunction = function() {
        // ...
    }

})(jQuery, document, window);
