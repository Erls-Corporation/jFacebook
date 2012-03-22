$(document).ready(function() {
    
    
    var jFacebook = $('#main').jFacebook({
        appId: 'YOUR APP ID',
        redirectUri: 'http://www.example.com/myapp.html',
        canvasUri: 'http://apps.facebook.com/myapp/',
        forceRedirectToCanvas: false,
        scope: 'email,read_stream,publish_stream,user_status'
    });
    
    
    
    
    
    
    $('#btn').click(function(){
        FB.api('/me', function(response) {
            console.log(response);
        });
    });
    
});