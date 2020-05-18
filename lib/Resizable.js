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

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Resizer = require("./Resizer");

var _Resizer2 = _interopRequireDefault(_Resizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resizable = function (_Component) {
  _inherits(Resizable, _Component);

  function Resizable(props) {
    _classCallCheck(this, Resizable);

    var _this = _possibleConstructorReturn(this, (Resizable.__proto__ || Object.getPrototypeOf(Resizable)).call(this, props));

    _this.setUnit = _this.setUnit.bind(_this);
    _this.handleDragStart = _this.handleDragStart.bind(_this);
    _this.handleDrag = _this.handleDrag.bind(_this);
    _this.handleDragEnd = _this.handleDragEnd.bind(_this);

    _this.xClick = null;
    _this.yClick = null;
    _this.sizeInit = null;

    _this.state = { size: _this.props.initialSize || _this.props.size };
    return _this;
  }

  _createClass(Resizable, [{
    key: "getComputedDim",
    value: function getComputedDim() {
      var unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "px";
      var node = this.node;


      if (!node.getBoundingClientRect) node = _reactDom2.default.findDOMNode(node);

      var _node$getBoundingClie = node.getBoundingClientRect(),
          width = _node$getBoundingClie.width,
          height = _node$getBoundingClie.height;

      if (unit === "%" && this.unit === "%") {

        var parent = node.parentNode;
        var dimParent = parent.getBoundingClientRect();
        var parentStyle = window.getComputedStyle(node.parentNode, null);
        var paddingLeft = parseFloat(parentStyle.paddingLeft);
        var paddingRight = parseFloat(parentStyle.paddingRight);
        var paddingTop = parseFloat(parentStyle.paddingTop);
        var paddingBottom = parseFloat(parentStyle.paddingBottom);

        var widthParent = dimParent.width - paddingLeft - paddingRight;
        var heightParent = dimParent.height - paddingTop - paddingBottom;

        width = Math.round(width / widthParent * 10000) / 100 + "%";
        height = Math.round(height / heightParent * 10000) / 100 + "%";
      }

      return { width: width, height: height };
    }
  }, {
    key: "getProp",
    value: function getProp() {

      return this.props.direction === "row" ? "width" : "height";
    }
  }, {
    key: "handleDragStart",
    value: function handleDragStart(e) {

      this.xClick = e.pageX;
      this.yClick = e.pageY;

      var dim = this.getComputedDim("px");
      var prop = this.getProp();
      var size = dim[prop];

      if (!this.isControlled()) this.setState({ size: size });

      this.sizeInit = size;

      if (this.props.onDrag) this.props.onDrag(size, e);
      if (this.props.onDragStart) this.props.onDragStart(size, e);
    }
  }, {
    key: "handleDragEnd",
    value: function handleDragEnd(e) {
      var _props = this.props,
          onDrag = _props.onDrag,
          onDragEnd = _props.onDragEnd,
          onResized = _props.onResized;


      var dim = this.getComputedDim("%");
      var prop = this.getProp();
      var size = dim[prop];
      var isControlled = this.isControlled();

      if (!isControlled) {
        this.setState({ size: size });
        this.sizeInit = null;
      }

      if (onDrag) onDrag(size, e);
      if (onDragEnd) onDragEnd(size, e);
      if (onResized) onResized(size, e);
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(e) {
      var _props2 = this.props,
          direction = _props2.direction,
          resizerPos = _props2.resizerPos,
          minSize = _props2.minSize,
          maxSize = _props2.maxSize,
          onDrag = _props2.onDrag;

      var controlled = this.isControlled();

      var size = this.sizeInit;

      if (direction === "row") {

        var deltaX = (e.pageX - this.xClick) * (resizerPos === "before" ? -1 : 1);

        size = Math.min(maxSize, Math.max(minSize, this.sizeInit + deltaX));
      } else {

        var deltaY = (e.pageY - this.yClick) * (resizerPos === "before" ? -1 : 1);

        size = Math.min(maxSize, Math.max(minSize, this.sizeInit + deltaY));
      }

      if (!controlled) this.setState({ size: size });

      if (onDrag) onDrag(size, e);
    }
  }, {
    key: "getOwnDim",
    value: function getOwnDim() {

      var useProps = this.isControlled() || this.isSemiControlled() && this.sizeInit == null;

      return this[useProps ? "props" : "state"].size;
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      var _props3 = this.props,
          size = _props3.size,
          initialSize = _props3.initialSize,
          onDrag = _props3.onDrag,
          onResized = _props3.onResized;


      return initialSize == null && size != null && onDrag != null && onResized == null;
    }
  }, {
    key: "isSemiControlled",
    value: function isSemiControlled() {
      var _props4 = this.props,
          size = _props4.size,
          initialSize = _props4.initialSize,
          onResized = _props4.onResized;


      return initialSize == null && size != null && onResized != null;
    }
  }, {
    key: "setUnit",
    value: function setUnit(dimension) {

      var dim = dimension || this.getOwnDim();

      this.unit = dim && /%/.test(dim) ? "%" : "px";
    }
  }, {
    key: "setContainerStyle",
    value: function setContainerStyle() {
      var direction = this.props.direction;


      var size = this.getOwnDim();

      var style = {
        display: "flex",
        alignItems: "stretch",
        flexDirection: direction
      };

      if (size === null) style.flex = 1;else if (direction === "row") style.width = size;else style.height = size;

      return style;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setUnit(this.props.initialSize);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props5 = this.props,
          direction = _props5.direction,
          children = _props5.children,
          resizerPos = _props5.resizerPos,
          resizerSize = _props5.resizerSize,
          resizerStyle = _props5.resizerStyle,
          resizerRenderer = _props5.resizerRenderer,
          style = _props5.style,
          rest = _objectWithoutProperties(_props5, ["direction", "children", "resizerPos", "resizerSize", "resizerStyle", "resizerRenderer", "style"]);

      delete rest.minSize;
      delete rest.maxSize;
      delete rest.size;
      delete rest.initialSize;
      delete rest.minSize;
      delete rest.maxSize;
      delete rest.onDragStart;
      delete rest.onDrag;
      delete rest.onDragEnd;
      delete rest.onResized;

      var content = _react2.default.createElement(
        "div",
        _extends({}, rest, { style: _extends({ flex: 1 }, style) }),
        children
      );

      var resizerProps = {
        direction: direction,
        onDragStart: this.handleDragStart,
        onDrag: this.handleDrag,
        onDragEnd: this.handleDragEnd
      };

      if (resizerSize) resizerProps.size = resizerSize;
      if (resizerStyle) resizerProps.style = resizerStyle;
      if (resizerRenderer) resizerProps.renderer = resizerRenderer;

      var resizer = _react2.default.createElement(_Resizer2.default, resizerProps);

      return _react2.default.createElement(
        "div",
        { style: this.setContainerStyle(), ref: function ref(node) {
            return _this2.node = node;
          } },
        resizerPos === "before" ? resizer : content,
        resizerPos === "before" ? content : resizer
      );
    }
  }]);

  return Resizable;
}(_react.Component);

Resizable.propTypes = {
  children: _propTypes2.default.node,
  style: _propTypes2.default.object,
  resizerPos: _propTypes2.default.oneOf(["before", "after"]),
  resizerSize: _propTypes2.default.number,
  resizerStyle: _propTypes2.default.object,
  resizerRenderer: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func, _propTypes2.default.string]),
  onDragStart: _propTypes2.default.func,
  onDrag: _propTypes2.default.func,
  onDragEnd: _propTypes2.default.func, // for fully controlled use
  onResized: _propTypes2.default.func, // for semi-controlled use
  direction: _propTypes2.default.oneOf(["row", "column"]),
  initialSize: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), // for uncontrolled use
  minSize: _propTypes2.default.number,
  maxSize: _propTypes2.default.number,
  size: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]) // for semi or fully controlled use
};

Resizable.defaultProps = {
  direction: "row",
  resizerPos: "after",
  minSize: 0,
  maxSize: Infinity
};

exports.default = Resizable;