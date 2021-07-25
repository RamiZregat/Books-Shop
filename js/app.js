'use strict'

let GlobalArray=[];
let Total=0;

function Books(name,pages,price){
    this.name=name
    this.pages=pages
    this.price=price
    GlobalArray.push(this)
}
let form=document.getElementById('form')
form.addEventListener('submit',handlesubmit)


function randomPages(max,min){
    return Math.floor(Math.random()*(max-min+1)+min)
}

let TableParent=document.getElementById('rendering')

function TableHeader(){
    let Row=document.createElement('tr')
    TableParent.appendChild(Row)

    let displayNameHeader=document.createElement('th')
    Row.appendChild(displayNameHeader)
    displayNameHeader.textContent="Book Name"

    let displayPagesHeader=document.createElement('th')
    Row.appendChild(displayPagesHeader)
    displayPagesHeader.textContent="Book Pages"

    let displayPriceHeader=document.createElement('th')
    Row.appendChild(displayPriceHeader)
    displayPriceHeader.textContent="Book Price"
}

Books.prototype.renderPrototype=function(){
    let Row=document.createElement('tr')
    TableParent.appendChild(Row)

    let displayNameData=document.createElement('td')
    Row.appendChild(displayNameData)
    displayNameData.textContent=this.name

    let displayPagesData=document.createElement('td')
    Row.appendChild(displayPagesData)
    displayPagesData.textContent=this.pages

    let displayPriceData=document.createElement('td')
    Row.appendChild(displayPriceData)
    displayPriceData.textContent=this.price
}

function renderFunction(){
    for (let i = 0; i < GlobalArray.length; i++) {
        let Row=document.createElement('tr')
        TableParent.appendChild(Row)
    
        let displayNameData=document.createElement('td')
        Row.appendChild(displayNameData)
        displayNameData.textContent=GlobalArray[i].name
    
        let displayPagesData=document.createElement('td')
        Row.appendChild(displayPagesData)
        displayPagesData.textContent=GlobalArray[i].pages
    
        let displayPriceData=document.createElement('td')
        Row.appendChild(displayPriceData)
        displayPriceData.textContent=GlobalArray[i].price
    }
}

function saveData(){
    localStorage.setItem('Books',JSON.stringify(GlobalArray))
}

function getData(){
    let ConvertedData=JSON.parse(localStorage.getItem('Books'))
    if(ConvertedData!==null){
        GlobalArray=ConvertedData;
        renderFunction();
        TotalPages()
    }
}

function TotalPages(){
    for (let i = 0; i < GlobalArray.length; i++) {
        Total=Total+GlobalArray[i].pages
    }
    let TotalContainer=document.getElementById('TotalContainer')
    let renderTotal=document.createElement('div')
    renderTotal.setAttribute('id','Total')
    TotalContainer.appendChild(renderTotal);
    renderTotal.textContent=`Total : ${Total}`
}



function handlesubmit(event){
    event.preventDefault();
    let newName=event.target.BookName.value;
    let newPages=randomPages(500,1);
    let newPrice=event.target.BookPrice.value;

    let newBook= new Books(newName,newPages,newPrice)
    newBook.renderPrototype();
    saveData();
    location.reload();

}


let clearbtn=document.getElementById('ClearBooks')
clearbtn.addEventListener('click',handleClearBtn)

function handleClearBtn(){
    localStorage.clear();
    location.reload();
}

TableHeader()
getData()