import fetch from 'node-fetch';
import fs from 'fs';

const headers = {
  'Referer': 'https://www.hotstar.com/'
};

const requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};
let file = "https://hssportsprepack.akamaized.net/videos/cricket/1271270125/1271271152/in/hin/v1/hls/plain/media-1/segment-7.ts";
fetch(file, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.buffer();
  })
  .then(buffer => {
    fs.writeFileSync('segment-77.ts', buffer);
    console.log('File downloaded successfully.');
  })
  .catch(error => console.error('Error downloading file:', error));



// let numberOfFiles;
// // Read the current directory
// fs.readdir('.', (err, files) => {
//     if (err) {
//         console.error('Error reading directory:', err);
//         return;
//     }

//     // Filter out only files (exclude directories)
//     const filesOnly = files.filter(file => fs.statSync(file).isFile());

//     // Get the number of files
//     numberOfFiles = filesOnly.length;
// });

// downloadChunks(getChunksUrl('master.m3u8'));