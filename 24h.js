const json = require('./json')

;
(async () => {
  let date = new Date()
  let today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  let now = date.getHours() * 60 + date.getMinutes()
  date = new Date(date.getTime() - 1000 * 60 * 60 * 24)

  let yesterday = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

  let rooms = await json.roomsRecords()
  let pending = []
  Object.keys(rooms).forEach(roomid => {
    if (rooms[roomid].includes(today)) {
      pending.push({ roomid, date: today })
    }
    if (rooms[roomid].includes(yesterday)) {
      pending.push({ roomid, date: yesterday })
    }
  })
  pending = await Promise.all(pending
    .map(async ({ roomid, date }) => {
      return { roomid, date, danmaku: (await json.read(roomid, date)).danmaku }
    }))
  pending = pending.map(({ roomid, date, danmaku }) => {
    danmaku = danmaku
      .map(({ time, mid, text }) => {
        time -= now
        if (date === yesterday) {
          time -= 60 * 24
        }
        time *= 60
        time = -time
        return { time, mid, text, roomid }
      })
      .filter(({ time }) => time < (60 * 60 * 24))
    return danmaku
  })
  let danmaku = [].concat(...pending)
    .map(({ time, mid, text, roomid }) => `${time}\t${roomid}\t${mid}\t${text}`)
    .join('\n')
  await require('fs').promises.writeFile('24h.txt', danmaku)
})()
