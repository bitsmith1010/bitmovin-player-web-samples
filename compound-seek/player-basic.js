const config = {
  "key": "9042ce90-9b8f-43f2-bf1a-5bb20bf30655",
  logs: {
      level: "debug"
  },
};
const container = document.getElementById('my-player');
const player = new bitmovin.player.Player(container, config);
let endOfRange; // end of time range of
let seekThreshold = 0.50; // beyond this threashold ratio

endOfRange = parseFloat(endOfRange) // use float type
seekThreshold = parseFloat(seekThreshold) // use float type

const source = {
  "hls": "https://eduskunta-od-eu-w-1.videosync.fi/vod-hls-eduskunta/events/amlst:events/eduskunta/60a21290e9660b00de9ac367/video/final/20210517_103259_taysistunto_12_5_2021_klo_18_50_osa_1_plenum_12_5_2021_kl_18_50/playlist.m3u8",
};
player.load(source).then(
  function () {
    console.log('[info] player.load() resolved - success');
//    // remove default handler
//    player.off(bitmovin.player.PlayerEvent.Seek);
    endOfRange = player.getDuration();
//    console.log(`---end:${endOfRange}, seekThreshold:${seekThreshold}`);
//    player.on(bitmovin.player.PlayerEvent.Seek, function(event) {
//      if (event.seekTarget > seekThreshold * endOfRange)
//        compoundSeek(event);
//      else player.seek(event.seekTarget);
//    });
    player.on(bitmovin.player.PlayerEvent.Seek, function(event) {
      console.log("---seek:", event);
      if (event.seekTarget > seekThreshold * endOfRange) {
        console.log("---[!] call compoundSeek()");
        compoundSeek(event);
      }
    });
  },
  function (reason) {
    console.log('[!] player.load() resolved - fail');
  }
);
function compoundSeek(event)
{
  console.log("---[!]compound seek: stop seek");
  player.off(bitmovin.player.PlayerEvent.Seek);
//  player.seek(event.seekTarget, "compound-seek");
//  player.on(bitmovin.player.PlayerEvent.Seeked, seekedCompound);
//    console.log("---seeked:", event);
//    if (event.issuer == "compound-seek")
//      player.on(bitmovin.player.PlayerEvent.Seek);
//  });
}
function seekedCompound(event)
{
  console.log("---seeked compound");
  player.off(bitmovin.player.PlayerEvent.Seeked, seekedCompound);
  player.on(bitmovin.player.PlayerEvent.Seek);
}
