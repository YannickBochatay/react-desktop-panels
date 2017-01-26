"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Resizer = require("./Resizer");

var _Resizer2 = _interopRequireDefault(_Resizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Split = function (_Component) {
  _inherits(Split, _Component);

  function Split(props) {
    _classCallCheck(this, Split);

    var _this = _possibleConstructorReturn(this, (Split.__proto__ || Object.getPrototypeOf(Split)).call(this, props));

    _this.handleDragStart = _this.handleDragStart.bind(_this);
    _this.handleDrag = _this.handleDrag.bind(_this);
    _this.handleResize = _this.handleResize.bind(_this);

    _this.state = {
      width: null,
      height: null
    };

    _this.xClick = null;
    _this.yClick = null;
    _this.widthInit = null;
    _this.heightInit = null;
    _this.winWidth = null;
    _this.winHeight = null;

    return _this;
  }

  _createClass(Split, [{
    key: "getAndSetDim",
    value: function getAndSetDim(callback) {
      var node = this.node;


      if (!node.getBoundingClientRect) node = _reactDom2.default.findDOMNode(node);

      var dim = node.getBoundingClientRect();

      this.setState({
        width: dim.width,
        height: dim.height
      }, callback);
    }
  }, {
    key: "handleDragStart",
    value: function handleDragStart(e) {
      var _this2 = this;

      this.xClick = e.pageX;
      this.yClick = e.pageY;

      this.getAndSetDim(function () {

        _this2.widthInit = _this2.state.width;
        _this2.heightInit = _this2.state.height;
      });
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(e) {
      var vertical = this.props.vertical;


      if (vertical) this.setState({ width: this.widthInit + e.pageX - this.xClick });else this.setState({ height: this.heightInit + e.pageY - this.yClick });
    }
  }, {
    key: "setWinDim",
    value: function setWinDim() {

      this.winWidth = window.innerWidth;
      this.winHeight = window.innerHeight;
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      var vertical = this.props.vertical;
      var _state = this.state,
          width = _state.width,
          height = _state.height;


      if (width === null) {

        this.getAndSetDim(this.handleResize);

        return;
      }

      if (!this.winWidth) this.setWinDim();

      if (vertical) this.setState({ width: Math.round(width * window.innerWidth / this.winWidth) });else this.setState({ height: Math.round(height * window.innerHeight / this.winHeight) });

      this.setWinDim();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {

      window.addEventListener("resize", this.handleResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {

      window.removeEventListener("resize", this.handleResize);
    }
  }, {
    key: "renderFirstDiv",
    value: function renderFirstDiv(elmt) {
      var _this3 = this;

      var _state2 = this.state,
          width = _state2.width,
          height = _state2.height;


      var dimStyle = null;

      if (width === null && height === null) dimStyle = { flex: 1 };else if (this.props.vertical) dimStyle = { width: width };else dimStyle = { height: height };

      return _react2.default.cloneElement(elmt, {
        style: _extends({}, elmt.props.style, dimStyle),
        ref: function ref(node) {
          return _this3.node = node;
        },
        key: "firstDiv"
      });
    }
  }, {
    key: "renderSecondDiv",
    value: function renderSecondDiv(elmt) {

      return _react2.default.cloneElement(elmt, {
        style: _extends({}, elmt.props.style, { flex: 1 }),
        key: "secondDiv"
      });
    }
  }, {
    key: "renderResizer",
    value: function renderResizer() {

      return _react2.default.createElement(_Resizer2.default, {
        vertical: this.props.vertical,
        onDragStart: this.handleDragStart,
        onDrag: this.handleDrag,
        key: "resizer"
      });
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {

      var children = _react2.default.Children.toArray(this.props.children);

      if (children.length !== 2) throw new Error("you should have 2 elements as children");

      return [this.renderFirstDiv(children[0]), this.renderResizer(), this.renderSecondDiv(children[1])];
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          vertical = _props.vertical,
          style = _props.style,
          rest = _objectWithoutProperties(_props, ["vertical", "style"]);

      var flexStyle = {
        display: "flex",
        alignItems: "stretch",
        flexDirection: vertical ? "row" : "column"
      };

      return _react2.default.createElement(
        "div",
        _extends({}, rest, { style: _extends({}, style, flexStyle) }),
        this.renderChildren()
      );
    }
  }]);

  return Split;
}(_react.Component);

Split.propTypes = {
  vertical: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  children: _react.PropTypes.node
};

exports.default = Split;