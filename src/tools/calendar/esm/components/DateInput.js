var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

import _objectAssign from 'object.assign';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import throttle from 'lodash/throttle';
import isTouchDevice from 'is-touch-device';

import getInputHeight from '../utils/getInputHeight';
import openDirectionShape from '../shapes/OpenDirectionShape';
import { OPEN_DOWN, OPEN_UP, FANG_HEIGHT_PX, FANG_WIDTH_PX, DEFAULT_VERTICAL_SPACING, MODIFIER_KEY_NAMES } from '../constants';

var FANG_PATH_TOP = 'M0,' + String(FANG_HEIGHT_PX) + ' ' + String(FANG_WIDTH_PX) + ',' + String(FANG_HEIGHT_PX) + ' ' + FANG_WIDTH_PX / 2 + ',0z';
var FANG_STROKE_TOP = 'M0,' + String(FANG_HEIGHT_PX) + ' ' + FANG_WIDTH_PX / 2 + ',0 ' + String(FANG_WIDTH_PX) + ',' + String(FANG_HEIGHT_PX);
var FANG_PATH_BOTTOM = 'M0,0 ' + String(FANG_WIDTH_PX) + ',0 ' + FANG_WIDTH_PX / 2 + ',' + String(FANG_HEIGHT_PX) + 'z';
var FANG_STROKE_BOTTOM = 'M0,0 ' + FANG_WIDTH_PX / 2 + ',' + String(FANG_HEIGHT_PX) + ' ' + String(FANG_WIDTH_PX) + ',0';

var propTypes = forbidExtraProps(_objectAssign({}, withStylesPropTypes, {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // also used as label
  displayValue: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  showCaret: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,
  small: PropTypes.bool,
  regular: PropTypes.bool,

  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,

  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  // accessibility
  isFocused: PropTypes.bool // describes actual DOM focus
}));

var defaultProps = {
  placeholder: 'Select Date',
  displayValue: '',
  screenReaderMessage: '',
  focused: false,
  disabled: false,
  required: false,
  readOnly: null,
  openDirection: OPEN_DOWN,
  showCaret: false,
  verticalSpacing: DEFAULT_VERTICAL_SPACING,
  small: false,
  regular: false,

  onChange: function () {
    function onChange() {}

    return onChange;
  }(),
  onFocus: function () {
    function onFocus() {}

    return onFocus;
  }(),
  onKeyDownShiftTab: function () {
    function onKeyDownShiftTab() {}

    return onKeyDownShiftTab;
  }(),
  onKeyDownTab: function () {
    function onKeyDownTab() {}

    return onKeyDownTab;
  }(),
  onKeyDownArrowDown: function () {
    function onKeyDownArrowDown() {}

    return onKeyDownArrowDown;
  }(),
  onKeyDownQuestionMark: function () {
    function onKeyDownQuestionMark() {}

    return onKeyDownQuestionMark;
  }(),


  // accessibility
  isFocused: false
};

var DateInput = function (_React$Component) {
  _inherits(DateInput, _React$Component);

  function DateInput(props) {
    _classCallCheck(this, DateInput);

    var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

    _this.state = {
      dateString: '',
      isTouchDevice: false
    };

    _this.onChange = _this.onChange.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.setInputRef = _this.setInputRef.bind(_this);
    _this.throttledKeyDown = throttle(_this.onFinalKeyDown, 300, { trailing: false });
    return _this;
  }

  _createClass(DateInput, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        this.setState({ isTouchDevice: isTouchDevice() });
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        if (this.state.dateString && nextProps.displayValue) {
          this.setState({
            dateString: ''
          });
        }
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate(prevProps) {
        var _props = this.props,
            focused = _props.focused,
            isFocused = _props.isFocused;

        if (prevProps.focused === focused && prevProps.isFocused === isFocused) return;

        if (focused && isFocused) {
          this.inputRef.focus();
        } else {
          this.inputRef.blur();
        }
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'onChange',
    value: function () {
      function onChange(e) {
        var _props2 = this.props,
            onChange = _props2.onChange,
            onKeyDownQuestionMark = _props2.onKeyDownQuestionMark;

        var dateString = e.target.value;

        // In Safari, onKeyDown does not consistently fire ahead of onChange. As a result, we need to
        // special case the `?` key so that it always triggers the appropriate callback, instead of
        // modifying the input value
        if (dateString[dateString.length - 1] === '?') {
          onKeyDownQuestionMark(e);
        } else {
          this.setState({ dateString: dateString }, function () {
            return onChange(dateString);
          });
        }
      }

      return onChange;
    }()
  }, {
    key: 'onKeyDown',
    value: function () {
      function onKeyDown(e) {
        e.stopPropagation();
        if (!MODIFIER_KEY_NAMES.has(e.key)) {
          this.throttledKeyDown(e);
        }
      }

      return onKeyDown;
    }()
  }, {
    key: 'onFinalKeyDown',
    value: function () {
      function onFinalKeyDown(e) {
        var _props3 = this.props,
            onKeyDownShiftTab = _props3.onKeyDownShiftTab,
            onKeyDownTab = _props3.onKeyDownTab,
            onKeyDownArrowDown = _props3.onKeyDownArrowDown,
            onKeyDownQuestionMark = _props3.onKeyDownQuestionMark;
        var key = e.key;


        if (key === 'Tab') {
          if (e.shiftKey) {
            onKeyDownShiftTab(e);
          } else {
            onKeyDownTab(e);
          }
        } else if (key === 'ArrowDown') {
          onKeyDownArrowDown(e);
        } else if (key === '?') {
          e.preventDefault();
          onKeyDownQuestionMark(e);
        }
      }

      return onFinalKeyDown;
    }()
  }, {
    key: 'setInputRef',
    value: function () {
      function setInputRef(ref) {
        this.inputRef = ref;
      }

      return setInputRef;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _state = this.state,
            dateString = _state.dateString,
            isTouch = _state.isTouchDevice;
        var _props4 = this.props,
            id = _props4.id,
            placeholder = _props4.placeholder,
            displayValue = _props4.displayValue,
            screenReaderMessage = _props4.screenReaderMessage,
            focused = _props4.focused,
            showCaret = _props4.showCaret,
            onFocus = _props4.onFocus,
            disabled = _props4.disabled,
            required = _props4.required,
            readOnly = _props4.readOnly,
            openDirection = _props4.openDirection,
            verticalSpacing = _props4.verticalSpacing,
            small = _props4.small,
            regular = _props4.regular,
            styles = _props4.styles,
            reactDates = _props4.theme.reactDates;


        var value = displayValue || dateString || '';
        var screenReaderMessageId = 'DateInput__screen-reader-message-' + String(id);

        var withFang = showCaret && focused;

        var inputHeight = getInputHeight(reactDates, small);

        return React.createElement(
          'div',
          css(styles.DateInput, small && styles.DateInput__small, withFang && styles.DateInput__withFang, disabled && styles.DateInput__disabled, withFang && openDirection === OPEN_DOWN && styles.DateInput__openDown, withFang && openDirection === OPEN_UP && styles.DateInput__openUp),
          React.createElement('input', _extends({}, css(styles.DateInput_input, small && styles.DateInput_input__small, regular && styles.DateInput_input__regular, readOnly && styles.DateInput_input__readOnly, focused && styles.DateInput_input__focused, disabled && styles.DateInput_input__disabled), {
            'aria-label': placeholder,
            type: 'text',
            id: id,
            name: id,
            ref: this.setInputRef,
            value: value,
            onChange: this.onChange,
            onKeyDown: this.onKeyDown,
            onFocus: onFocus,
            placeholder: placeholder,
            autoComplete: 'off',
            disabled: disabled,
            readOnly: typeof readOnly === 'boolean' ? readOnly : isTouch,
            required: required,
            'aria-describedby': screenReaderMessage && screenReaderMessageId
          })),
          withFang && React.createElement(
            'svg',
            _extends({
              role: 'presentation',
              focusable: 'false'
            }, css(styles.DateInput_fang, openDirection === OPEN_DOWN && {
              top: inputHeight + verticalSpacing - FANG_HEIGHT_PX - 1
            }, openDirection === OPEN_UP && {
              bottom: inputHeight + verticalSpacing - FANG_HEIGHT_PX - 1
            })),
            React.createElement('path', _extends({}, css(styles.DateInput_fangShape), {
              d: openDirection === OPEN_DOWN ? FANG_PATH_TOP : FANG_PATH_BOTTOM
            })),
            React.createElement('path', _extends({}, css(styles.DateInput_fangStroke), {
              d: openDirection === OPEN_DOWN ? FANG_STROKE_TOP : FANG_STROKE_BOTTOM
            }))
          ),
          screenReaderMessage && React.createElement(
            'p',
            _extends({}, css(styles.DateInput_screenReaderMessage), { id: screenReaderMessageId }),
            screenReaderMessage
          )
        );
      }

      return render;
    }()
  }]);

  return DateInput;
}(React.Component);

DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;

export default withStyles(function (_ref) {
  var _ref$reactDates = _ref.reactDates,
      border = _ref$reactDates.border,
      color = _ref$reactDates.color,
      sizing = _ref$reactDates.sizing,
      spacing = _ref$reactDates.spacing,
      font = _ref$reactDates.font,
      zIndex = _ref$reactDates.zIndex;
  return {
    DateInput: {
      margin: 0,
      padding: spacing.inputPadding,
      background: color.background,
      position: 'relative',
      display: 'inline-block',
      width: sizing.inputWidth,
      verticalAlign: 'middle'
    },

    DateInput__small: {
      width: sizing.inputWidth_small
    },

    DateInput__disabled: {
      background: color.disabled,
      color: color.textDisabled
    },

    DateInput_input: {
      fontWeight: 200,
      fontSize: font.input.size,
      lineHeight: font.input.lineHeight,
      color: color.text,
      backgroundColor: color.background,
      width: '100%',
      padding: String(spacing.displayTextPaddingVertical) + 'px ' + String(spacing.displayTextPaddingHorizontal) + 'px',
      paddingTop: spacing.displayTextPaddingTop,
      paddingBottom: spacing.displayTextPaddingBottom,
      paddingLeft: spacing.displayTextPaddingLeft,
      paddingRight: spacing.displayTextPaddingRight,
      border: border.input.border,
      borderTop: border.input.borderTop,
      borderRight: border.input.borderRight,
      borderBottom: border.input.borderBottom,
      borderLeft: border.input.borderLeft
    },

    DateInput_input__small: {
      fontSize: font.input.size_small,
      lineHeight: font.input.lineHeight_small,
      padding: String(spacing.displayTextPaddingVertical_small) + 'px ' + String(spacing.displayTextPaddingHorizontal_small) + 'px',
      paddingTop: spacing.displayTextPaddingTop_small,
      paddingBottom: spacing.displayTextPaddingBottom_small,
      paddingLeft: spacing.displayTextPaddingLeft_small,
      paddingRight: spacing.displayTextPaddingRight_small
    },

    DateInput_input__regular: {
      fontWeight: 'auto'
    },

    DateInput_input__readOnly: {
      userSelect: 'none'
    },

    DateInput_input__focused: {
      outline: border.input.outlineFocused,
      background: color.backgroundFocused,
      border: border.input.borderFocused,
      borderTop: border.input.borderTopFocused,
      borderRight: border.input.borderRightFocused,
      borderBottom: border.input.borderBottomFocused,
      borderLeft: border.input.borderLeftFocused
    },

    DateInput_input__disabled: {
      background: color.disabled,
      fontStyle: font.input.styleDisabled
    },

    DateInput_screenReaderMessage: {
      border: 0,
      clip: 'rect(0, 0, 0, 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      width: 1
    },

    DateInput_fang: {
      position: 'absolute',
      width: FANG_WIDTH_PX,
      height: FANG_HEIGHT_PX,
      left: 22,
      zIndex: zIndex + 2
    },

    DateInput_fangShape: {
      fill: color.background
    },

    DateInput_fangStroke: {
      stroke: color.core.border,
      fill: 'transparent'
    }
  };
})(DateInput);