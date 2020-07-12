"use strict"

function getData(method,url){
  return new Promise(function(resolve,reject){
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(method,url);
    xmlHttpRequest.onload = function(){
      if(this.status >=200 && this.status <300){
        resolve(xmlHttpRequest.response);
      }
      else{
        reject({
          status : this.status,
          statusText : xmlHttpRequest.statusText
        });
      }
    };

    xmlHttpRequest.onerror = function(){
      reject({
        status : this.status,
        statusText : xmlHttpRequest.statusText
      });
    };

    xmlHttpRequest.send();
  });
}

getData('GET','https://jsonplaceholder.typicode.com/posts').then(function(data){
  let dataFromApi = JSON.parse(data);
  let output = '';

  for(let parser of dataFromApi){
    output +=`
    <li>
      <h3>UserId : ${parser.userId} , Id : ${parser.id}</h3>
      <h4>Title : ${parser.title} </h4>
      <p>${parser.body}</p>
    `;
  }

  document.getElementById('template').innerHTML=output;
}).catch(function(error){
  console.log(error);
});

