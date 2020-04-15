'use strict';

  //===== Constructor Function and Array to store Constructed Objects===///
SurveyItems.productList = [];  //TODO: works but needs assignment to SurveyItemsConstructor.
  
function SurveyItems(product, imageUrl){
  this.product = product;  //works // used as object element(Id);
  this.imageUrl = imageUrl; // works 
  this.views = 0;
  this.clicks = 0;
  
  
  SurveyItems.productList.push(this); // works
}
  
//==== Call this in the prototype Function??? ===//
function showRandom(){ 
  var randomDisplay = Math.floor(Math.random() * SurveyItems.productList.length);
  var getItem = SurveyItems.productList[randomDisplay];

  return getItem;   
} 

// CallBack Function Below//
var totalClicks = 1;
function census(e){
  var itemId = e.target.id;
  for(var i = 0; i < SurveyItems.productList.length; i++){
    var name = SurveyItems.productList[i];``
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
    showResults();

  }
} 

//=== ?? was there a way to make this a method??  || is it suposed to stand alone.  ===//
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
//=== Tests ===  GlobalFunction Calls not called in otherPlaces. //
new SurveyItems('Bag','images/bag.jpg');
new SurveyItems('Bannana', 'images/banana.jpg');
new SurveyItems('Tauntaun', 'images/tauntaun.jpg');
new SurveyItems('Cthulhu', 'images/cthulhu.jpg');

renderToPage();
var targetArea = document.getElementById('choices');
targetArea.addEventListener('click', census);
   
//========= Chart below ======//
// change labels to items (by name) of product array. 
function showResults(){
  var ctx = document.getElementById('analytics').getContext('2d');
  var nameArray = [];
  var clickedCount = [];
  var viewCount = [];
  // function labelSet(){
    for(var i = 0; i < SurveyItems.productList.length; i++){
      var itemSelection = SurveyItems.productList[i];
      nameArray.push(itemSelection.product);
      clickedCount.push(itemSelection.clicks);
      // veiwCount.push(itemSelection.views);
    }

  var clicksNviews = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: nameArray,
        datasets: [{
            label: 'Times Clicked',
            data: clickedCount,
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

}