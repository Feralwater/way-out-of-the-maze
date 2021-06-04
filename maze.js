function wayOutOfTheMaze(maze) {
  const graph = createGraph(maze)
  const startNode = start(maze)
  const endNode = end(maze)
}




const maze = [

  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],

  ['#', '+', '+', '+', '#', '+', '+', '+', '#'],

  ['#', '+', '#', '+', '#', '+', '#', '+', '#'],

  ['+', '+', '#', '+', '0', '+', '#', '+', '#'],

  ['#', '#', '#', '+', '#', '#', '#', '#', '#'],

  ['#', '#', '+', '+', '#', '#', '#', '#', '#'],

  ['#', '#', '+', '#', '#', '#', '#', '#', '#'],

  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],

]


function start(maze) {
  let start = {
    y: null,
    x: null,
  };
  maze.map((el, index1) => {
    el.map((el, index2) => {
      el === "0" && ((start.y = index1) && (start.x = index2))
    })
  })
  return start.y + "." + start.x;
}

function end(maze) {
  let end = {
    y: null,
    x: null,
  };
  maze[0].map((el, index2) => {
    el === "+" && ((end.y = 0) && (end.x = index2))
  })
  maze[maze.length - 1].map((el, index2) => {
    el === "+" && ((end.y = [maze.length - 1]) && (end.x = index2))
  })
  maze.forEach((el, i) => {
    el[maze[0].length - 1] === "+" && ((end.y = i) && (end.x = [maze[0].length - 1]))
    el[0] === "+" && ((end.y = i) && (end.x = 0))
  })

  return end.y + "." + end.x;
}

let createGraph = (arr) => {
  const graph = {}
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      (arr[y][x] === "+" || arr[y][x] === "0") && (graph[y + '.' + x] = {})
      if ((y - 1 !== -1) && (arr[y][x] === "+" || arr[y][x] === "0") && (arr[y - 1][x] === "+")) {
        graph[y + '.' + x][(y - 1) + '.' + x] = 1
      }
      if ((x - 1 !== -1) && (arr[y][x] === "+" || arr[y][x] === "0") && (arr[y][x - 1] === "+")) {
        graph[y + '.' + x][y + '.' + (x - 1)] = 1
      }
      if ((y + 1 !== arr.length) && (arr[y][x] === "+" || arr[y][x] === "0") && (arr[y + 1][x] === "+")) {
        graph[y + '.' + x][(y + 1) + '.' + x] = 1
      }
      if ((x + 1 !== arr[y].length) && (arr[y][x] === "+" || arr[y][x] === "0") && (arr[y][x + 1] === "+")) {
        graph[y + '.' + x][y + '.' + (x + 1)] = 1
      }
    }
  }
  return graph
}




function dijkstraAlgorithm(edges, startNode, endNode) {
  const shortestDistanceNode = (distances, visited) => {
    let shortest = null;

    for (let node in distances) {
      let currentIsShortest =
        shortest === null || distances[node] < distances[shortest];
      if (currentIsShortest && !visited.includes(node)) {
        shortest = node;
      }
    }
    return shortest;
  };
  let distances = {};
  distances[endNode] = "Infinity";
  distances = Object.assign(distances, edges[startNode]);
  let parents = {endNode: null};

  for (let child in edges[startNode]) {
    parents[child] = startNode;
  }
  let visited = [];

  let node = shortestDistanceNode(distances, visited);

  while (node) {
    let distance = distances[node];
    let children = edges[node];
    for (let child in children) {
      if (String(child) !== String(startNode)) {
        let newDistance = distance + children[child];
        if (!distances[child] || distances[child] > newDistance) {
          distances[child] = newDistance;
          parents[child] = node;
        }
      }
    }

    visited.push(node);

    node = shortestDistanceNode(distances, visited);
  }
  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  return shortestPath;
}

const res = dijkstraAlgorithm(graph, startNode, endNode);

function results (res) {
  let result = res.map(el => +el * 10)
  let answer = [];
  for (let i = 0; i < result.length; i++) {
    if (result[i] - result[i + 1] === 1) {
      answer.push("left")
    }
    if (result[i] - result[i + 1] === 10) {
      answer.push("top")
    }
    if (result[i] - result[i + 1] === -1) {
      answer.push("right")
    }
    if (result[i] - result[i + 1] === -10) {
      answer.push("bottom")
    }
  }
  return `${"['" + answer.join('\',\'') + "']"}`
}

const data = results(res);

function saveFileData(data) {
  const fs = require("fs")
  fs.writeFileSync("path-plan.txt", data, "ascii")
}

saveFileData(data)