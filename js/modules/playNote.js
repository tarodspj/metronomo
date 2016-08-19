define(['jquery', 'domready','modules/audioObject'],
function($, domready, audioObject) {
  var accentPitch = 700, offBeatPitch = 280, cuantosDots, noteCount;
  domready(function() {
    cuantosDots =   parseInt( $( '.dot' ).length );
    noteCount =     parseInt( $( '.dot' ).length );
  });
  return {
    play: function(t) {
      var audioCtx = audioObject;
        var note = audioCtx.createOscillator();

        note.detune.value = 300;

        if(noteCount == cuantosDots ){
          noteCount = 0;
        }

        if( $('.svgContainer').eq(noteCount).hasClass('specialDot')) {
            note.frequency.value = accentPitch;
        }
        else {
          note.frequency.value = offBeatPitch;
        }

        note.connect(audioCtx.destination);

        note.start(t);
        note.stop(t + 0.09);

        $('.svgContainer').removeClass('active');
        $('.svgContainer').eq(noteCount).addClass('active');
    }

  };

});
