interface Dropdown<T> {
  value: T;
  title: string;
}

interface DetailDropdown<K> extends Dropdown<K>{
  description: string;
  tag: K;
}

var detailedItem: DetailDropdown<number> = {
  title: 'abc',
  description: 'ab',
  value: 0,
  tag:0
}

// function printLable(labeledObj: { label: string }) {
//   console.log(labeledObj.label)
// }

// let myObj = { size: 10, label: 'size 10 object' }
// printLable(myObj)

//interface

interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label)
}

let myObj = { size: 10, label: 'size 10' }
printLabel(myObj)

interface squareConfing {
  color?: string;
  width?: number;
}

function createSquare(config: squareConfing): {color: string, area: number } {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }

  if (config.width) {
    newSquare.area = config.width * config.width;
  }

  return newSquare;
}


let mySpace = createSquare({ color: 'black' })

//readOnly

interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 }

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;


//Function types
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString)
  return result > -1
}

let mySearch2: SearchFunc
mySearch2 = function (src: string, sub: string): boolean {
  let result = src.search(sub)
  return result > -1;
}

//indexable types

interface StringArray {
  [index: number]: string;
}

let myArray: StringArray
myArray = ['bob', 'fred']

let myStr: string = myArray[0]