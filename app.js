'use strict';

// constructor function [X]
  //1. name of product [X]
  //2. file path of image [X] 

// TODO: [] function randomly generates 3 unique product images 

// TODO: [] attach event listener to ul in bottom section of HTML

// TODO: [] when user clicks a product generate 3 new images. 

//TODO: [x] push new objects to an array [];
  

  //TODO: [] create property of constructor that tracks all products being considered
  //  1. [] after voting is completed remove listener
  //  2. [] display list of all products followed by votes recieved and number of times shown
  // 

  //===== Constructor Function and Array to store Constructed Objects===///
  var productList = [];  //works

  function SurveyItems(product, imageUrl){
    this.product = product;  //works
    this.imageUrl = imageUrl; // works 
    


    productList.push(this); // works
  }



  // SurveyItems.prototype.showRandom = function(){

  // };

  // SurveyItems.prototype.getClicks(){

  // };

  // SurveyItems.prototype.onSelect(){

  // };

//=== Tests ===//
new SurveyItems('bag','bag.jpg');
new SurveyItems('')

console.log('Survey.product: ' + SurveyItems.name);
console.log('product List [0] ', productList[0]);