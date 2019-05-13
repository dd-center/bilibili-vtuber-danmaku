// const fs = require('fs').promises

// const nodejieba = require('nodejieba')

const Server = require('socket.io')
const io = new Server(9002, { serveClient: false, path: '/' })

// nodejieba.load({
//   userDict: 'dictionary/userdict.txt',
// })

// io.on('connection', socket => {
//   socket.on('wow', console.log)
// })
// ;
// (async () => {
//   let day = String(await fs.readFile('12235923/2019-5-11.txt'))
//     .split('\n')
//     .filter(w => !(w.includes('TIME') && w.includes('ONLINE') || w.includes('SPEAKERNUM')))
//     .join('\n')
//   nodejieba.extract(day, 250).forEach(w => console.log(`${w.word};${Math.round(w.weight)}`))
//   // nodejieba.extract(day, 100).forEach(w => console.log(w))
// })()


// (async () => {
//   let day = String(await fs.readFile('12235923/2019-5-11.txt'))
//     .split('\n')
//     .filter(w => !(w.includes('TIME') && w.includes('ONLINE') || w.includes('SPEAKERNUM')))
//     .join('\n')
//   let k = ''
//   nodejieba.extract(day, 250).forEach(w => {
//     for (let i = 0; i < Math.round(w.weight); i++) {
//       k += `${w.word} `
//     }
//     // console.log(`${w.word};${Math.round(w.weight)}`)
//   })
//   console.log(k)
//   // nodejieba.extract(day, 100).forEach(w => console.log(w))
// })()
