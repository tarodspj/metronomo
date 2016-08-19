define(['jquery', 'domready', 'modules/drawTimes','modules/checkAudio', 'modules/audioObject', 'modules/playNote'],
  function($, domready, drawTimes, checkAudio, audioObject, playNote) {
    var timer, audioCtx, noteCount, cuantosDots;
    var delta = 0;
    var curTime = 0.0;

    var AudioContext =  checkAudio;

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

    function listeners() {
      $('.tempoData').on('change', function() {

          var idChanged = $(this).attr('class');
          idChanged =  idChanged.replace(' tempoData', '');

          //drawTimes(idChanged);
          drawTimes.draw(idChanged);
      });

      $('.controls').on('click', function() {
          $('body' ).addClass('overlay');
          $('.play-btn' ).removeClass('play');
          window.clearInterval(timer);
      });

      $('#closeOverlay').on('click', function() {
          $('body').removeClass('overlay');
      });

      $('.play-btn').on('click', function() {

        if($(this).data('what') === 'pause') {
          // ====== Pause ====== //
          window.clearInterval(timer);

          $('.counter .dot').attr('style', '');
          $( this ).data('what', 'play').removeClass('play');//.text( 'Play' );

        }
        else {
          // ====== Play ====== //
          curTime =       audioCtx.currentTime;
          noteCount =     parseInt( $('.dot').length);
          cuantosDots =   noteCount;
          schedule();

          $(this).data('what', 'pause').addClass('play');//.text( 'Stop' );

        }
      });
    }

    function start() {
      var $tempoData = $('.tempoData');

      $tempoData.each( function(index, value) {
          drawTimes.draw('counter' + parseInt(index + 1));
      });

    }

    if (AudioContext) {
        audioCtx = audioObject;
        console.log(audioCtx.currentTime);
        domready(function() {
          listeners();
          start();
        });
    }
    else {
        $('body').append('<h1>Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox</h1>');
    }


});
