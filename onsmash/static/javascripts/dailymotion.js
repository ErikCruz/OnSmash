window.onload = function () {
 // This code loads the Dailymotion Javascript SDK asynchronously.
    (function() {
        var e = document.createElement('script'); e.async = true;
        e.src = document.location.protocol + '//api.dmcdn.net/all.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(e, s);
    }());



     // This function init the player once the SDK is loaded
    window.dmAsyncInit = function() {

        function padnum(number) {
            return (number < 10 ? '0' : '') + number;
        }

    	var videoid = $('#mymovie').attr('class');
        var html = 1;
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) { html = 0; }
    	var player = DM.player("mymovie", {video: videoid, width: 655, height: 370, params: {autoplay: 0, chromeless: 1, info: 0, logo: 0, related: 0, html: html}});
        var playerStatus = 0; // 0 means stopped, 1 means playing, 2 means paused
        var vidDuration = 0;
        var timeDrag = false;

        // When the player is ready
        player.addEventListener("apiready", function(e) {
            $('.dmplaypause').css("z-index", "1");
            console.log("the api is ready");
            $('.rapvlog_player_controls_playbutton').click(function() {
            if(playerStatus != 1) {
                    e.target.play();
                }
            else{
                    e.target.pause();
                }  
            });

             $( "#video-player" ).hover(
              function() {
                $('.rapvlog_player_controls_wrap').css("height", "55px");
              }, function() {
                $('.rapvlog_player_controls_wrap').css("height", "0px");
              }
            );

             $('.dmplaypause').click(function() {
                if(playerStatus != 1) {
                    e.target.play();
                }
            else{
                    e.target.pause();
                }  
             });

        });


        // When the player starts playing
        player.addEventListener("playing", function(e) {
            $('.rapvlog_player_controls_wrap').css("height", "0px");
            playerStatus = 1;
            vidDuration = e.target.duration;
            $('.rapvlog_player_controls_playbutton > i').removeClass("fa-play").addClass("fa-pause");
        });

        // When the player is paused
        player.addEventListener("pause", function(e) {
            $('.rapvlog_player_controls_wrap').css("height", "50px");
            playerStatus = 2;
            $('.rapvlog_player_controls_playbutton > i').removeClass("fa-pause").addClass("fa-play");
        });

        // When the player ended
        player.addEventListener("ended", function(e) {
            $('.rapvlog_player_controls_wrap').css("height", "50px");
            $('.rapvlog_player_controls_time').html("00:00 / 00:00");
            $('.rapvlog_player_controls_buffer').css("width", "0px");
            $('.rapvlog_player_controls_progress').css("width", "0px");
            playerStatus = 0;
        });

        // When the player time updates
        player.addEventListener("timeupdate", function(e) {
            var barwidth = parseInt($('.rapvlog_player_controls_seek').css("width"));  

            $('.rapvlog_player_controls_progress').css("width", e.target.currentTime/e.target.duration*barwidth+"px");

            var minutes = padnum(Math.floor(e.target.currentTime/60));
            var seconds = padnum(Math.floor(e.target.currentTime - minutes * 60));
            //$('.ctime').html(minutes+":"+seconds);

            var dminutes = padnum(Math.floor(e.target.duration/60));
            var dseconds = padnum(Math.floor(e.target.duration - dminutes * 60));
            //$('.ttime').html(dminutes+":"+dseconds);
            $('.rapvlog_player_controls_time').html(minutes+":"+seconds+" / "+dminutes+":"+dseconds);
        });

        player.addEventListener("progress", function(e) {
          if(playerStatus != 0) {        
            var barwidth = parseInt($('.rapvlog_player_controls_seek').css("width"));
            $('.rapvlog_player_controls_buffer').css("width", e.target.bufferedTime/e.target.duration*barwidth+"px");
          }
        });

        // SEEKING THROUGH THE VIDEO
        var seekfunction = function(theoffset) {
            var progresswidth = parseInt($('.rapvlog_player_controls_seek').css('width'));
            $('.rapvlog_player_controls_progress').css("width", theoffset);
            player.seek(theoffset*vidDuration/progresswidth);
        }

        $('.rapvlog_player_controls_seek').mousedown(function(event){
            timeDrag = true;
            seekfunction(event.offsetX); 
        });

        $(document).mousemove(function(event) {
            if (timeDrag) {
            seekfunction(event.offsetX);
            console.log("moved mouse");
            }
        });

        $(document).mouseup(function(event) {
            if (timeDrag) {
            timeDrag = false;
            console.log("mouse up");
            seekfunction(event.offsetX);
            
            }
        });

        // VOLUME CONTROL/SEEK
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
            player.setVolume(percentage/100);
          }

    }
}       