const fs = require('fs').promises

const io = require('socket.io-client')
const socket = io('http://0.0.0.0:9003')

let rooms = {}

const checkFile = async (roomid) => {
  if (!rooms[roomid]) {
    let folders = await fs.readdir('.')
    if (!folders.includes(String(roomid))) {
      await fs.mkdir(String(roomid))
    }
    rooms[roomid] = { speakers: {}, currentFilename: undefined, lastTime: undefined }
  }

  let date = new Date()
  let filename = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}.txt`
  let time = `${date.getHours()}:${date.getMinutes()}`
  let timestamp = date.getTime()

  if (!rooms[roomid].currentFilename) {
    rooms[roomid].currentFilename = filename
  }
  if (rooms[roomid].currentFilename !== filename) {
    let speakerNum = Object.keys(rooms[roomid].speakers).length
    let lastFIleName = rooms[roomid].currentFilename
    rooms[roomid].currentFilename = filename
    if (speakerNum) {
      let allSpeaker = Object.keys(rooms[roomid].speakers)
        .map(key => `${key}:${rooms[roomid].speakers[key].uname}:${rooms[roomid].speakers[key].count}`)
        .join(',')
      rooms[roomid].speakers = {}
      await fs.appendFile(`${roomid}/${lastFIleName}`, `SPEAKERNUM${speakerNum};${allSpeaker}\nV2\n`)
    }
  }
  return { timestamp, filename, time, lastTime: {} }
}

socket.on('online', async ({ roomid, online }) => {
  if (online > 1) {
    const { time, filename } = await checkFile(roomid)
    await fs.appendFile(`${roomid}/${filename}`, `TIME${time}ONLINE${online}\n`)
  }
})

socket.on('danmaku', async ({ message, roomid, mid, uname }) => {
  if (!message.includes('TIME') || !message.includes('ONLINE')) {
    const { timestamp, filename } = await checkFile(roomid)

    if (!rooms[roomid].speakers[mid]) {
      rooms[roomid].speakers[mid] = { count: 0, uname }
    }
    rooms[roomid].speakers[mid].count++
    await fs.appendFile(`${roomid}/${filename}`, `${timestamp}:${mid}:${message}\n`)
  }
})
