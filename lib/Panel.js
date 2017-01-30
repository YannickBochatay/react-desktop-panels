"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
          direction = _props.direction,
          children = _props.children;


      var childrenArray = _react.Children.toArray(children);

      return childrenArray.map(function (child, i) {

        if (!child.props) return child;

        if (child.props.resizable) {

          var props = {};

          if (!child.props.direction) props.direction = direction;

          if (children[i - 1] && children[i - 1].props.resizable) {
            // props.resizable = false
            // props.style = { ...child.props.style, flex : 1 }
          } else if (i === childrenArray.length - 1) props.resizerPos = "before";

          return _react2.default.cloneElement(child, props);
        }
        /* else if (i < childrenArray.length - 1) {
           const cssProp = "margin" + (direction === "row" ? "Right" : "Bottom")
          const style = { ...child.props.style, [cssProp] : 5 }
           return React.cloneElement(child, { style })
        } */
        else return child;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          stretchable = _props2.stretchable,
          resizable = _props2.resizable,
          direction = _props2.direction,
          children = _props2.children,
          style = _props2.style,
          defaultSize = _props2.defaultSize,
          rest = _objectWithoutProperties(_props2, ["stretchable", "resizable", "direction", "children", "style", "defaultSize"]);

      var childrenArray = _react.Children.toArray(children);

      var splitted = childrenArray.some(function (child) {
        return child.type === Panel;
      });

      var fullStyle = _extends({}, style);

      if (stretchable) fullStyle.flex = 1;

      if (splitted) {

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
          this.renderChildren()
        );
      } else {

        if (defaultSize) {
          var dimProp = direction === "column" ? "height" : "width";
          fullStyle[dimProp] = defaultSize;
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
  stretchable: _react.PropTypes.bool,
  resizable: _react.PropTypes.bool,
  direction: _react.PropTypes.oneOf(["row", "column"]),
  children: _react.PropTypes.node,
  style: _react.PropTypes.object,
  defaultSize: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};

Panel.defaultProps = {};

exports.default = Panel;