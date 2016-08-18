var timer, audioCtx, noteCount, cuantosDots, accentPitch = 700, offBeatPitch = 280;
var delta = 0;
var curTime = 0.0;
var AudioContext =  window.AudioContext // Default
                    || window.webkitAudioContext // Safari and old versions of Chrome
                    || false; 
if (AudioContext) {
    audioCtx =      new ( window.AudioContext || window.webkitAudioContext )();
}
else {
    $( 'body' ).append('<h1>Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox</h1>');
}


function drawTimes( tempoCounter ) {

  var _counter =    $( '#' + tempoCounter ),
  manyDots =        parseInt( $( '.' + tempoCounter ).val() );
    
  _counter.html( '' );
  
  if ( manyDots < 1 ) {
    var html =    '<div class="nodot"></div>';
    _counter.append( html );
  }
  

  for( var i = 0; i < manyDots; i++ ) {
    var clase = '';

    if ( i == (manyDots - 1) || manyDots == 1 )  {
        clase = clase + ' specialDot';
    }

    var html = '<div class="svgContainer' + clase + '"><svg class="back" viewBox="-50 -48 300 300" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 100, 100m -75, 0a 75,75 0 1,0 150,0a 75,75 0 1,0 -150,0"></path></svg><svg class="dot" viewBox="0 2 200 200"><path d="M 100, 100m -75, 0a 75,75 0 1,0 150,0a 75,75 0 1,0 -150,0"></path></svg><span>' + parseInt( i+1 ) + '</span></div>';
      
       
           
    _counter.append( html );
  }
  
} //drawTimes

function clickControls( idChanged, action ) {
    //action bol - true:add - false:less
    console.log( action );
    
    var inputToChange =     $( '.' + idChanged );
    var valor =             parseInt( inputToChange.val() );
    
    if( inputToChange ) {
        inputToChange.val( valor + 1 );
    }
    else {
        inputToChange.val( valor - 1 );
    }
    
    console.log( inputToChange.val() );
    drawTimes( idChanged );
}

function schedule() {
  while( curTime < audioCtx.currentTime + 0.1 ) {

    playNote( curTime );
    updateTime();

  }
  
  timer = window.setTimeout(schedule, 0.1);
}

function updateTime() {

  curTime +=  1;
  noteCount++;

}

/* Play note on a delayed interval of t */
function playNote( t ) {
    
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

/* Add dots when time signature is changed */
$( '.tempoData' ).on( 'change', function() {
  
  var idChanged =   $( this ).attr( 'id' );
  drawTimes( idChanged );
  
});


/* Play and stop button */
$( '.play-btn' ).click(function() {
  
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

$( 'document' ).ready(function() {
  
    var $tempoData = $( '.tempoData' );

    $tempoData.each( function( index, value ) { 
        drawTimes( 'counter' + parseInt( index + 1) );
    });

    $( '.tempoData' ).on( 'change', function() {

        var idChanged =   $( this ).attr( 'class' );
        idChanged =       idChanged.replace( ' tempoData', '' );

        drawTimes( idChanged );
    });
    $( '.controls' ).on( 'click', function() {
        $( 'body' ).addClass( 'overlay' );
        $( '.play-btn' ).removeClass( 'play' );
        window.clearInterval( timer );
    });
    $( '#closeOverlay' ).on( 'click', function() {
        $( 'body' ).removeClass( 'overlay' );
    });
    
});