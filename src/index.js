import { default as React, Component } from 'react';
const vis = require('vis');
const uuid = require('uuid');

export default class Graph extends Component {

  static defaultOptions = {
    stabilize: false,
    smoothCurves: false,
    edges: {
      color: '#000000',
      width: 0.5,
      arrowScaleFactor: 0.5,
      style: 'arrow',
    },
    hierarchicalLayout: {
      enabled: true,
      direction: 'UD',
      levelSeparation: 100,
      nodeSpacing: 1
    },
  };

  constructor(props) {
    super(props);
    this.id = uuid.v4();
    if (props.options != null) {
      this.options = {
        ...Graph.defaultOptions,
        ...props.options
      };
    } else {
      this.options = Graph.defaultOptions;
    }
    if (this.props.options) {
      delete this.props.options;
    }
  }

  componentDidMount() {
    this.updateGraph();
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  updateGraph() {
    if (this.container != null) {
      if (this.vis != null) {
        this.vis.setData(this.props.graph);
      } else {
        this.vis = new vis.Network(this.container, this.props.graph, this.options);
      }
    }
  }

  render() {
    return <div
      ref={(e) => { this.container = e; }}
      id={this.id}
      {...this.props}
    />;
  }
}

