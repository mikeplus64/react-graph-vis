/* @flow */
import { default as React, Component } from 'react';
const vis = require('vis');
const uuid = require('uuid');

type Id = any;

type GraphOptions = {
  stabilize?: boolean,
  smoothCurves?: boolean,
  edges: {
    color?: string,
    width: string|number,
    arrowScaleFactor: number,
    style: string
  },
  hierarchicalLayout: {
    enabled: boolean,
    direction: 'UD'|'TD',
    levelSeparation: 100,
    nodeSpacing: number,
  },
}

type GraphProps = {
  graph: {
    nodes: Array<{ id: Id, label: string }>,
    edges: Array<{ from: Id, to: Id, label?: string }>,
  },
  options: GraphOptions,
  style?: { [attr: string]: any },
  className?: string,
};

declare class Vis {
  setData(graph: { nodes: any, edges: any }): void,
  setOptions(opts: GraphOptions): void,
};

export default class Graph extends Component<GraphProps, GraphProps, void> {

  id: any;
  vis: ?Vis;
  container: ?HTMLElement;
  props: GraphProps;

  static defaultProps: GraphProps = {
    graph: { nodes: [], edges: [] },
    attributes: {},
    options: Graph.defaultOptions,
  }

  static defaultOptions: GraphOptions = {
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

  constructor(props: GraphProps) {
    super(props);
    this.id = uuid.v4();
  }

  componentDidMount() {
    this.updateGraph();
  }

  componentDidUpdate(prevProps: GraphProps) {
    this.updateGraph(prevProps.options === this.props.options);
  }

  updateGraph(sameOptions: boolean = true) {
    if (this.container != null) {
      if (this.vis != null) {
        this.vis.setData(this.props.graph);
        if (!sameOptions && this.props.options != null) {
          // flowtype doesn't see that this.vis != null already in this block of code
          // maybe it figures .setData could null it?
          console.log('vis setOptions');
          this.vis.setOptions(this.props.options);
        }
      } else {
        this.vis = new vis.Network(this.container, this.props.graph, this.props.options);
      }
    }
  }

  render() {
    return <div
      ref={(e) => { this.container = e; }}
      id={this.id}
      style={this.props.style}
      className={this.props.className}
    />;
  }
}

