define(['jquery', 'domready', 'modules/drawTimesLauncher','modules/checkAudio', 'modules/audioObject', 'modules/playNote'],
  function($, domready, drawTimes, checkAudio, audioObject, playNote) {
    var timer, audioCtx, noteCount, cuantosDots, accentPitch = 700, offBeatPitch = 280;
    var delta = 0;
    var curTime = 0.0;
    var AudioContext =  checkAudio;

    if (AudioContext) {
        audioCtx = audioObject;
        console.log(audioCtx.currentTime);
        domready(function() {
              $('.controls').on('click', function() {
                  $('body' ).addClass('overlay');
                  $('.play-btn' ).removeClass('play');
                  window.clearInterval(timer);
              });
              $('#closeOverlay').on('click', function() {
                  $('body').removeClass('overlay');
              });

          });
    }
    else {
        $('body').append('<h1>Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox</h1>');
    }

    function schedule() {

      while(curTime < audioCtx.currentTime + 0.1) {
        playNote.play(curTime);
        updateTime();
      }

      timer = window.setTimeout(schedule, 0.1);
    }

    function updateTime() {
      curTime +=  1;
      noteCount++;
    }

    /* Play note on a delayed interval of t */


    /* Play and stop button */
    $( '.play-btn' ).on('click', function() {

      if( $( this ).data( 'what' ) === 'pause' ) {
        // ====== Pause ====== //
        window.clearInterval( timer );

        $( '.counter .dot' ).attr( 'style', '' );
        $( this ).data( 'what', 'play' ).removeClass( 'play' );//.text( 'Play' );

      }
      else {
        // ====== Play ====== //
        curTime =       audioCtx.currentTime;
        noteCount =     parseInt( $( '.dot' ).length );
        cuantosDots =   parseInt( $( '.dot' ).length );
        schedule();

        $( this ).data( 'what', 'pause' ).addClass( 'play' );//.text( 'Stop' );

      }
    });

    // Load up dots on pageload


});
