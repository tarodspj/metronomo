define(['jquery', 'domReady!'],
function($) {
  function drawTimes(tempoCounter) {

    var _counter =    $('#' + tempoCounter),
    manyDots =        parseInt($('.' + tempoCounter).val()),
    html;

    _counter.html('');

    if (manyDots < 1) {
      html =    '<div class="nodot"></div>';
      _counter.append(html);
    } else {
      for(var i= 0; i < manyDots; i++) {
        var clase = '';

        if (i == (manyDots - 1) || manyDots == 1)  {
            clase= clase + ' specialDot';
        }

        html= '<div class="svgContainer' + clase + '"><svg class="back" viewBox="-50 -48 300 300" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 100, 100m -75, 0a 75,75 0 1,0 150,0a 75,75 0 1,0 -150,0"></path></svg><svg class="dot" viewBox="0 2 200 200"><path d="M 100, 100m -75, 0a 75,75 0 1,0 150,0a 75,75 0 1,0 -150,0"></path></svg><span>' + parseInt( i+1 ) + '</span></div>';
        _counter.append(html);
      }
    }
  } //drawTimes

  function listeners() {
    $('.tempoData').on('change', function() {

        var idChanged =   $( this ).attr( 'class' );
        idChanged =       idChanged.replace( ' tempoData', '' );

        drawTimes(idChanged);
    });
  }
  function start() {
    var $tempoData = $('.tempoData');

    $tempoData.each( function(index, value) {
        drawTimes('counter' + parseInt(index + 1));
    });

  }

  start();
  listeners();

});
