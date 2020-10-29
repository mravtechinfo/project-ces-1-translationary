let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey='be95d14b-5f84-42e9-95e7-9fc753306107';
let notFound= document.querySelector('.notfound');
let defBox=document.querySelector('.def');
let loading = document.querySelector('.loading');
input.addEventListener("keyup", function(event) {
   

if (event.keyCode === 13) {
    let word = input.value;
    notFound.innerText='';
defBox.innerText='';
    if(word===''&&event.keyCode === 13){
    
        alert('please enter the word');
        
    return;
    }
    event.preventDefault();
      getData(word);
    }
   
  });
searchBtn.addEventListener('click',function(e)
{
e.preventDefault();

//clearing data
notFound.innerText='';
defBox.innerText='';

//get input data
let word = input.value;

if(word===''){
    notFound.innerText='';
defBox.innerText='';
    alert('please enter the word');
    
return;
}
getData(word);

});

async function getData(word) {
    loading.style.display='block';
//call api

const response=await fetch(`https://dictionaryapi.com/api/v3/references/
spanish/json/${word}?key=${apiKey}`);
const data=await response.json();
//empty result
console.log(data);
if(!data.length){
    loading.style.display='none';
    notFound.innerText='no result';
    return;
}
//if result is suggestion
if(typeof data[0]==='string')  {
    loading.style.display='none';
    let heading =document.createElement('h3');
    heading.innerText='did you mean ?'
    notFound.appendChild(heading);
    data.forEach(element => {
   let suggestion=document.createElement('span');
   suggestion.classList.add('suggested');
   suggestion.innerText=element;
   notFound.appendChild(suggestion);
  
  
    })
    return;

}
//resultfound
loading.style.display='none';
let defination= data[0].shortdef[0];
defBox.innerText = defination;

}