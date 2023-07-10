let sum = [1, 2, 3, 4, 5]
var a = sum.reduce(function (tot, el, i) {
  return tot + el;
},0)
// a = 15
// sum = [1, 2, 3, 4, 5]

// 1번째 tot = 0, el = 1, i = 0, return 1
// 2번째 tot = 1, el = 2, i = 1, return 3
// 3번째 tot = 3, el = 3, i = 2, return 6
// 4번째 tot = 6, el = 4, i = 3, return 5
// 5번째 tot = 10, el = 5, i = 4, return 15

console.log("a", a);

//arrow function
let sum1 = [1, 2, 3, 4, 5]
var a2 = sum1.reduce(
  ( tot, el ) => tot + el,
  0
)

console.log("A2", a2);

let initialValue = 0

let sum3 = [{x: 1}, {x: 2}, {x: 3}]
sum3.reduce(function (tot, el) {
    return tot + el.x
}, initialValue)

console.log(sum3) // 6


//그룹핑
let people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (el, obj) {
    let key = obj[property]
    if (!el[key]) {
      el[key] = []
    }
    el[key].push(obj)
    return el
  }, {})
}

let groupedPeople = groupBy(people, 'age')

console.log("groupedPeople", groupedPeople);


let Rectangle = class {
  constructor(height,width) {
    //super(props);
    this.height = height;
    this.width = width;
    
  }
}

let Rectangle2 = new Rectangle(100,200);
console.log(Rectangle2.height)


class TrieNode {
  constructor(value = "") {
    this.value = value;
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(string) {
    let currentNode = this.root;
    for (const char of string) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char
          , new TrieNode(currentNode.value + char)
        );
      }
      currentNode = currentNode.children.get(char);
    }
  }
}
