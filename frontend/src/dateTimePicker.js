import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import omit from 'lodash/omit';

import { DateRangePicker, isInclusivelyAfterDay} from 'react-dates';

const propTypes = {
  // example props for the demo
  autoFocus: PropTypes.bool,
  autoFocusEndDate: PropTypes.bool,
  stateDateWrapper: PropTypes.func,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj 
}

const defaultProps = {
  // example props for the demo\
  anchorDirection: "left", 
  autoFocus: false,
  autoFocusEndDate: false,
  block: false, 
  initialStartDate: null,
  initialEndDate: null,

  // input related props
  startDateId: "start_date_id",
  startDatePlaceholderText: 'Start Date',
  endDateId: "end_date_id",
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  block: false,
  small: false,
  regular: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: true,
  reopenPickerOnClearDates: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases:{
    calendarLabel: 'Calendar',
    chooseAvailableEndDate: function noRefCheck(){},
    chooseAvailableStartDate: function noRefCheck(){},
    clearDates: 'Clear Dates',
    closeDatePicker: 'Close',
    dateIsSelected: function noRefCheck(){},
    dateIsSelectedAsEndDate: function noRefCheck(){},
    dateIsSelectedAsStartDate: function noRefCheck(){},
    dateIsUnavailable: function noRefCheck(){},
    enterKey: 'Enter key',
    escape: 'Escape key',
    focusStartDate: 'Interact with the calendar and add the check-in date for your trip.',
    hideKeyboardShortcutsPanel: 'Close the shortcuts panel.',
    homeEnd: 'Home and end keys',
    jumpToNextMonth: 'Move forward to switch to the next month.',
    jumpToPrevMonth: 'Move backward to switch to the previous month.',
    keyboardBackwardNavigationInstructions: 'Navigate backward to interact with the calendar and select a date. Press the question mark key to get the keyboard shortcuts for changing dates.',
    keyboardForwardNavigationInstructions: 'Navigate forward to interact with the calendar and select a date. Press the question mark key to get the keyboard shortcuts for changing dates.',
    keyboardShortcuts: 'Keyboard Shortcuts',
    leftArrowRightArrow: 'Right and left arrow keys',
    moveFocusByOneDay: 'Move backward (left) and forward (right) by one day.',
    moveFocusByOneMonth: 'Switch months.',
    moveFocusByOneWeek: 'Move backward (up) and forward (down) by one week.',
    moveFocustoStartAndEndOfWeek: 'Go to the first or last day of a week.',
    openThisPanel: 'Open this panel.',
    pageUpPageDown: 'page up and page down keys',
    questionMark: 'Question mark',
    returnFocusToInput: 'Return to the date input field.',
    roleDescription: 'datepicker',
    selectFocusedDate: 'Select the date in focus.',
    showKeyboardShortcutsPanel: 'Open the keyboard shortcuts panel.',
    upArrowDownArrow: 'up and down arrow keys'
  },
  stateDateWrapper: date => date,
};

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = "start_date_id";
    } else if (props.autoFocusEndDate) {
      focusedInput = "end_date_id";
    }

    this.state = {
      focusedInput,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    const { stateDateWrapper } = this.props;
    this.setState({
      startDate: startDate && stateDateWrapper(startDate),
      endDate: endDate && stateDateWrapper(endDate),
    });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
    // example wrapper but are not props on the SingleDatePicker itself and
    // thus, have to be omitted.
    const props = omit(this.props, [
      'autoFocus',
      'autoFocusEndDate',
      'initialStartDate',
      'initialEndDate',
      'stateDateWrapper',
    ]);

    return (
      <div>
        <DateRangePicker
          {...props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    );
  }
}

DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

export default DateRangePickerWrapper;