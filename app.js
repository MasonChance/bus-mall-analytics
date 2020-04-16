'use strict';

  //===== Constructor Function and Array to store Constructed Objects===///
var lastItemsSeen = [];

SurveyItems.productList = [];  
  
function SurveyItems(product, imageUrl){
  this.product = product; // used as object element(Id);
  this.imageUrl = imageUrl;
  this.views = 0;
  this.clicks = 0;
   
  SurveyItems.productList.push(this); 
}
  
//==== Call this in the prototype Function??? ===//

function getRandomProducts(){
  var threeProducts = [];
  var secondOne = getOneProduct();
  threeProducts.push(getOneProduct());

  while(threeProducts[0] === secondOne || secondOne === lastItemsSeen[0] || secondOne === lastItemsSeen[1] || secondOne === lastItemsSeen[2]){
    secondOne = getOneProduct();
  }

  var thirdOne = getOneProduct();
  threeProducts.push(secondOne);

  while(threeProducts[1] === thirdOne || threeProducts[0] === thirdOne){
    thirdOne = getOneProduct();
  }
  threeProducts.push(thirdOne);

  return threeProducts;
}

//gets 3 unique items for instance of given spread, 
//credit to Tyler Berger for help with array reference and the following validator.
function findThreeUniq(){
  do{
    var threeArray = getRandomProducts();

  } while(!validateUnique(threeArray))
  console.log('My Feelings Are Valid!!!!');
  // lastItemsSeen = new Array(threeArray);
  lastItemsSeen = [...threeArray];
  return threeArray;
  
}

//==== validates items in display for the findThreeUniq function above it. ====
function validateUnique(threeArray){
  for(var i = 0; i < threeArray.length; i ++){
    for(var v = 0; v < lastItemsSeen.length; v++){
      if(threeArray[i].product === lastItemsSeen[v].product){
        console.log('check failed regenerate threeArray');
        return false;
        
        }
      }
    return true;
  }
}

//pulls random product from full list of products available stored in the: SurveyItems.productList[].
function getOneProduct(){ 
  var randomDisplay = Math.floor(Math.random() * SurveyItems.productList.length);
  var getItem = SurveyItems.productList[randomDisplay];

  return getItem;   
} 

// CallBack Function Below//
var totalClicks = 1;
function census(e){
  console.log('totalClicks: ' + totalClicks);
  var itemId = e.target.id;
  for(var i = 0; i < SurveyItems.productList.length; i++){
    var name = SurveyItems.productList[i];``
    if(name.product === itemId){
      name.clicks ++;
    }
  }
  var getTarget = document.getElementById('choices');
  if(totalClicks <= 4){//TODO: when finished, change count to 25. 
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

//renders the current selection of products returned from the `findThreeUniq()` function. 
function renderToPage(){
  var targetDisplayParent = document.getElementById('choices'); 
  var newDisplayContent = findThreeUniq();
  console.log('newDisplayContent: ', newDisplayContent);
  for(var i = 0; i <= 2; i++){
    var newDisplayEl = document.createElement('img');
    var newLi = document.createElement('li');
    newDisplayEl.src = newDisplayContent[i].imageUrl;
    newDisplayEl.id = newDisplayContent[i].product;
    newLi.appendChild(newDisplayEl);
    newDisplayContent[i].views ++;
    targetDisplayParent.appendChild(newLi);
    console.log('newDisplayContent: ', newDisplayContent[i]);
    console.log('newDisplayEl: ' + newDisplayEl);

  }    
}
//=== Tests ===  GlobalFunction Calls not called in otherPlaces. //
new SurveyItems('Bag','images/bag.jpg');
new SurveyItems('Bannana', 'images/banana.jpg');
new SurveyItems('Tauntaun', 'images/tauntaun.jpg');
new SurveyItems('Cthulhu', 'images/cthulhu.jpg');
new SurveyItems('Bathroom', 'images/bathroom.jpg');
new SurveyItems('Boots', 'images/boots.jpg');
new SurveyItems('Breakfast', 'images/breakfast.jpg');
new SurveyItems('Bubblegum', 'images/bubblegum.jpg');
new SurveyItems('Chair', 'images/chair.jpg');

renderToPage();

// listener for the `census()` funtion above. 
var targetArea = document.getElementById('choices');
targetArea.addEventListener('click', census);
   
//========= Chart below ======//
// change labels to items (by name) of product array. 
//TODO: Add DataSet for plotting Veiws as a lineGraph on the same chart. 

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

  new Chart(ctx, {
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
        responsive: true,                
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