// interface
import {
  Serialized,
  NodeID,
  Adjacents,
  EdgeID,
  EdgeWeight,
  GraphNode,
  GraphEdge,
} from './Graph.interface';

class Graph {
  // nodes mean key, edges mean value
  private edges: Map<NodeID, Adjacents>;

  private edgeWeights: Map<EdgeID, EdgeWeight>;

  // Computes a string encoding of an edge,
  // for use as a key in an object.
  static encodeEdge(u: NodeID, v: NodeID): EdgeID {
    return `${u}|${v}`;
  }

  constructor(serialized?: Serialized) {
    this.edges = new Map();
    this.edgeWeights = new Map();

    // If a serialized graph was passed into the constructor, deserialize it.
    if (serialized) {
      this.deserialize(serialized);
    }
  }

  // gets the adjacent node list for the given node as access layer
  adjacent(nid: NodeID): Adjacents {
    return this.edges.get(nid) || new Set();
  }

  // maybe better when implment standard iterator
  nodes(): NodeID[] {
    const deduplication = new Set<NodeID>();

    this.edges.forEach((adjacents, nid) => {
      // node self
      deduplication.add(nid);
      // node adjacents
      adjacents.forEach((aid) => {
        deduplication.add(aid);
      });
    });

    return Array.from(deduplication);
  }

  // adds a node to the graph.
  // If node was already added, this function does nothing.
  // If node was not already added, this function sets up an empty adjacency list.
  addNode(nid: NodeID): Graph {
    this.edges.set(nid, this.adjacent(nid));

    return this;
  }

  // removes a node from the graph, also removes incoming and outgoing edges.
  removeNode(nid: NodeID): Graph {
    // delete node self
    this.edges.delete(nid);

    // delete adjacent link
    this.edges.forEach((adjacents) => {
      adjacents.delete(nid);
    });

    return this;
  }

  // directional edige
  addEdge(u: NodeID, v: NodeID, weight?: EdgeWeight): Graph {
    this.addNode(u);
    this.addNode(v);
    // node 'u' already within internal storage, without worrying about lost state
    this.adjacent(u).add(v);
    this.setEdgeWeight(u, v, weight);

    return this;
  }

  // Removes the edge from node u to node v.
  // Does not remove the nodes.
  // Does nothing if the edge does not exist.
  removeEdge(u: NodeID, v: NodeID): Graph {
    // remove adjacent node when source node exist, nothing when not exist
    this.adjacent(u).delete(u);

    // remove edge weight if any
    this.edgeWeights.delete(Graph.encodeEdge(u, v));

    return this;
  }

  // gets the weight of the given edge, returns 1 if no weight was previously set.
  // use number as weights just now
  getEdgeWeight(u: NodeID, v: NodeID): EdgeWeight {
    const weight = this.edgeWeights.get(Graph.encodeEdge(u, v));

    return weight === undefined ? 1 : weight;
  }

  // Sets the weight of the given edge.
  setEdgeWeight(u: NodeID, v: NodeID, weight?: EdgeWeight): Graph {
    if (weight) {
      this.edgeWeights.set(Graph.encodeEdge(u, v), weight);
    }

    return this;
  }

  serialize(): Serialized {
    const ids = this.nodes();
    const nodes = ids.map<GraphNode>((id) => ({ id }));
    const edges = ids.reduce<GraphEdge[]>((acc, id) => {
      // use mangle prefix for better semantic link
      // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
      const _edges: GraphEdge[] = [];

      this.adjacent(id).forEach((aid) => {
        _edges.push({
          source: id,
          target: aid,
          weight: this.getEdgeWeight(id, aid),
        });
      });

      return [...acc, ..._edges];
    }, []);

    return {
      nodes,
      edges,
    };
  }

  // Deserializes the given serialized graph
  deserialize(serialized: Serialized): Graph {
    serialized.nodes.forEach((node) => {
      this.addNode(node.id);
    });

    serialized.edges.forEach((edge) => {
      this.addEdge(edge.source, edge.target, edge.weight);
    });

    return this;
  }

  // Computes the indegree for the given node.
  // Not very efficient, costs O(E) where E = number of edges.
  indegree(nid: NodeID): number {
    return Array.from(this.edges.values()).reduce<number>((acc, curr) => {
      return curr.has(nid) ? acc + 1 : acc;
    }, 0);
  }

  // computes the outdegree for the given node.
  outdegree(nid: NodeID): number {
    return this.adjacent(nid).size;
  }
}

export default Graph;
