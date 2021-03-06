'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utilsParseInputJs = require('./utils/parseInput.js');

var _utilsParseInputJs2 = _interopRequireDefault(_utilsParseInputJs);

var _DayCellJs = require('./DayCell.js');

var _DayCellJs2 = _interopRequireDefault(_DayCellJs);

var _stylesJs = require('./styles.js');

var _stylesJs2 = _interopRequireDefault(_stylesJs);

var _MonthsViewJs = require('./MonthsView.js');

var _MonthsViewJs2 = _interopRequireDefault(_MonthsViewJs);

var _YearsViewJs = require('./YearsView.js');

var _YearsViewJs2 = _interopRequireDefault(_YearsViewJs);

function checkRange(dayMoment, range) {
  return dayMoment.isBetween(range['startDate'], range['endDate']) || dayMoment.isBetween(range['endDate'], range['startDate']);
}

function checkEdges(dayMoment, range) {
  var endDate = range.endDate;
  var startDate = range.startDate;

  return dayMoment.isSame(endDate) || dayMoment.isSame(startDate);
}

var Calendar = (function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props, context) {
    _classCallCheck(this, Calendar);

    _get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).call(this, props, context);

    var format = props.format;
    var range = props.range;
    var theme = props.theme;
    var offset = props.offset;
    var firstDayOfWeek = props.firstDayOfWeek;

    var date = _utilsParseInputJs2['default'](props.date, format);
    var state = {
      date: date,
      shownDate: (range && range['endDate'] || date).clone().add(offset, 'months'),
      firstDayOfWeek: firstDayOfWeek || _moment2['default'].localeData().firstDayOfWeek(),
      showMonthsView: false,
      showYearsView: false
    };

    this.state = state;
    this.styles = _stylesJs2['default'](theme);
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onInit = this.props.onInit;

      onInit && onInit(this.state.date);
    }
  }, {
    key: 'getShownDate',
    value: function getShownDate() {
      var _props = this.props;
      var link = _props.link;
      var offset = _props.offset;

      var shownDate = link ? link.clone().add(offset, 'months') : this.state.shownDate;

      return shownDate;
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(newDate) {
      var _props2 = this.props;
      var link = _props2.link;
      var onChange = _props2.onChange;
      var date = this.state.date;

      onChange && onChange(newDate);

      if (!link) {
        this.setState({ date: newDate });
      }
    }
  }, {
    key: 'changeMonth',
    value: function changeMonth(direction, event) {
      event.preventDefault();
      var _props3 = this.props;
      var link = _props3.link;
      var linkCB = _props3.linkCB;

      if (link && linkCB) {
        return linkCB(direction);
      }

      var current = this.state.shownDate.month();
      var newMonth = this.state.shownDate.clone().add(direction, 'months');

      this.setState({
        shownDate: newMonth
      });
    }
  }, {
    key: 'setMonth',
    value: function setMonth(month, event) {
      event.preventDefault();

      var newMonth = this.state.shownDate.clone().month(month);
      this.setState({
        shownDate: newMonth,
        showMonthsView: false
      });
    }
  }, {
    key: 'setYear',
    value: function setYear(year, event) {
      event.preventDefault();

      if (year >= 1000) {
        var newYear = this.state.shownDate.clone().year(year);
        this.setState({
          shownDate: newYear,
          showYearsView: false
        });
      }
    }
  }, {
    key: 'appendTime',
    value: function appendTime(direction, type, event) {
      event.preventDefault();
      var _props4 = this.props;
      var link = _props4.link;
      var linkCB = _props4.linkCB;

      if (link && linkCB) {
        return linkCB(direction);
      }

      var newDate = this.state.shownDate.clone().add(direction, type);
      if (newDate.year() > 1000) {
        this.setState({
          shownDate: newDate
        });
      }
    }
  }, {
    key: 'toggleMonthsView',
    value: function toggleMonthsView(event) {
      event.preventDefault();
      this.setState({ showMonthsView: !this.state.showMonthsView, showYearsView: false });
    }
  }, {
    key: 'toggleYearsView',
    value: function toggleYearsView(event) {
      event.preventDefault();
      this.setState({ showYearsView: !this.state.showYearsView, showMonthsView: false });
    }
  }, {
    key: 'renderMonthAndYear',
    value: function renderMonthAndYear() {
      var shownDate = this.getShownDate();
      var month = _moment2['default'].months(shownDate.month());
      var year = shownDate.year();
      var styles = this.styles;

      return _react2['default'].createElement(
        'div',
        { style: styles['MonthAndYear'], className: 'rdr-MonthAndYear-innerWrapper' },
        _react2['default'].createElement(
          'div',
          {
            style: _extends({}, styles['MonthButton'], { float: 'left' }),
            className: 'rdr-MonthAndYear-button prev',
            onMouseDown: this.changeMonth.bind(this, -1) },
          _react2['default'].createElement('i', { style: _extends({}, styles['MonthArrow'], styles['MonthArrowPrev']) })
        ),
        _react2['default'].createElement(
          'span',
          null,
          _react2['default'].createElement(
            'span',
            { className: 'rdr-MonthAndYear-month', onMouseDown: this.toggleMonthsView.bind(this) },
            month
          ),
          _react2['default'].createElement(
            'span',
            { className: 'rdr-MonthAndYear-divider' },
            ' - '
          ),
          _react2['default'].createElement(
            'span',
            { className: 'rdr-MonthAndYear-year', onMouseDown: this.toggleYearsView.bind(this) },
            year
          ),
          this.state.showMonthsView ? _react2['default'].createElement(_MonthsViewJs2['default'], { showYear: this.toggleYearsView.bind(this), setMonth: this.setMonth.bind(this), shownDate: this.state.shownDate, appendTime: this.appendTime.bind(this) }) : '',
          this.state.showYearsView ? _react2['default'].createElement(_YearsViewJs2['default'], { setYear: this.setYear.bind(this), shownDate: this.state.shownDate, appendTime: this.appendTime.bind(this) }) : ''
        ),
        _react2['default'].createElement(
          'div',
          {
            style: _extends({}, styles['MonthButton'], { float: 'right' }),
            className: 'rdr-MonthAndYear-button next',
            onMouseDown: this.changeMonth.bind(this, +1) },
          _react2['default'].createElement('i', { style: _extends({}, styles['MonthArrow'], styles['MonthArrowNext']) })
        )
      );
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays() {
      var dow = this.state.firstDayOfWeek;
      var weekdays = [];
      var styles = this.styles;

      for (var i = dow; i < 7 + dow; i++) {
        var day = _moment2['default'].weekdaysMin(i);

        weekdays.push(_react2['default'].createElement(
          'span',
          { style: styles['Weekday'], className: 'rdr-WeekDay', key: day },
          day
        ));
      }

      return weekdays;
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _this = this;

      // TODO: Split this logic into smaller chunks
      var styles = this.styles;
      var range = this.props.range;

      var shownDate = this.getShownDate();
      var _state = this.state;
      var date = _state.date;
      var firstDayOfWeek = _state.firstDayOfWeek;

      var dateUnix = date.unix();

      var monthNumber = shownDate.month();
      var dayCount = shownDate.daysInMonth();
      var startOfMonth = shownDate.clone().startOf('month').isoWeekday();

      var lastMonth = shownDate.clone().month(monthNumber - 1);
      var lastMonthNumber = lastMonth.month();
      var lastMonthDayCount = lastMonth.daysInMonth();

      var nextMonth = shownDate.clone().month(monthNumber + 1);
      var nextMonthNumber = nextMonth.month();

      var days = [];

      // Previous month's days
      var diff = Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7;
      for (var i = diff; i >= 1; i--) {
        var dayMoment = lastMonth.clone().date(lastMonthDayCount - i + 1);
        days.push({ dayMoment: dayMoment, isPassive: true });
      }

      // Current month's days
      for (var i = 1; i <= dayCount; i++) {
        var dayMoment = shownDate.clone().date(i);
        if (this.props.disableFutureSelect && _moment2['default']().valueOf() < dayMoment.valueOf()) {
          days.push({ dayMoment: dayMoment, isPassive: true });
        } else {
          days.push({ dayMoment: dayMoment });
        }
      }

      // Next month's days
      var remainingCells = 42 - days.length; // 42cells = 7days * 6rows
      for (var i = 1; i <= remainingCells; i++) {
        var dayMoment = nextMonth.clone().date(i);
        days.push({ dayMoment: dayMoment, isPassive: true });
      }

      return days.map(function (data, index) {
        var dayMoment = data.dayMoment;
        var isPassive = data.isPassive;

        var isSelected = !range && dayMoment.unix() === dateUnix;
        var isInRange = range && checkRange(dayMoment, range);
        var isEdge = range && checkEdges(dayMoment, range);

        return _react2['default'].createElement(_DayCellJs2['default'], _extends({
          onSelect: _this.handleSelect.bind(_this)
        }, data, {
          theme: styles,
          isSelected: isSelected || isEdge,
          isInRange: isInRange,
          key: index
        }));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles;

      return _react2['default'].createElement(
        'div',
        { style: _extends({}, styles['Calendar'], this.props.style), className: 'rdr-Calendar' },
        _react2['default'].createElement(
          'div',
          { className: 'rdr-MonthAndYear' },
          this.renderMonthAndYear()
        ),
        _react2['default'].createElement(
          'div',
          { className: 'rdr-WeekDays' },
          this.renderWeekdays()
        ),
        _react2['default'].createElement(
          'div',
          { className: 'rdr-Days' },
          this.renderDays()
        )
      );
    }
  }]);

  return Calendar;
})(_react.Component);

Calendar.defaultProps = {
  format: 'DD/MM/YYYY',
  theme: {},
  disableFutureSelect: true
};

Calendar.propTypes = {
  sets: _react.PropTypes.string,
  range: _react.PropTypes.shape({
    startDate: _react.PropTypes.object,
    endDate: _react.PropTypes.object
  }),
  date: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string, _react.PropTypes.func]),
  format: _react.PropTypes.string.isRequired,
  firstDayOfWeek: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  onChange: _react.PropTypes.func,
  onInit: _react.PropTypes.func,
  link: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    startDate: _react.PropTypes.object,
    endDate: _react.PropTypes.object
  }), _react.PropTypes.bool]),
  linkCB: _react.PropTypes.func,
  theme: _react.PropTypes.object,
  disableFutureSelect: _react.PropTypes.bool
};

exports['default'] = Calendar;
module.exports = exports['default'];