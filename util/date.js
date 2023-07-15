const moment  = require('moment');

const timeFormat = (timestamp) => {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
}

module.exports = timeFormat;


