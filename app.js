'use strict';

  //===== Constructor Function and Array to store Constructed Objects===///
var lastItemsSeen = [];

SurveyItems.productList = [];  
  
function SurveyItems(product, imageUrl, views=0, clicks=0){
  this.product = product; // used as object element(Id);
  this.imageUrl = imageUrl;
  this.views = views;
  this.clicks = clicks;
   
  SurveyItems.productList.push(this); 
}
  
// this populates the spread of choices for each instance the user is presented with choices.///

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

//gets 3 unique items compared to the last spread shown for each consecutive spread, 
/*credit to Tyler Berger for help with array reference and the following validator.*/
function findThreeUniq(){
  do{
    var threeArray = getRandomProducts();

  } while(!validateUnique(threeArray))

  lastItemsSeen = [...threeArray];
  return threeArray;
  
}

//==== validates items in display for the findThreeUniq function above it. ====
function validateUnique(threeArray){
  for(var i = 0; i < threeArray.length; i ++){
    for(var v = 0; v < lastItemsSeen.length; v++){
      if(threeArray[i].product === lastItemsSeen[v].product){
        
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
var totalClicks = 0;//GlobalVariable!!!

function census(e){
  var itemId = e.target.id;
  
  for(var i = 0; i < SurveyItems.productList.length; i++){
    var name = SurveyItems.productList[i];``
    if(name.product === itemId){
      name.clicks ++;
    }
  }
  var getTarget = document.getElementById('choices');

  if(totalClicks <= 25){
    totalClicks++
    getTarget.innerHTML = '';
    renderToPage();
  } else if(totalClicks > 25){
    getTarget.innerHTML = '';
    var thanks = document.createElement('h1');
    thanks.textContent = 'Here are your results! The line points indicate how many times you clicked on an item; The bar Indicates how many times an item was shown to you. If you have any questions please feel free to contact us at the email listed below.';
    getTarget.appendChild(thanks);
    var testGroupResult = JSON.stringify(SurveyItems.productList);
    localStorage.setItem('productList',testGroupResult);
    targetArea.removeEventListener('click', census);
    trackResults();
    
  }
  retrieveAddStore();

} 

//renders the current selection of products returned from the `findThreeUniq()` function. 
function renderToPage(){
  var targetDisplayParent = document.getElementById('choices'); 
  var newDisplayContent = findThreeUniq();
  
  for(var i = 0; i <= 2; i++){
    var newDisplayEl = document.createElement('img');
    var newLi = document.createElement('li');
    newDisplayEl.src = newDisplayContent[i].imageUrl;
    newDisplayEl.id = newDisplayContent[i].product;
    newLi.appendChild(newDisplayEl);
    newDisplayContent[i].views ++;
    targetDisplayParent.appendChild(newLi);
  
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
new SurveyItems('Dog-Duck', 'images/dog-duck.jpg');
new SurveyItems('Dragon', 'images/dragon.jpg');
new SurveyItems('Pen', 'images/pen.jpg');
new SurveyItems('Pet-sweep','images/pet-sweep.jpg');
new SurveyItems('Scissors', 'images/scissors.jpg');
new SurveyItems('Shark', 'images/shark.jpg');
new SurveyItems('Sweep', 'images/sweep.png');
new SurveyItems('Unicorn', 'images/unicorn.jpg');
new SurveyItems('Usb', 'images/usb.gif');
new SurveyItems('Water-Can', 'images/water-can.jpg');
new SurveyItems('Wine-Glass', 'images/wine-glass.jpg');

renderToPage();

// listener for the `census()` funtion above. 
var targetArea = document.getElementById('choices');
targetArea.addEventListener('click', census);

// ==== TOTAL CLICK STORING FUNCTION====//
//==== extract base value from local, add to current, store result in local. 
function retrieveAddStore(){
  var updateStoredResults = [];
  // values retrieved from storage. 
  var lastGroupResults = JSON.parse(localStorage.getItem('productList'));
  for(var i = 0; i < lastGroupResults.length; i++){
    // values from current group results. 
    var currentResults = SurveyItems.productList;
    // sums clicks and veiws from last and current.
    var updateClickResult = (currentResults[i].clicks) + (lastGroupResults[i].clicks);
    var updateViewsResult = (currentResults[i].views) + (lastGroupResults[i].views);
    // re-instantiation of object for storage, static variables to pass in. 
    var name = currentResults[i].product;
    var img = currentResults[i].imageUrl;
    updateStoredResults.push(
      new SurveyItems(name, img, updateViewsResult, updateClickResult)
    );
    
  }
  localStorage.setItem('productList', updateStoredResults);
  
}
 
//========= Chart below ======//
 
function trackResults(){
  var ctx = document.getElementById('analytics').getContext('2d');
  var nameArray = [];
  var clickedCount = [];
  var viewCount = [];
  // function labelSet(){
    for(var i = 0; i < SurveyItems.productList.length; i++){
      var itemSelection = SurveyItems.productList[i];
      nameArray.push(itemSelection.product);
      clickedCount.push(itemSelection.clicks);
      viewCount.push(itemSelection.views);
    }

  new Chart(ctx, {
    type: 'bar',
    data: {
        labels: nameArray,
        datasets: [{
            label: 'Times Viewed',
            data: viewCount,
            backgroundColor: [
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 255, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 255, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 255, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 255, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 255, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 255, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 255, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 255, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 255, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 255, 0.5)'
            ],
            borderColor: [
              'rgba(255, 206, 86, 0.2)',
              'rgba(20, 192, 255, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(20, 255, 255, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(20, 255, 255, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(20, 255, 255, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(20, 255, 255, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(20, 255, 255, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(20, 255, 255, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(20, 255, 255, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(20, 255, 255, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(20, 255, 255, 0.2)'
                
            ],
            borderWidth: 1
            },{
            
              type: 'line',
              label: 'Times Clicked',
              data: clickedCount,
              backgroundColor: [
                'rgb(0, 216, 255)'
              ],
              borderColor: [
                'rgb(0, 216, 255'
              ],
              pointBackgroundColor:[
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)',
                'rgb(229, 0, 255)'
              
              ],
              fill: false
              
              
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