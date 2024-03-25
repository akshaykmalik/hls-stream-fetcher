import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import m3u8Parser from 'm3u8-parser';


/**
 * Downloads video chunks from an m3u8 playlist to a local directory.
 *
 * @param {string} m3u8Url - The URL of the top-level m3u8 playlist.
 * @param {string} referer - The referer URL to use in requests.
 * @param {string} chunksDirectory - The local directory to save chunks to.
 * @returns {Promise<string[]>} Promise resolving to array of paths to downloaded chunks.
 */
async function downloadSegments(m3u8Url, referer, chunksDirectory) {
  const options = {
    headers: {
      Referer: referer,
    },
    body: null,
    method: "GET",
  };
  const response = await fetch(m3u8Url, options);
  const text = await response.text();

  const p = new m3u8Parser.Parser();
  p.push(text);

  let manifest = p.manifest;
  let hightReslutionPlaylist = {};
  let highestResolutionM3u8Url = "";

  if (!manifest.independentSegments && manifest.playlists.length > 0) {
    let playlists = p.manifest.playlists;
    hightReslutionPlaylist = playlists.reduce(
      (prev, curr) => {
        let prevResolution = prev.attributes.RESOLUTION;
        let currResolution = curr.attributes.RESOLUTION;
        let prevRs = prevResolution.height * prevResolution.width;
        let currRs = currResolution.height * currResolution.width;
        if (prevRs < currRs) {
          return curr;
        } else {
          return prev;
        }
      },
      { attributes: { RESOLUTION: { width: 0, height: 0 } } }
    );

    highestResolutionM3u8Url = new URL(
      hightReslutionPlaylist.uri,
      m3u8Url
    ).toString();
    const hrm3u8result = await fetch(highestResolutionM3u8Url, options);
    const hrm3u8text = await hrm3u8result.text();
    p.push(hrm3u8text);
    manifest = p.manifest;
  }
  // Download segments from highest resolution playlist
  let downloadedChunksPath = [];
  let index = 0;
  for (let segment of manifest.segments) {
    let uri = segment.uri;
    let chunkUrl = "";
    if (uri.endsWith(".m3u8")) {
      continue;
    }
    if (uri.startsWith("http")) {
      chunkUrl = uri;
    } else {
      chunkUrl = new URL(uri, highestResolutionM3u8Url);
    }
    let chunkResponse = await fetch(chunkUrl, options);
    let chunkBuffer = await chunkResponse.arrayBuffer();

    if(!fs.existsSync(chunksDirectory)) {
        fs.mkdirSync(chunksDirectory, { recursive: true });
    }

    let filePath = path.join(chunksDirectory, `chunk-${index++}.ts`);

    fs.writeFileSync(filePath, Buffer.from(chunkBuffer));
    downloadedChunksPath.push(filePath);
  }
  return downloadedChunksPath;
}
export { downloadSegments };
