import {downloadSegments} from './downloadChunks.js';
import {mergeChunksToDestination} from './joinChunks.js';
import {clearDirectory} from './util.js';
import { config as dotenvxConfig } from '@dotenvx/dotenvx';
dotenvxConfig();

const CHUNKS_DIR = "./fileChunks";
const REFERER = process.env.REFERER;
const MASTER_M3U8_URL = process.env.MASTER_M3U8_URL;

let chunksPath = downloadSegments(MASTER_M3U8_URL, REFERER, CHUNKS_DIR);

chunksPath.then(
    function(chunksPath){
        mergeChunksToDestination(chunksPath, './outputVideo/mergedVideo.mp4');
        // clearDirectory(CHUNKS_DIR);
    },
    function(err){
        console.log(err);
    }
).catch(err => {
  console.log(err);
})


