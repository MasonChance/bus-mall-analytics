'use strict';

// constructor function [X]
  //1. name of product [X]
  //2. file path of image [X] 

// TODO: [X] function randomly generates 3 unique product images 

// TODO: [] attach event listener to ul in bottom section of HTML

// TODO: [] when user clicks a product generate 3 new images. (event listener tied to this triggers)

//TODO: [X] push new objects to an array [];
  

  //TODO: [] create property of constructor that tracks all products being considered
  //  1. [] after voting is completed remove listener
  //  2. [] display list of all products followed by votes recieved and number of times shown
  // 

  //===== Constructor Function and Array to store Constructed Objects===///
var productList = [];  //works

function SurveyItems(product, imageUrl){
  this.product = product;  //works
  this.imageUrl = imageUrl; // works 

  this.views;
  productList.push(this); // works
}

//TODO: Consider weather this is necesary as a global function or if it can be tied to the object. instinct is leave it global and only have methods directly related to tracking be tied to the object itself. 

// SurveyItems.prototype.getClicks(){
  
// };




// SurveyItems.prototype.onSelect(){
  
// };
  
    
    
//==== Call this in the prototype Function. ===//
function showRandom(){ 
  var randomDisplay = Math.floor(Math.random() * productList.length);
  // console.log('showRandom: ' + randomDisplay);
  var getItem = productList[randomDisplay];
  return getItem;   
} // works
    
function renderToPage(){
  //Target an Element
  var targetDisplayParent = document.getElementById('choices'); 
  for(var i = 0; i <= 2; i++){
    var newDisplayContent = showRandom();
    var newDisplayEl = document.createElement('img');
    newDisplayEl.src = newDisplayContent.imageUrl;
    targetDisplayParent.appendChild(newDisplayEl)[i];
    console.log('newDisplayContent: ', newDisplayContent);
    console.log('newDisplayEl: ' + newDisplayEl);

  }    
}
    
  //=== Tests ===//
  new SurveyItems('Bag','images/bag.jpg');
  new SurveyItems('Bannana', 'images/banana.jpg');
  new SurveyItems('Tauntaun', 'images/tauntaun.jpg');
  new SurveyItems('Cthulhu', 'images/cthulhu.jpg');
 renderToPage();
  
  
