//global variables that keeps track of the page number and search value
let pageCounter = 1;
let searchValue;

//receives the input submit event, sets global searchValue to search term, then calls fetchImgs
function getPhotos(event){
  searchValue = event.target.value
  fetchImgs()
}

//fetches 10 images at a time, using variables from hidden.js
function fetchImgs(){
  if (searchValue.length > 0) {
    fetch(`${hidden.BASE_URL}${hidden.key}&tags=${searchValue}${hidden.FORMAT_URL}${pageCounter}`)
    .then(res => res.json())
    .then(json => {
      renderPhotos(json.photos.photo)
    })
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
