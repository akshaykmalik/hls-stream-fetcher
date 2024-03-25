# hls-stream-fetcher
Node.js tool for fetching and merging HLS streams into a single MP4 file using FFmpeg.

## Installation
Clone the repository and install the dependencies using npm:

## Usage
To start the application, run the following command: npm start

This will run the HLS stream parser, which will fetch and download the HLS video streams defined in the provided M3U8 playlist files.

## Features

- Parses M3U8 playlist files to extract video stream URLs.
- Downloads HLS video streams.
- Supports both master and media playlist types.
- Downloads independent segments and merges them into a single video file  using Fluent-FFmpeg.

## Configuration

You can configure the application by editing the `.env` file. Here are the available configuration options:

- `MASTER_M3U8_URL`: URL of the master .m3u8 file in HLS (HTTP Live Streaming), which contains references to other variant playlists or media files.
- `REFERER`: he "Referer" header in HTTP requests specifies the URL of the referring page.


