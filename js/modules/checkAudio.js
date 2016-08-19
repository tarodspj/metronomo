define(
function() {
  var AudioContext =  window.AudioContext || window.webkitAudioContext || false;

  return  AudioContext;

});
