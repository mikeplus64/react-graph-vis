'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vis = require('vis');
var uuid = require('uuid');

var Graph = function (_Component) {
  _inherits(Graph, _Component);

  function Graph(props) {
    _classCallCheck(this, Graph);

    var _this = _possibleConstructorReturn(this, (Graph.__proto__ || Object.getPrototypeOf(Graph)).call(this, props));

    _this.id = uuid.v4();
    return _this;
  }

  _createClass(Graph, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateGraph();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateGraph();
    }
  }, {
    key: 'updateGraph',
    value: function updateGraph() {
      if (this.container != null) {
        if (this.vis != null) {
          this.vis.setData(this.props.graph);
        } else {
          this.vis = new vis.Network(this.container, this.props.graph, this.props.options);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', {
        ref: function ref(e) {
          _this2.container = e;
        },
        id: this.id,
        style: this.props.style,
        className: this.props.className
      });
    }
  }]);

  return Graph;
}(_react.Component);

Graph.defaultProps = {
  graph: { nodes: [], edges: [] },
  attributes: {},
  options: Graph.defaultOptions
};
Graph.defaultOptions = {
  stabilize: false,
  smoothCurves: false,
  edges: {
    color: '#000000',
    width: 0.5,
    arrowScaleFactor: 0.5,
    style: 'arrow'
  },
  hierarchicalLayout: {
    enabled: true,
    direction: 'UD',
    levelSeparation: 100,
    nodeSpacing: 1
  }
};
exports.default = Graph;