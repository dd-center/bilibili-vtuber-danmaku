module.exports = {
  apps: [{
    name: 'vd',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
  }],
}
