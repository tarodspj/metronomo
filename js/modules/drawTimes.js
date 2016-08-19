define(['jquery'],
function($) {
  return {
    draw: function(tempoCounter) {
      var counter =    $('#' + tempoCounter),
      manyDots =        parseInt($('.' + tempoCounter).val()),
      html;

      counter.html('');

      if (manyDots < 1) {
        html = '<div class="nodot"></div>';
        counter.append(html);
      } else {
        for(var i= 0; i < manyDots; i++) {
          var clase = '';

          if (i == (manyDots - 1) || manyDots == 1)  {
              clase = clase + ' specialDot';
          }

          html= '<div class="svgContainer' + clase + '"><svg class="back" viewBox="-50 -48 300 300" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 100, 100m -75, 0a 75,75 0 1,0 150,0a 75,75 0 1,0 -150,0"></path></svg><svg class="dot" viewBox="0 2 200 200"><path d="M 100, 100m -75, 0a 75,75 0 1,0 150,0a 75,75 0 1,0 -150,0"></path></svg><span>' + parseInt( i+1 ) + '</span></div>';
          counter.append(html);
        }
      }
    } //drawTimes

  };

});
