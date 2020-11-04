# graph

![Build Status](https://img.shields.io/travis/pipepack/graph/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/pipepack/graph/badge.svg?branch=master)](https://coveralls.io/github/pipepack/?branch=master)
![Package Dependency](https://david-dm.org/pipepack/graph.svg?style=flat)
![Package DevDependency](https://david-dm.org/pipepack/graph/dev-status.svg?style=flat)

A graph data structure with pipepack related algorithm.

# Installing

This library is distributed only via [NPM](npmjs.com).

```shell
# npm
npm install @pipepack/graph;
# yarn
yarn add @pipepack/graph;
```

Then, use like below:

```javascript
// esm
import { Graph } from '@pipepack/graph';
// commonjs
const { Graph } = require('@pipepack/graph');
```

### Serialization

Serializes the graph with declaration below:

```typescript
type NodeID = string;
type EdgeID = string;
type EdgeWeight = string | number;

interface GraphNode {
  id: NodeID;
}

interface GraphEdge {
  source: NodeID;
  target: NodeID;
  weight?: EdgeWeight;
}

interface Serialized {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
```

```javascript
const graph = new Graph();

graph.addEdge('a', 'b');
graph.addEdge('b', 'c');
```

```json
{
  "nodes": [{ "id": "a" }, { "id": "b" }, { "id": "c" }],
  "links": [
    { "source": "a", "target": "b", "weight": 1 },
    { "source": "b", "target": "c", "weight": 1 }
  ]
}
```

# Licence

MIT
