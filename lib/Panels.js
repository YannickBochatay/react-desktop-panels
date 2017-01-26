"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  ul: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    cursor: "default"
  },
  li: {
    minWidth: 35,
    flex: "0 1 125px",
    minHeight: 20,
    maxHeight: 20,
    border: "1px solid #ddd",
    borderBottom: "none",
    padding: "0px 10px",
    background: "#f5f5f5",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  liActive: {
    minHeight: 23,
    maxHeight: 23,
    background: "white",
    transform: "translateY(1px)"
  },
  content: {
    flex: 1,
    border: "1px solid #ddd",
    padding: 5
  }
};

var Panels = function (_Component) {
  _inherits(Panels, _Component);

  function Panels(props) {
    _classCallCheck(this, Panels);

    var _this = _possibleConstructorReturn(this, (Panels.__proto__ || Object.getPrototypeOf(Panels)).call(this, props));

    _this.state = { active: 0 };

    return _this;
  }

  _createClass(Panels, [{
    key: "handleClick",
    value: function handleClick(i) {

      this.setState({ active: i });
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var _this2 = this;

      var active = this.state.active;


      return _react.Children.map(this.props.children, function (child, i) {
        var label = child.props.label;


        var style = _extends({}, styles.li);

        if (active === i) style = _extends({}, style, styles.liActive);

        return _react2.default.createElement(
          "li",
          { style: style, onClick: _this2.handleClick.bind(_this2, i), key: "panelTitle" + i },
          label
        );
      });
    }
  }, {
    key: "renderActivePanel",
    value: function renderActivePanel() {
      var children = this.props.children;
      var active = this.state.active;


      return _react.Children.toArray(children)[active];
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          style = _props.style,
          rest = _objectWithoutProperties(_props, ["style"]);

      delete rest.children;

      return _react2.default.createElement(
        "div",
        _extends({}, rest, { style: _extends({}, styles.container, style) }),
        _react2.default.createElement(
          "ul",
          { style: styles.ul },
          this.renderHeader()
        ),
        _react2.default.createElement(
          "div",
          { style: styles.content },
          this.renderActivePanel()
        )
      );
    }
  }]);

  return Panels;
}(_react.Component);

Panels.propTypes = {
  style: _react.PropTypes.object,
  children: _react.PropTypes.node
};

exports.default = Panels;