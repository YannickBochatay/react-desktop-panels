"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Stretchable = function Stretchable(_ref) {
  var style = _ref.style,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["style", "children"]);

  return _react2.default.createElement(
    "div",
    _extends({}, rest, { style: _extends({}, style, { flex: 1 }) }),
    _react.Children.map(children, function (child) {
      return _react2.default.cloneElement(child, {
        style: _extends({ height: "100%" }, child.props.style)
      });
    })
  );
};

Stretchable.propTypes = {
  style: _react.PropTypes.object,
  children: _react.PropTypes.node
};

exports.default = Stretchable;