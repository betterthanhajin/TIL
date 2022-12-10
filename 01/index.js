
// function getDate(){
//     var tableData;
//     $.get('url', function(response) {
//         tableData = response;
//     });

//     return tableData;
// }

// console.log("get", getData());

//call back 
// function getData2(callbackFunc){
//     $.get('url', function(response){
//         callbackFunc(response);
//     });
// }

// getData2(function(tableData) {
//     console.log(tableData);
// });


// promise api
// function getData3(callbakc) {
//     return new Promise(function(resolve, reject) {
//         $.get('url', function(response){
//             resolve(response);
//         });
//     });
// }

// getData3().then(function(tableData){
//     console.log(tableData);
// });


// console.log("promise", 
// new Promise(function(resolve,reject){
//     var data = [1,2,3];
//     resolve(data);
// }).then(function(data){
//     console.log("***",data);
// }));