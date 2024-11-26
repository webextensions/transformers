let chalk;
try {
    chalk = require('chalk');
} catch (e) { // eslint-disable-line no-unused-vars
    // do nothing
}

let boxen;
try {
    boxen = require('boxen');
} catch (e) { // eslint-disable-line no-unused-vars
    // do nothing
}

let stripAnsi;
try {
    stripAnsi = require('strip-ansi');
} catch (e) { // eslint-disable-line no-unused-vars
    // do nothing
}

const logger = {
    chalkProxy: function (fnName, msg) {
        if (chalk && chalk[fnName]) {
            return chalk[fnName](msg);
        } else {
            return msg;
        }
    },
    stripAnsi: function (msg) {
        if (stripAnsi) {
            return stripAnsi(msg);
        } else {
            return msg;
        }
    },
    boxen: function (msg, options) {
        if (boxen) {
            return boxen(msg, options);
        } else {
            return msg;
        }
    },
    log: function (msg) {
        console.log(msg);
    },
    info: function (msg) {
        if (chalk) {
            msg = chalk.blue(msg);
        }
        console.log(msg);
    },
    warn: function (msg) {
        if (chalk) {
            msg = chalk.yellow(msg);
        }
        console.log(msg);
    },
    error: function (msg) {
        if (chalk) {
            msg = chalk.red(msg);
        }
        console.log(msg);
    },
    success: function (msg) {
        if (chalk) {
            msg = chalk.green(msg);
        }
        console.log(msg);
    }
};

module.exports = logger;
