(function() { 
    var video = document.getElementById('video');
    
    navigator.getMedia = 	navigator.getUserMedia || 								
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;
    
    // Capture video 
    navigator.getMedia({ 
      video: true, 
      audio: false 
    }, function(stream) {
      video.srcObject = stream;
      video.play();
    }, function(error){
      // An error occurred 
      // error.code
    });
  })();
  