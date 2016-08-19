define(['jquery', 'modules/drawTimesLauncher', 'domready'],
  function($, drawTimes, domready) {
    var timer, audioCtx, noteCount, cuantosDots, accentPitch = 700, offBeatPitch = 280;
    var delta = 0;
    var curTime = 0.0;
    var AudioContext =  window.AudioContext // Default
                        || window.webkitAudioContext // Safari and old versions of Chrome
                        || false;
    if (AudioContext) {
        audioCtx = new ( window.AudioContext || window.webkitAudioContext )();
    }
    else {
        $('body').append('<h1>Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox</h1>');
    }

    function schedule() {

      while(curTime < audioCtx.currentTime + 0.1) {
        playNote(curTime);
        updateTime();
      }

      timer = window.setTimeout(schedule, 0.1);
    }

    function updateTime() {
      curTime +=  1;
      noteCount++;
    }

    /* Play note on a delayed interval of t */
    function playNote(t) {

        var note =    audioCtx.createOscillator();
        note.detune.value = 300;
        //note.type = 'sawtooth';

        if( noteCount == cuantosDots  ){
          noteCount = 0;
        }

        if( $( '.svgContainer' ).eq( noteCount ).hasClass( 'specialDot' ) ) {

            note.frequency.value = accentPitch;
        }
        else {
          note.frequency.value = offBeatPitch;
        }

        note.connect( audioCtx.destination );

        note.start( t );
        note.stop( t + 0.09 );

        $( '.svgContainer' ).removeClass( 'active' );
        $( '.svgContainer' ).eq( noteCount ).addClass( 'active' );
    }

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

});
