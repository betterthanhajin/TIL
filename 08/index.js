//object literal

let me = {
  name: '',
  intro: function (name) {
    console.log(`name is ${ name }`);
  }
};
me.intro('hajiny');
console.log("me", me);
console.log(typeof me);

let myInfo = {
  name: 'hajin',
  age: 33,
  job: 'developer',
  hobby:'music'
};

myInfo.today = new Date();

//delete myInfo.age;

console.log("myInfo", myInfo);

Object.keys(myInfo).entries(
  console.log("key" , myInfo)
);

Object.keys(myInfo).forEach((key,i,el) => {
  console.log("Info", key,i,el[i])
});

Object.values(myInfo).forEach((el) => {
  console.log("value", el);
});
