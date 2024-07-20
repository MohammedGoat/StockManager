let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let mood='create';
let tmp;





if(localStorage.length > 0){
    document.getElementById('deleteall').classList.remove("hide");
    }
function calctotal(){
    if(price.value != ''){
        let result=(+price.value + +taxes.value + +ads.value ) 
        - +discount.value;
        total.innerHTML=result;
        total.style.background='white';
    }
    else{
        total.innerHTML='';
        total.style.background='rgb(94, 187, 187)'; 
    }
}
//create
let products;
if(localStorage.product != null){
    products=JSON.parse(localStorage.product)
}else{
    products=[];
}

create.onclick=function creating(){
    let newproduct={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
   if(title.value!='' && price.value!= '' && count.value<200){
    if(mood==='create'){
        if(newproduct.count>1){
            for(let i=0;i<newproduct.count;i++){
            products.push(newproduct);
            }
        }else{
            products.push(newproduct);}
       }else{
        products[tmp]=newproduct;
        count.classList.remove("hide");
        create.innerHTML='Create';
        mood='create';
    }
    localStorage.setItem('product',JSON.stringify(products));
    read();
    calctotal();
    clear();
   }
    if(localStorage.length > 0){
        document.getElementById('deleteall').classList.remove("hide");
        }
        
}
//clear
function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
}
//read
function read(){
let reading ='';
for(let i=0;i<products.length;i++){
    reading += `
    <tr>
     <td>${i + 1}</td>
     <td>${products[i].title}</td>
     <td>${products[i].price}</td>
     <td>${products[i].taxes}</td>
     <td>${products[i].ads}</td>
     <td>${products[i].discount}</td>
     <td>${products[i].total}</td>
     <td>${products[i].category}</td>
     <td><button id="update" onclick="updateone(${i})">Update</button></td>
     <td><button id="delete" onclick="deleteone(${i})">Delete</button></td>
   </tr>
 `
}
document.getElementById('tbody').innerHTML = reading ;
}
read();
//delete
function deleteone(i){

products.splice(i,1);
localStorage.product = JSON.stringify(products);
read();
if(products.length==0){
    document.getElementById('deleteall').classList.add("hide");
}
}
function deleteall(){
    localStorage.clear();
    products.splice(0,products.length);
    read();
    document.getElementById('deleteall').classList.add("hide");
}
//update
 function updateone(i){
title.value = products[i].title;
price.value = products[i].price;
taxes.value = products[i].taxes;
ads.value = products[i].ads;
discount.value = products[i].discount;
category.value = products[i].category;
calctotal();
mood='update';
count.classList.add("hide");
create.innerHTML='Update';
tmp=i;
scroll({
    top: 0,
    behavior: 'smooth'
})
}
let searchmood='title'
function getsearch(id){
    let search=document.getElementById('search');
if(id=='searchtitle'){
    searchmood='title';
    search.placeholder='Search by Title'
}else{
    searchmood='category';
    search.placeholder='Search by Category';
}
search.focus();
search.value='';
read();
}
function searchdata(value){
    let reading='';
if(searchmood=='title'){
for(let i=0;i<products.length;i++){
  if(products[i].title.toLowerCase().includes(value.toLowerCase())){

    reading += `
    <tr>
     <td>${i + 1}</td>
     <td>${products[i].title}</td>
     <td>${products[i].price}</td>
     <td>${products[i].taxes}</td>
     <td>${products[i].ads}</td>
     <td>${products[i].discount}</td>
     <td>${products[i].total}</td>
     <td>${products[i].category}</td>
     <td><button id="update" onclick="updateone(${i})">Update</button></td>
     <td><button id="delete" onclick="deleteone(${i})">Delete</button></td>
    </tr>
     `
  }
    
}


}
else{
    for(let i=0;i<products.length;i++){
        if(products[i].category.toLowerCase().includes(value.toLowerCase())){
      
          reading += `
          <tr>
           <td>${i + 1}</td>
           <td>${products[i].title}</td>
           <td>${products[i].price}</td>
           <td>${products[i].taxes}</td>
           <td>${products[i].ads}</td>
           <td>${products[i].discount}</td>
           <td>${products[i].total}</td>
           <td>${products[i].category}</td>
           <td><button id="update" onclick="updateone(${i})">Update</button></td>
           <td><button id="delete" onclick="deleteone(${i})">Delete</button></td>
          </tr>
           `
        }
          
      }




}

document.getElementById('tbody').innerHTML = reading ;
}





