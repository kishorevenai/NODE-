const { format } = require('date-fns')
const {v4:uuid} = require('uuid')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = async(message,logName) => {
    const date = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${date}\t${uuid()}\t${message}\n`
    try {
        if(!fs.existsSync(path.join(__dirname,'..','logs')))
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        await fsPromises.appendFile(path.join(__dirname,'..','logs', logName),logItem)
    } catch (error) {
        console.log(error)
    }
}

const logger = (req,res,next) => {
    logEvents(`${req.method}\t\t${req.headers.origin}\t\t${req.url}`,'reqLog.txt')
    console.log(`${req.method}\t\t${req.headers.origin}\t\t${req.url}`)
    next();
}

module.exports = { logEvents,logger };