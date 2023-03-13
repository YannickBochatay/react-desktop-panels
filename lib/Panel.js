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

var _Resizable = require("./Resizable");

var _Resizable2 = _interopRequireDefault(_Resizable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = function (_Component) {
  _inherits(Panel, _Component);

  function Panel() {
    _classCallCheck(this, Panel);

    return _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).apply(this, arguments));
  }

  _createClass(Panel, [{
    key: "renderChildren",
    value: function renderChildren() {
      var _props = this.props,
          splitDirection = _props.splitDirection,
          children = _props.children;


      var childrenArray = _react.Children.toArray(children);

      return childrenArray.map(function (child, i) {

        if (!child.props) return child;

        if (child.props.resizable) {

          var props = {};

          props.direction = splitDirection;

          if (children[i - 1] && children[i - 1].props.resizable) {
            // props.resizable = false
            // props.style = { ...child.props.style, flex : 1 }
          } else if (i === childrenArray.length - 1) props.resizerPos = "before";

          return _react2.default.cloneElement(child, props);
        }
        /* else if (i < childrenArray.length - 1) {
           const cssProp = "margin" + (splitDirection === "row" ? "Right" : "Bottom")
          const style = { ...child.props.style, [cssProp] : 5 }
           return React.cloneElement(child, { style })
        } */
        else return child;
      });
    }
  }, {
    key: "setStyle",
    value: function setStyle() {
      var _props2 = this.props,
          stretchable = _props2.stretchable,
          splitDirection = _props2.splitDirection,
          style = _props2.style,
          children = _props2.children;

      var splitted = _react.Children.count(children) > 1;

      var fullStyle = {};

      if (stretchable) fullStyle.flex = 1;

      if (splitted) {

        fullStyle = _extends({}, fullStyle, {
          display: "flex",
          alignItems: "stretch",
          flexDirection: splitDirection
        });
      }

      return _extends({}, fullStyle, style);
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          resizable = _props3.resizable,
          direction = _props3.direction,
          size = _props3.size,
          initialSize = _props3.initialSize,
          rest = _objectWithoutProperties(_props3, ["resizable", "direction", "size", "initialSize"]);

      var fullStyle = this.setStyle();

      delete rest.splitDirection;
      delete rest.stretchable;

      if (resizable) {

        var resizableProps = _extends({}, rest, {
          style: fullStyle,
          direction: direction
        });

        if (size != null) resizableProps.size = size;
        if (initialSize != null) resizableProps.initialSize = initialSize;

        return _react2.default.createElement(
          _Resizable2.default,
          resizableProps,
          this.renderChildren()
        );
      } else {

        delete rest.minSize;
        delete rest.maxSize;
        delete rest.resizerPos;
        delete rest.resizerSize;
        delete rest.resizerStyle;
        delete rest.resizerRenderer;
        delete rest.onDrag;
        delete rest.onDragStart;
        delete rest.onDragEnd;
        delete rest.onResized;

        if (initialSize || size) {
          var dimProp = direction === "column" ? "height" : "width";
          fullStyle[dimProp] = initialSize || size;
        }

        return _react2.default.createElement(
          "div",
          _extends({}, rest, { style: fullStyle }),
          this.renderChildren()
        );
      }
    }
  }]);

  return Panel;
}(_react.Component);

Panel.propTypes = {
  stretchable: _propTypes2.default.bool,
  resizable: _propTypes2.default.bool,
  direction: _propTypes2.default.oneOf(["row", "column"]),
  splitDirection: _propTypes2.default.oneOf(["row", "column"]),
  minSize: _propTypes2.default.number,
  maxSize: _propTypes2.default.number,

  resizerSize: _propTypes2.default.number, // customize size
  resizerStyle: _propTypes2.default.object, // customize style
  resizerRenderer: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func, _propTypes2.default.string]), // rewrite renderer

  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]), // controlled
  initialSize: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]), // uncontrolled

  onDrag: _propTypes2.default.func, // required if controlled
  onDragStart: _propTypes2.default.func,
  onDragEnd: _propTypes2.default.func,
  onResized: _propTypes2.default.func, // required if semi-controlled (state during redimension, prop when mouse released)

  children: _propTypes2.default.node,
  style: _propTypes2.default.object
};

Panel.defaultProps = {};

exports.default = Panel;