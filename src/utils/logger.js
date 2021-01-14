const winston = require('winston');
const {combine, timestamp, prettyPrint} = winston.format

const errorFile = './logs/error.log'
const infoFile = './logs/info.log'
const debugFile = './logs/debug.log'

/*
* Log.error
* Log.info
* Log.debug
*/
const Log = winston.createLogger({
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [

    // writing logs based on the levels
    new winston.transports.File({ filename: errorFile, level: 'error' }),
    new winston.transports.File({ filename: infoFile, level: 'info' }),
    new winston.transports.File({ filename: debugFile, level: 'debug' })
  ],
  
});

module.exports = Log;