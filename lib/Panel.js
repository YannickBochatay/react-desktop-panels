"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Resizable = require("./Resizable");

var _Resizable2 = _interopRequireDefault(_Resizable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Panel = function Panel(_ref) {
  var stretchable = _ref.stretchable,
      resizable = _ref.resizable,
      splittable = _ref.splittable,
      direction = _ref.direction,
      children = _ref.children,
      style = _ref.style,
      rest = _objectWithoutProperties(_ref, ["stretchable", "resizable", "splittable", "direction", "children", "style"]);

  var fullStyle = _extends({}, style);

  if (stretchable) fullStyle.flex = 1;

  if (splittable) {

    fullStyle = _extends({}, fullStyle, {
      display: "flex",
      alignItems: "stretch",
      flexDirection: direction
    });
  }

  if (resizable) {
    return _react2.default.createElement(
      _Resizable2.default,
      _extends({}, rest, { style: fullStyle, direction: direction }),
      children
    );
  } else {

    return _react2.default.createElement(
      "div",
      _extends({}, rest, { style: fullStyle }),
      children
    );
  }
};

Panel.propTypes = {
  stretchable: _react.PropTypes.bool,
  resizable: _react.PropTypes.bool,
  splittable: _react.PropTypes.bool,
  direction: _react.PropTypes.oneOf(["row", "column"]),
  children: _react.PropTypes.node,
  style: _react.PropTypes.object
};

exports.default = Panel;