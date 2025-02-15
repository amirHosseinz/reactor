Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = getCalendarMonthWeeks;

var _moment = require('moment');
var _momentJalaali = require('moment-jalaali');

var _moment2 = _interopRequireDefault(_moment);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getCalendarMonthWeeks(month, enableOutsideDays) {
  var firstDayOfWeek = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _moment2['default'].localeData().firstDayOfWeek();

  if (!_moment2['default'].isMoment(month) || !month.isValid()) {
    throw new TypeError('`month` must be a valid moment object');
  }
  if (_constants.WEEKDAYS.indexOf(firstDayOfWeek) === -1) {
    throw new TypeError('`firstDayOfWeek` must be an integer between 0 and 6');
  }

  // var firstOfMonth = month.clone().startOf('month').hour(12);
  // var lastOfMonth = month.clone().endOf('month').hour(12);

  var firstOfMonth = _momentJalaali(month).clone().startOf('jMonth').hour(12);
  var lastOfMonth = _momentJalaali(month).clone().endOf('jMonth').hour(12);

  // calculate the exact first and last days to fill the entire matrix
  // (considering days outside month)
  var prevDays = (firstOfMonth.day() + 7 - firstDayOfWeek) % 7;
  var nextDays = (firstDayOfWeek + 6 - lastOfMonth.day()) % 7;
  var firstDay = firstOfMonth.clone().subtract(prevDays, 'day');
  var lastDay = lastOfMonth.clone().add(nextDays, 'day');
  var totalDays = lastDay.diff(firstDay, 'days') + 1;

  var currentDay = firstDay.clone();
  var weeksInMonth = [];

  for (var i = 0; i < totalDays; i += 1) {
    if (i % 7 === 0) {
      weeksInMonth.push([]);
    }

    var day = null;
    if (i >= prevDays && i < totalDays - nextDays || enableOutsideDays) {
      day = currentDay.clone();
    }

    weeksInMonth[weeksInMonth.length - 1].push(day);

    currentDay.add(1, 'day');
  }
  // console.log(weeksInMonth);
  return weeksInMonth;
}
