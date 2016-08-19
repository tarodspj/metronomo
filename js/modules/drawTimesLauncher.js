define(['jquery', 'domready', 'modules/drawTimes'],
function($, domready, DrawTimes) {

  function listeners() {
    $('.tempoData').on('change', function() {

        var idChanged =   $( this ).attr( 'class' );
        idChanged =       idChanged.replace( ' tempoData', '' );

        //drawTimes(idChanged);
        DrawTimes.draw(idChanged);
    });
  }

  function start() {
    var $tempoData = $('.tempoData');

    $tempoData.each( function(index, value) {
        //drawTimes('counter' + parseInt(index + 1));
        DrawTimes.draw('counter' + parseInt(index + 1));
    });

  }

  domready(function() {
    start();
    listeners();
  });

});
