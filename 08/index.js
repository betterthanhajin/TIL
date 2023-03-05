var a = 1;
function outer() {
  console.log(a);

  function inner() {
    console.log(a);
    var a = 3;
  }

  inner();

  console.log(a);
}

outer();
console.log(a);


var a = {
  b: function () {
    console.log(this);
  }
}

a.b();

function a(x, y, z) {
  console.log(this, x, y, z);
}

var b = {
  bb: 'bbb'
};

a.call(b, 1, 2, 3);
a.apply(b, [1, 2, 3]);

var c = a.bind(b);
c(1, 2, 3);

var d = a.bind(b, 1, 2);
d(3);


//closure
const btn = document.querySelector('button')

btn.addEventListener('click',handleClick())

function handleCilck(){
  let count = 0
  return function (){
    count++
    return count
  }
}
