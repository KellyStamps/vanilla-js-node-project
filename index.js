//global variables that keeps track of the page number and search value
let pageCounter = 1;
let searchValue;

//receives the input submit event, sets global searchValue to search term, resets pageCounter to 1, then calls fetchImgs
function getPhotos(event){
  searchValue = event.target.value;
  pageCounter = 1;
  showPagination()
  fetchImgs()
}

//helper function to hide and show pagination buttons
function showPagination(){
  let prev = document.getElementById("prev")
  let next = document.getElementById("next")
  if(pageCounter === 1) {
    next.classList.remove("hidden");
    next.classList.add("show");
    prev.classList.remove("show");
    prev.classList.add("hidden");
  } else if (pageCounter > 1) {
    next.classList.remove("hidden");
    next.classList.add("show");
    prev.classList.remove("hidden");
    prev.classList.add("show");
  }
}

//fetches 10 images at a time, using variables from hidden.js
function fetchImgs(){
  if (validInput()) {
    fetch(`${hidden.BASE_URL}${hidden.key}&tags=${searchValue}${hidden.FORMAT_URL}${pageCounter}`)
    .then(res => res.json())
    .then(json => {
      renderPhotos(json.photos.photo)
    })
  } else {
    alert("Please enter a valid search term")
  }
}

//helper function to determine if input is blank
function validInput(){
  if(searchValue.length > 0){
    return true;
  } else {
    return false;
  }
}

//receives an image list to render with correct URL formatting, then attaches result to photos div
function renderPhotos(photos){
  let photoList = formatPhotos(photos)
  let list = removeComma(photoList)
  document.getElementById('photos').innerHTML = list
}

//helper function to return correct flickr URL
function formatPhotos(photos){
  return `${photos.map(photo => '<div class="photo-thumb"><img onClick="openImgModal(event)" src=' + 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg>' + '</img></div>')}`
}

//helper function to remove commas from the image list
function removeComma(list){
  return list.replace(/,/g, "")
}

//first adjusts pageCounter, then calls fetchImgs to get the next 10 results and re render
function nextTenResults(value){
  adjustPageCounter(value)
  showPagination()
  fetchImgs()
}

//receives boolean from page number click, then makes any needed changes to pageCounter
function adjustPageCounter(value){
  if (value) {
    ++pageCounter
  } else if (pageCounter > 1) {
    --pageCounter
  } else {
    pageCounter
  }
  return pageCounter
}

//shows modal on click of image and sets the image as the src
function openImgModal(event){
  let modal = document.getElementById("modal")
  let modalImg = document.getElementById("modal-img")
  modalImg.src = event.target.src
  modal.style.display = "block";
}

//hides modal on click of close button
function closeImgModal(){
  document.getElementById("modal").style.display = "none";
}

//returns user to top of document on click
function goToTop(){
  document.documentElement.scrollTop = 0;
}

//exports functions for test.js
exports.adjustPageCounter = adjustPageCounter
exports.removeComma = removeComma
exports.formatPhotos = formatPhotos
exports.validInput = validInput
