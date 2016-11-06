var app = require("express")();
var moment = require("moment");

var format = "MMMM D, YYYY";


function listener(req, res) {
  var timestamp = req.params.timestamp;
  var result = {unix: null, natural: null, date: null};

  if (timestamp) {
    var date;

    if (isNaN(Number(timestamp))) {
      // Date string
      date = moment(timestamp, format, "en", true);
    } else {
      // UNIX timestamp
      date = moment.unix(timestamp);
    }

    if (date.isValid()) {
      result.unix = date.unix();
      result.natural = date.format(format);
      result.date = {
        day: date.date(),
        month: date.month() + 1,
        year: date.year()
      };
    }
  }

  res.json(result);
}


app.get("/:timestamp?", listener).listen(process.env.PORT);
