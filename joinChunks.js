import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';
import { isMaster } from 'cluster';
// const ffprobe = require('ffprobe-static');
ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);



/**
 * Merges the given array of file chunks into a single destination file.
 *
 * @param {string[]} fileChunksPath - Array of file paths for the chunks to merge
 * @param {string} destinationFilePath - Path for the merged destination file
 */
function mergeChunksToDestination(fileChunksPath, destinationFilePath) {
  let ff = ffmpeg();
  ff = ff.on("end", function () {
    console.log("finnished!");
  });

  for (let fileName of fileChunksPath) {
    ff = ff.input(fileName);
  }

  ff.mergeToFile(destinationFilePath, "/temp");
}

export {mergeChunksToDestination};
