//variables declared here to clean up later fetch calls

const BASE_URL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="
const FORMAT_URL = "&format=json&nojsoncallback=1&per_page=10&page="


//global variables that keeps track of the page number and search value
let pageCounter = 1;
let searchValue;

//receives the search submission event, assigns searchValue to the target value, then calls on fetchImgs to get the first 10 images and send them to renderPhotos
function getPhotos(event){
  searchValue = event.target.value
  fetchImgs()
}

function fetchImgs(){
  if (searchValue.length > 0) {
    fetch(`${BASE_URL}${API_KEY}&tags=${searchValue}${FORMAT_URL}${pageCounter}`)
    .then(res => res.json())
    .then(json => {
      renderPhotos(json.photos.photo)
    })
  }
}

//receives an image list to render with correct URL formatting, creates an array of divs holding images, and attaches them to the photos div
function renderPhotos(photos){

  let photoList = `${photos.map(photo => '<div class="photo-thumb"><img onClick="openImgModal(event)" src=' + 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg>' + '</img></div>')}`

  photoList = photoList.replace(/,/g, "")

  document.getElementById('photos').innerHTML = photoList
}

//receives boolean on button click, then either adds or subtracts 1 from the global page counter. Next, calls fetchImgs to get the next 10 results and re render.
function nextTenResults(value){
  if (value) {
    ++pageCounter
  } else if (pageCounter > 1) {
    --pageCounter
  } else {
    pageCounter
  }
  fetchImgs()
}

//receives click event on image, shows modal, and uses the image as the src for the <img>
function openImgModal(event){
  let modal = document.getElementById("modal")
  let modalImg = document.getElementById("modal-img")
  modalImg.src = event.target.src
  modal.style.display = "block";
}

//receives click event on Close button, then hides the modal
function closeImgModal(){
  document.getElementById("modal").style.display = "none";
}

function goToTop(){
  document.documentElement.scrollTop = 0;
}

// if (typeof module !== 'undefined' && module.exports !== null) {
//   exports.renderPhotos = renderPhotos;
//   exports.closeImgModal = closeImgModal;
// }
