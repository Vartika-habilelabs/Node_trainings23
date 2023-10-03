
import fs from "fs"
import ytdl from "ytdl-core"
ytdl('https://www.youtube.com/watch?v=ZjBLbXUuyWg&t=313s')
  .pipe(fs.createWriteStream('video.mp4'));