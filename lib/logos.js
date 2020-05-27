var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');

var key = "temptFKCCkvh6qyurDVw16fNX3TtVw76Ba8oN_"
async function videoshowlogos(imgs,logos,logoPositions,videoOptions,callback) {
  var promArray = [];
  var i = imgs.length;
  var newImages = [];
  var hasOnlyOnePosition = false;
  if( logoPositions.length == 1)
  {
      hasOnlyOnePosition = true;
  }
  for( var i = 0;i<imgs.length;i++)
  {
     const output = key + i + ".png";
     var x = 0;
     var y = 0;
     if( hasOnlyOnePosition )
     {
       x = logoPositions[0].x;
       y = logoPositions[0].y;
     } else
     {
       x = logoPositions[i].x;
       y = logoPositions[i].y;
     }
     const posX = x;
     const posY = y;
     const input = "./"+imgs[i];
     const img = "./"+logos[i];
     const index = i;

     const p = new Promise((resolve, reject) => {
         ffmpeg(input)
              .input(img)
              .complexFilter([
                      {
                        filter: 'overlay',
                        options: {
                          x: posX,
                          y: posY,
                      }}
               ])
              .output(output)
              .on('end', function() {
                  resolve({index:index});
              }).on('error', function(err){
                  console.log("error")
              }).run();
       })
       promArray.push(p)
   }

  await Promise.all(promArray).then(values => {
    for( var i = 0;i<values.length;i++)
    {
       imgs[i] = key + values[i].index + ".png";
    }
    callback(imgs,videoOptions);
  });
}

function removeTemp(tempFiles){
  for( var i = 0;i<tempFiles.length;i++)
  {
    fs.unlink(tempFiles[i], function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });
  }
}

module.exports.videoshowlogos = videoshowlogos
module.exports.removeTemp = removeTemp
