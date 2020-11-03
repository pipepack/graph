import { type } from 'os';

export type NodeID = string;
export type EdgeID = string;
// not sure about this
export type EdgeWeight = number;
export type Adjacents = Set<NodeID>;

export interface GraphNode {
  id: NodeID;
}

export interface GraphEdge {
  source: NodeID;
  target: NodeID;
  weight?: EdgeWeight;
}

export interface Serialized {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
