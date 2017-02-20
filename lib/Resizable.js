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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resizable = function (_Component) {
    _inherits(Resizable, _Component);

    function Resizable(props) {
        _classCallCheck(this, Resizable);

        var _this = _possibleConstructorReturn(this, (Resizable.__proto__ || Object.getPrototypeOf(Resizable)).call(this, props));

        _this.setDimInit = _this.setDimInit.bind(_this);
        _this.handleDragStart = _this.handleDragStart.bind(_this);
        _this.handleDrag = _this.handleDrag.bind(_this);
        _this.handleDragEnd = _this.handleDragEnd.bind(_this);

        _this.state = {
            width: null,
            height: null
        };

        _this.xClick = null;
        _this.yClick = null;
        _this.widthInit = null;
        _this.heightInit = null;

        return _this;
    }

    _createClass(Resizable, [{
        key: "getAndSetDim",
        value: function getAndSetDim(units, callback) {
            var node = this.node;


            if (!node.getBoundingClientRect) node = _reactDom2.default.findDOMNode(node);

            var _node$getBoundingClie = node.getBoundingClientRect(),
                width = _node$getBoundingClie.width,
                height = _node$getBoundingClie.height;

            if (units === "%") {

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

            this.setState({ width: width, height: height }, callback);
        }
    }, {
        key: "handleDragStart",
        value: function handleDragStart(e) {

            this.xClick = e.pageX;
            this.yClick = e.pageY;

            this.getAndSetDim("px", this.setDimInit);

            if (this.props.onDragStart) this.props.onDragStart(e);
        }
    }, {
        key: "handleDragEnd",
        value: function handleDragEnd(e) {

            this.getAndSetDim("%");

            if (this.props.onDragEnd) this.props.onDragEnd(e);
        }
    }, {
        key: "handleDrag",
        value: function handleDrag(e) {
            var _props = this.props,
                direction = _props.direction,
                resizerPos = _props.resizerPos,
                minSize = _props.minSize,
                maxSize = _props.maxSize;


            if (direction === "row") {

                var deltaX = (e.pageX - this.xClick) * (resizerPos === "before" ? -1 : 1);
                var width = Math.min(maxSize, Math.max(minSize, this.widthInit + deltaX));

                this.setState({ width: width });
            } else {

                var deltaY = (e.pageY - this.yClick) * (resizerPos === "before" ? -1 : 1);
                var height = Math.min(maxSize, Math.max(minSize, this.heightInit + deltaY));

                this.setState({ height: height });
            }

            if (this.props.onDrag) this.props.onDrag(e);
        }
    }, {
        key: "setDimInit",
        value: function setDimInit() {

            this.widthInit = this.state.width;
            this.heightInit = this.state.height;
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            var _props2 = this.props,
                defaultSize = _props2.defaultSize,
                direction = _props2.direction;


            if (defaultSize != null) {
                var prop = direction === "row" ? "width" : "height";

                this.setState(_defineProperty({}, prop, defaultSize));
            }
        }
    }, {
        key: "setContainerStyle",
        value: function setContainerStyle() {
            var direction = this.props.direction;
            var _state = this.state,
                width = _state.width,
                height = _state.height;


            var style = {
                display: "flex",
                alignItems: "stretch",
                flexDirection: direction
            };

            if (width === null && height === null) style.flex = 1;else if (direction === "row") style.width = width;else style.height = height;

            return style;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props3 = this.props,
                direction = _props3.direction,
                children = _props3.children,
                resizerPos = _props3.resizerPos,
                style = _props3.style,
                rest = _objectWithoutProperties(_props3, ["direction", "children", "resizerPos", "style"]);

            delete rest.minSize;
            delete rest.maxSize;
            delete rest.defaultSize;

            var content = _react2.default.createElement(
                "div",
                _extends({}, rest, { style: _extends({ flex: 1 }, style) }),
                children
            );

            var resizer = _react2.default.createElement(_Resizer2.default, {
                direction: direction,
                onDragStart: this.handleDragStart,
                onDrag: this.handleDrag,
                onDragEnd: this.handleDragEnd
            });

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
    children: _react.PropTypes.node,
    style: _react.PropTypes.object,
    resizerPos: _react.PropTypes.oneOf(["before", "after"]),
    onDragStart: _react.PropTypes.func,
    onDrag: _react.PropTypes.func,
    onDragEnd: _react.PropTypes.func,
    direction: _react.PropTypes.oneOf(["row", "column"]),
    defaultSize: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    minSize: _react.PropTypes.number,
    maxSize: _react.PropTypes.number
};

Resizable.defaultProps = {
    direction: "row",
    resizerPos: "after",
    minSize: 80,
    maxSize: 2000
};

exports.default = Resizable;