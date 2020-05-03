const timeago = require('timeago.js');

module.exports = {

    timeago: (date) => {
      return timeago.format(date);
    }

}