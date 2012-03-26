;
(function ( $, window, document, undefined ) {
    
    
    
    var pluginName = 'jFacebook';
    
    
    
    var defaults = {
        appId: false,                   // well, the facebook-app-id
        redirectUri : false,            // uri of the app to be loaded in facebook-iframe
        canvasUri: false,               // target for redirect to facebook.com
        forceRedirectToCanvas: true,    // if true: redirects browser to Canvas-Uri
        forceLogin: false,              // if true: opens login-box and permissions dialog
        scope: ''                       // 'email,read_stream,publish_stream' https://developers.facebook.com/docs/authentication/permissions/
    };
    
    
    
    var options = $.extend({}, defaults, options); // is this stupid?
    
    
    
  
    
    /**
     * loadFacebookJs
     * appends <div id="fb-root"></div> into DOM
     * loads facebook-javascript-files with callback
     */
    var loadFacebookJs = function(){
        
        $('body').append('<div id="fb-root"></div>');
        
        $.getScript(document.location.protocol + '//connect.facebook.net/en_US/all.js', onFacebookJsLoaded);
    
    };
    
    
    /**
     * onFacebookJsLoaded
     * initialize facebook-app, check user-status with redirects, show app-container, autogrow
     */
    var onFacebookJsLoaded = function(){
        
        window.fbAsyncInit = function() {
            
            FB.init({
                appId: options.appId, 
                status: true, 
                cookie: true, 
                xfbml: true
            });
            
            
            
            
            
            if (options.forceLogin===true) {
                FB.login(function(response) {}, {
                    scope: options.scope
                });
            //or better?
            //top.location.href = 'https://www.facebook.com/dialog/oauth?client_id=' + options.appId + '&redirect_uri=' + options.redirectUri + '&scope=' + options.scope + '&response_type=token';
            }
            
            
            
            
            /*if not connected/app not authorized go to login-screen*/
            FB.getLoginStatus(function(response) {
                if (response.status !== 'connected') {
                    top.location.href = 'https://www.facebook.com/dialog/oauth?client_id=' + options.appId + '&redirect_uri=' + options.redirectUri + '&scope=' + options.scope + '&response_type=token';
                } 
            });
            
            /*if forceRedirectToCanvas is true and user is not on canvas-url go to cancas-url... reverse frame-buster ^^ */
            if (options.forceRedirectToCanvas === true ) {
                if(top == window) {
                    window.location.replace(options.canvasUri);
                }else{
                    /*show app*/
                    $(options.element).fadeIn('fast');
            
                    /*grow app*/
                    FB.Canvas.setAutoGrow();
                }
                
            }else{
                /*show app*/
                $(options.element).fadeIn('fast');
            
                /*grow app*/
                FB.Canvas.setAutoGrow();
            }
            
            
        };
    
    
    
    };
    
    
    function Plugin(element, options) {
        
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }
    
    
    Plugin.prototype.init = function () {
        
        $(this.element).hide();
        
        options = this.options;
        options.element = this.element;
        
        loadFacebookJs();
    };
    
    
    $.fn[pluginName] = function ( options ) {
        
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };
})(jQuery, window, document);