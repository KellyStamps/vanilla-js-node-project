let file = require('../index.js');
let adjustPageCounter = file.adjustPageCounter;
let removeComma = file.removeComma;
let formatPhotos = file.formatPhotos;
let assert = require("assert");
var searchValue = "123"

describe("removeComma", function(){
  it("should remove commas in strings", function(){
    let result = removeComma("hello, neighbor,,");
    assert.equal(result, "hello neighbor")
  })
})

describe("adjustPageCounter", function(){
  it("should increase pageCounter when value is true", function(){
    let pageCounter = 1;
    let result = adjustPageCounter(true);
    assert.equal(result, 2)
  })
})

describe("adjustPageCounter", function(){
  it("should decrease pageCounter when value is false", function(){
    let pageCounter = 2;
    let result = adjustPageCounter(false);
    assert.equal(result, 1)
  })
})

describe("adjustPageCounter", function(){
  it("should do nothing to pageCounter when value is absent", function(){
    let pageCounter = 1;
    let result = adjustPageCounter();
    assert.equal(result, 1)
  })
})

describe("formatPhotos", function(){
  it("should return the correct format", function(){
    let photos = [{farm: 1, server: 1, id: 1, secret: 1}]
    let result = formatPhotos(photos)
    assert.equal(result, `<div class="photo-thumb"><img onClick="openImgModal(event)" src=http://farm1.staticflickr.com/1/1_1.jpg></img></div>`)
  })
})

describe("formatPhotos", function(){
  it("should return the correct URL", function(){
    let photos = [{farm: 1, server: 1, id: 1, secret: 1}]
    let result = formatPhotos(photos)
    assert(result.indexOf("http://farm1.staticflickr.com/1/1_1.jpg") > 0)
  })
})

describe("formatPhotos", function(){
  it("should return a div with class photo-thumb", function(){
    let photos = [{farm: 1, server: 1, id: 1, secret: 1}]
    let result = formatPhotos(photos)
    assert(result.indexOf("photo-thumb") > 0)
  })
})

describe("formatPhotos", function(){
  it("should return an img with openModal click event", function(){
    let photos = [{farm: 1, server: 1, id: 1, secret: 1}]
    let result = formatPhotos(photos)
    assert(result.indexOf(`onClick="openImgModal(event)"`) > 0)
  })
})
