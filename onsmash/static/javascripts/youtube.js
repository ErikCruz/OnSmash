$(document).ready(function() {
	var playBuffer;
  var loadBuffer;


	 // Inject YouTube API script
  var tag = document.createElement('script');
  tag.src = "//www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  //Padnum function adds '00' for minutes and seconds
  function padnum(number) {
    return (number < 10 ? '0' : '') + number;
  }
  
  var idofvid = $('#mymovie').attr('class');

    $('#mymovie').player({
    video: idofvid,
    width: 655,
    height: 370,    
    playerVars: {controls: 0, showinfo: 0, enablejsapi: 1, iv_load_policy: 3, autoplay: 0, rel: 0, html5: 0,},
    events: {play: onPlay, pause: onPause, end: onEnded,}
  });

  var youtubeplayer = $('#mymovie').data('player');
  
  $( "#video-player" ).hover(function() {
      $('.rapvlog_player_controls_wrap').css("height", "55px");
    }, function() {
      $('.rapvlog_player_controls_wrap').css("height", "0px");
    });

  //onPlay function
  function onPlay(event) {
    $('.rapvlog_player_controls_wrap').css("height", "0px");
    console.log("onPlay triggered");
  	$('.rapvlog_player_controls_playbutton > i').removeClass("fa-play").addClass("fa-pause");
    // Interval Function to update the video time

    playBuffer = setInterval(function(){
    var barwidth = parseInt($('.rapvlog_player_controls_seek').css("width"));  

    $('.rapvlog_player_controls_progress').css("width", youtubeplayer.p.getCurrentTime()/youtubeplayer.p.getDuration()*barwidth+"px");

    var minutes = padnum(Math.floor(youtubeplayer.p.getCurrentTime()/60));
    var seconds = padnum(Math.floor(youtubeplayer.p.getCurrentTime() - minutes * 60));
    //$('.ctime').html(minutes+":"+seconds);

    var dminutes = padnum(Math.floor(youtubeplayer.p.getDuration()/60));
    var dseconds = padnum(Math.floor(youtubeplayer.p.getDuration() - dminutes * 60));
    //$('.ttime').html(dminutes+":"+dseconds);
    $('.rapvlog_player_controls_time').html(minutes+":"+seconds+" / "+dminutes+":"+dseconds);
    }, 250);

   /* bufferIntervar = setInterval(function(){
      console.log(youtubeplayer.p.getPlayerState() == 3);
    }, 1000);
   */

    loadBuffer = setInterval(function() {
      var barwidth = parseInt($('.rapvlog_player_controls_seek').css("width"));
      $('.rapvlog_player_controls_buffer').css("width", youtubeplayer.p.getVideoLoadedFraction()*barwidth+"px");
      
    }, 1000);

  }


  function onEnded(event) {
    $('.rapvlog_player_controls_wrap').css("height", "55px");
    clearInterval(playBuffer);
    clearInterval(loadBuffer);
    $('.rapvlog_player_controls_time').html("00:00 / 00:00");
    $('.rapvlog_player_controls_buffer').css("width", "0px");
    $('.rapvlog_player_controls_progress').css("width", "0px");
    $('.rapvlog_player_controls_playbutton > i').removeClass("fa-pause").addClass("fa-play");
  }

  //onPause function
  function onPause(event) {
    $('.rapvlog_player_controls_wrap').css("height", "55px");
    clearInterval(playBuffer);
    clearInterval(loadBuffer);
  	$('.rapvlog_player_controls_playbutton > i').removeClass("fa-pause").addClass("fa-play");
  }

  // function to update the video time
  var updateVideoTime = function(x) {
    var progress = $('.rapvlog_player_controls_seek');
    var maxduration = youtubeplayer.p.getDuration();
    var position = x - progress.offset().left;
    var percentage = 100 * position / progress.width();

    if(percentage > 100) {
      percentage = 100;
    }

    if(percentage < 0) {
      percentage = 0;
    }

    $('.rapvlog_player_controls_progress').css('width', percentage+'%');
    youtubeplayer.p.seekTo(maxduration*percentage/100);
  }

  var timeDrag = false;
  // Play or Pause Video when clicking play-pause button
  $('.rapvlog_player_controls_playbutton').click(function() {
     if(youtubeplayer.p.getPlayerState() != 1) {
      youtubeplayer.p.playVideo();
    }
    else {
      youtubeplayer.p.pauseVideo();
    }  
  });

 // FUNCTION SEEK FOR PROGRESS
  var seekfunction = function(theoffset) {
      var progresswidth = parseInt($('.rapvlog_player_controls_seek').css('width'));
      $('.rapvlog_player_controls_progress').css("width", event.offsetX);
      youtubeplayer.p.seekTo(event.offsetX*youtubeplayer.p.getDuration()/progresswidth);
  }


  $(document).mousemove(function(event) {
    if (timeDrag) {
      seekfunction(event.offsetX);
      console.log("moved mouse");
    }
  });

  // when seeking on progress
  $('.rapvlog_player_controls_seek').mousedown(function(event){
    timeDrag = true;
    seekfunction(event.offsetX); 
  });

  $(document).mouseup(function(event) {
    if (timeDrag) {
      timeDrag = false;
      console.log("mouse up");
      seekfunction(event.offsetX);
    }
  });


  // FUNCTION SEEK FOR BUFFER
/*

  $('.rapvlog_player_controls_buffer').mousemove(function(event) {
    if (timeDrag) {
      seekfunction(event.offsetX);
      console.log("moved mouse");
    }
  });

  // when seeking on progress
  $('.rapvlog_player_controls_buffer').mousedown(function(event){
    timeDrag = true;
    
  });

  $('.rapvlog_player_controls_buffer').mouseup(function(event) {
    if (timeDrag) {
      timeDrag = false;
      console.log("mouse up");
      seekfunction(event.offsetX);
      youtubeplayer.p.playVideo();
    }
  });
*/
  // VOLUME BAR
  var volumeDrag = false;
  $('.rapvlog_player_controls_volume').on('mousedown', function(e) {
    volumeDrag = true;
    updateVolume(e.pageX);
  });
  
  $(document).on('mouseup', function(e) {
    if(volumeDrag) {
      volumeDrag = false;
      updateVolume(e.pageX);
    }
  });

  $(document).on('mousemove', function(e) {
    if(volumeDrag) {
      updateVolume(e.pageX);
    }
  });

  var updateVolume = function(x, vol) {
    var volume = $('.rapvlog_player_controls_volume');
    var percentage;
    if(vol) {
      percentage = vol * 100;
    }
    else {
      var position = x - volume.offset().left;
      percentage = 100 * position / volume.width()-12;
    }

    if(percentage > 100) {
      percentage = 100;
    }
    if(percentage < 0) {
      percentage = 0;
    }

    var pixels = Math.floor(percentage*75/100);
    if(pixels > 62){
      pixels = 62;
    }

    $('.rapvlog_player_controls_volume_bar').css('width', pixels+"px");
    $('.rapvlog_player_controls_volume_handle').css('left', pixels+'px');
    // adjust the volume here;
    youtubeplayer.p.setVolume(percentage);    
  }
  
});