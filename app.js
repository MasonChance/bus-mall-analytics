'use strict';


// TODO: [] attach event listener to <ul Id="choices">

// TODO: [] when user clicks a product generate 3 new images. (event listener tied to this triggers)

  
  // TODO: 1. [] after voting is completed remove listener
  // TODO: 2. [] display list of all products followed by votes recieved and number of times shown
  // 

  //===== Constructor Function and Array to store Constructed Objects===///
var productList = [];  //TODO: works but needs assignment to SurveyItemsConstructor.

function SurveyItems(product, imageUrl){
  this.product = product;  //works // used as object element(Id);
  this.imageUrl = imageUrl; // works 
  this.views = 0;
  this.clicks = 0;
  

  productList.push(this); // works
}

//TODO: Consider weather this is necesary as a global function or if it can be tied to the object. instinct is leave it global and only have methods directly related to tracking be tied to the object itself. 


  
    
    
//==== Call this in the prototype Function. ===//
function showRandom(){ 
  var randomDisplay = Math.floor(Math.random() * productList.length);
  // console.log('showRandom: ' + randomDisplay);
  var getItem = productList[randomDisplay];
  return getItem;   
} // works


var totalClicks = 1;
function census(e){
  var itemId = e.target.id;
  for(var i = 0; i < productList.length; i++){
    var name = productList[i];``
    if(name.product === itemId){
      name.clicks ++;
    }
  }
  var getTarget = document.getElementById('choices');
  if(totalClicks <= 4){
    totalClicks++
    getTarget.innerHTML = '';
    renderToPage();
  } else if(totalClicks > 4){
    getTarget.innerHTML = '';
    var thanks = document.createElement('h1');
    thanks.textContent = 'Thank you for your feedback';
    getTarget.appendChild(thanks);

  }
} 

function renderToPage(){
  var targetDisplayParent = document.getElementById('choices'); 
  for(var i = 0; i <= 2; i++){
    var newDisplayContent = showRandom();
    var newDisplayEl = document.createElement('img');
    var newLi = document.createElement('li');
    newDisplayEl.src = newDisplayContent.imageUrl;
    newDisplayEl.id = newDisplayContent.product;
    newLi.appendChild(newDisplayEl);
    newDisplayContent.views ++;
    targetDisplayParent.appendChild(newLi);
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
var targetArea = document.getElementById('choices');
targetArea.addEventListener('click', census);
  
//TODO: CHART CAN BE IMPLEMENTED AND RENDERED INDEPENDENT OF WEATHER OR NOT THE DATA ITSELF IS REFLECTED ON THE CHART. 
//
  
//========= Chart below ======//

var ctx = document.getElementById('analytics').getContext('2d');



var clicksNviews = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});