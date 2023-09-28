
import fs from "fs"
import ytdl from "ytdl-core"
ytdl('https://www.youtube.com/watch?v=HrFlFMK1mKI&list=RDHrFlFMK1mKI&start_radio=1')
  .pipe(fs.createWriteStream('video.mp4'));