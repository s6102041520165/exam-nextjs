const nextPWAs = require('next-pwa');

module.exports = nextPWAs({
    pwa: {
    disable: false,
    register: true,
    scope: '/app',
    sw: 'service-worker.js',
  }
})