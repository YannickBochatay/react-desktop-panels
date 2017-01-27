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

var Splitter = function (_Component) {
  _inherits(Splitter, _Component);

  function Splitter(props) {
    _classCallCheck(this, Splitter);

    var _this = _possibleConstructorReturn(this, (Splitter.__proto__ || Object.getPrototypeOf(Splitter)).call(this, props));

    _this.handleResize = _this.handleResize.bind(_this);
    _this.setDimInit = _this.setDimInit.bind(_this);

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

  _createClass(Splitter, [{
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

      this.xClick = e.pageX;
      this.yClick = e.pageY;

      this.getAndSetDim(this.setDimInit);
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(e) {
      var vertical = this.props.vertical;


      if (vertical) this.setState({ width: this.widthInit + e.pageX - this.xClick });else this.setState({ height: this.heightInit + e.pageY - this.yClick });
    }
  }, {
    key: "setDimInit",
    value: function setDimInit() {

      this.widthInit = this.state.width;
      this.heightInit = this.state.height;
    }
  }, {
    key: "setWinDim",
    value: function setWinDim() {

      this.winWidth = window.innerWidth;
      this.winHeight = window.innerHeight;
    }
  }, {
    key: "hasResizer",
    value: function hasResizer(childrenProps) {

      if (!childrenProps) childrenProps = this.props.children;

      var children = _react2.default.Children.toArray(childrenProps);

      return children[1] && children[1].type === _Resizer2.default;
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      var vertical = this.props.vertical;
      var _state = this.state,
          width = _state.width,
          height = _state.height;


      if (!this.winWidth) this.setWinDim();

      if (width === null || height === null) {
        this.getAndSetDim(this.setDimInit);
        return;
      }

      if (vertical) this.setState({ width: Math.round(width * window.innerWidth / this.winWidth) });else this.setState({ height: Math.round(height * window.innerHeight / this.winHeight) });

      this.setWinDim();
    }
  }, {
    key: "attachResizeListener",
    value: function attachResizeListener() {

      window.addEventListener("resize", this.handleResize);
    }
  }, {
    key: "detachResizeListener",
    value: function detachResizeListener() {

      window.removeEventListener("resize", this.handleResize);
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {

      var hadResizer = this.hasResizer(this.props.children);
      var hasResizer = this.hasResizer(nextProps.children);

      if (hadResizer && !hasResizer) {
        this.detachResizeListener();
        this.setState({ width: null, height: null });
      } else if (!hadResizer && hasResizer) this.attachResizeListener();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {

      if (this.resizer) this.attachResizeListener();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {

      this.detachResizeListener();
    }
  }, {
    key: "renderFirstDiv",
    value: function renderFirstDiv(elmt) {
      var _this2 = this;

      var _state2 = this.state,
          width = _state2.width,
          height = _state2.height;
      var vertical = this.props.vertical;


      var style = _extends({}, elmt.props.style);

      if (width === null && height === null) style.flex = 1;else if (vertical) style.width = width;else style.height = height;

      return _react2.default.cloneElement(elmt, {
        ref: function ref(node) {
          return _this2.node = node;
        },
        key: "firstDiv",
        style: style
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
    value: function renderResizer(resizer) {
      var _this3 = this;

      if (resizer.type !== _Resizer2.default) throw new TypeError("argument should be a Resizer element");

      return _react2.default.cloneElement(resizer, {

        vertical: this.props.vertical,

        onDragStart: function onDragStart(e) {
          _this3.handleDragStart(e);
          if (resizer.props.onDragStart) resizer.props.onDragStart(e);
        },

        onDrag: function onDrag(e) {
          _this3.handleDrag(e);
          if (resizer.props.onDrag) resizer.props.onDrag(e);
        },

        key: "resizer",

        ref: function ref(elmt) {
          return _this3.resizer = elmt;
        }

      });
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {

      var children = _react2.default.Children.toArray(this.props.children);

      if (children.length !== 2 && children.length !== 3) throw new Error("you should have 2 or 3 elements as children");

      if (children.length === 3) {

        return [this.renderFirstDiv(children[0]), this.renderResizer(children[1]), this.renderSecondDiv(children[2])];
      } else {

        return [this.renderFirstDiv(children[0]), this.renderSecondDiv(children[1])];
      }
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

  return Splitter;
}(_react.Component);

Splitter.propTypes = {
  vertical: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  children: _react.PropTypes.node
};

exports.default = Splitter;