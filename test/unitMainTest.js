var assert = require("assert");
var mainMenuTemplate = require("../mainMenuTemplate.js")
// require 'webdriver'?

describe('App', function (){

  it('has a menu/ label named file', function (){
    console.log(mainMenuTemplate)
    let result = mainMenuTemplate[0].label
     assert.equal(result, 'File')
  });
});
