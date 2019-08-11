module.exports = {
  apps: [{
    name: 'vdr',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
  }],
}
