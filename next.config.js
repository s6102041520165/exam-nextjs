const nextPWAs = require('next-pwa');

module.exports = nextPWAs({
    pwa: {
        dest: 'public'
    }
})