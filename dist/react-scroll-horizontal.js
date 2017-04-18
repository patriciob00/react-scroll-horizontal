'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HorizontalScroll = function (_Component) {
  _inherits(HorizontalScroll, _Component);

  function HorizontalScroll(props) {
    _classCallCheck(this, HorizontalScroll);

    var _this = _possibleConstructorReturn(this, (HorizontalScroll.__proto__ || Object.getPrototypeOf(HorizontalScroll)).call(this, props));

    _this.state = { animValues: 0 };
    _this.onScrollStart = _this.onScrollStart.bind(_this);
    return _this;
  }

  _createClass(HorizontalScroll, [{
    key: 'onScrollStart',
    value: function onScrollStart(e) {
      e.preventDefault();
      var rawData = e.deltaY ? e.deltaY : e.deltaX;
      var mouseY = Math.floor(rawData);

      // // Bring in the existing animation values
      var newAnimationValue = mouseY;
      var newAnimationValueNegative = -mouseY;

      var deltaMotion = 0;

      if (this.props.reverseScroll) {
        deltaMotion = newAnimationValueNegative;
      } else {
        deltaMotion = newAnimationValue;
      }

      _reactDom2.default.findDOMNode(this).scrollLeft += deltaMotion;
    }
  }, {
    key: 'render',
    value: function render() {
      var scrollingElementStyles = {
        display: 'inline-flex',
        height: '100%',
        position: 'absolute',
        willChange: 'transform' };

      var _props = this.props,
          config = _props.config,
          style = _props.style;
      var width = style.width,
          height = style.height,
          overflow = style.overflow;

      var springConfig = config ? config : presets.noWobble;

      // Styles
      var styles = _extends({
        height: height ? height : '100%',
        width: width ? width : '100%',
        overflow: overflow ? overflow : 'hidden',
        position: 'relative'
      }, styles);

      return _react2.default.createElement(
        'div',
        { onWheel: this.onScrollStart,
          ref: 'hScrollParent',
          style: styles,
          className: 'scroll-horizontal' },
        _react2.default.createElement(
          'div',
          { style: scrollingElementStyles },
          this.props.children
        )
      );
    }
  }]);

  return HorizontalScroll;
}(_react.Component);

exports.default = HorizontalScroll;


HorizontalScroll.proptypes = {
  reverseScroll: _react.PropTypes.bool,
  pageLock: _react.PropTypes.bool,
  config: _react.PropTypes.object,
  style: _react.PropTypes.object
};

HorizontalScroll.defaultProps = {
  reverseScroll: true,
  pageLock: false,
  config: null,
  style: { width: '100%', height: '100%', overflow: 'hidden' }
};