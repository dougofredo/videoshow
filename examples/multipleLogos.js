var videoshow = require('videoshow')
var logolib = require('./lib/logos')

var images = [
  'bkg1.png',
  'bkg2.png',
  'bkg3.png',
]

var logoNames = [
  'logo1.png',
  'logo2.png',
  'logo3.png',
]

var logoPositions = [
  { x:20,y:20 }
]

// var logoPositions = [
//   { x:20,y:20},
//   { x:100,y:20},
//   { x:20,y:80},
// ]

var videoOptions = {
  fps: 25,
  loop: 5, // seconds
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '1980x1080?',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  pixelFormat: 'yuv420p',
}

logolib.videoshowlogos(images,logoNames,logoPositions,videoOptions,function(images,videoOptions) {
      videoshow(images, videoOptions)
        .audio('song.mp3')
        .save('video.mp4')
        .on('start', function (command) {
          console.log('ffmpeg process started: NOW', command)
        })
        .on('error', function (err, stdout, stderr) {
          console.error('Error:', err)
          console.error('ffmpeg stderr:', stderr)
        })
        .on('end', function (output) {
            logolib.removeTemp(images);
          console.error('Video created in:', output)
        })
      }
  )
