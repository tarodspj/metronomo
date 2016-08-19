define(
function() {
  var audioCtx = new window.AudioContext();
  if(audioCtx === undefined) {
    audioCtx = new window.webkitAudioContext();
  }
  return  audioCtx;
  // {
  //   currentTime: function(){
  //     return audioCtx.currentTime;
  //   }
  //};

});
