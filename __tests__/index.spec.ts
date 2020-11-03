/**
 * @description - suits example
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

import { Graph } from '../src';

describe('Graph Structure', () => {
  it('should add nodes and list them.', () => {
    const graph = new Graph();

    graph.addNode('a');
    graph.addNode('b');
    graph.addNode('c');

    const nodes = graph.nodes();

    expect(nodes.length).toEqual(3);
    expect(nodes).toContain('a');
    expect(nodes).toContain('b');
  });

  it('should implement chain of responsibility', () => {
    const graph = new Graph();

    expect(graph.addNode('a') instanceof Graph).toEqual(true);
    expect(graph.removeNode('a') instanceof Graph).toEqual(true);
    expect(graph.addEdge('b', 'c') instanceof Graph).toEqual(true);
    expect(graph.removeEdge('b', 'c') instanceof Graph).toEqual(true);
  });

  it('should allow edge weight', () => {
    const graph = new Graph();

    graph.addNode('a').addNode('b').addEdge('a', 'b', 10);

    expect(graph.getEdgeWeight('a', 'b')).toEqual(10);
  });
});
