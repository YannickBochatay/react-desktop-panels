"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resizer = function (_Component) {
  _inherits(Resizer, _Component);

  function Resizer(props) {
    _classCallCheck(this, Resizer);

    var _this = _possibleConstructorReturn(this, (Resizer.__proto__ || Object.getPrototypeOf(Resizer)).call(this, props));

    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);

    return _this;
  }

  _createClass(Resizer, [{
    key: "handleMouseDown",
    value: function handleMouseDown(e) {

      document.addEventListener("mousemove", this.handleMouseMove);
      if (this.props.onDragStart) this.props.onDragStart(e);
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(e) {

      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("mouseup", this.handleMouseUp);
      if (this.props.onDragEnd) this.props.onDragEnd(e);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(e) {

      document.addEventListener("mouseup", this.handleMouseUp);
      if (this.props.onDrag) this.props.onDrag(e);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          direction = _props.direction,
          style = _props.style,
          size = _props.size,
          rest = _objectWithoutProperties(_props, ["direction", "style", "size"]);

      var vertical = direction === "row";

      var baseStyle = {
        width: vertical ? size : "100%",
        height: vertical ? "100%" : size,
        display: "inline-block",
        cursor: vertical ? "ew-resize" : "ns-resize"
      };

      return _react2.default.createElement("span", _extends({}, rest, {
        style: _extends({}, baseStyle, style),
        onMouseDown: this.handleMouseDown,
        ref: function ref(node) {
          return _this2.node = node;
        }
      }));
    }
  }]);

  return Resizer;
}(_react.Component);

Resizer.propTypes = {
  onDragStart: _propTypes2.default.func,
  onDrag: _propTypes2.default.func,
  onDragEnd: _propTypes2.default.func,
  style: _propTypes2.default.object,
  direction: _propTypes2.default.oneOf(["row", "column"]),
  size: _propTypes2.default.number
};

Resizer.defaultProps = {
  direction: "row",
  size: 5
};

exports.default = Resizer;