var assert = require("assert");
var mainMenuTemplate = require("../mainMenuTemplate.js")
// require 'webdriver'?

describe('App', function (){

  it('has a menu/ label named file', function (){
    // console.log(mainMenuTemplate)
    console.log(mainMenuTemplate[1])
    let result = mainMenuTemplate[0].label
    console.log(result)
     assert.equal(result, 'File')
  });
  // it('has a menu/ label named file', function (){
  //   links = $$('mainMenu');
  //
  //   links.forEach(function (link){
  //     link.click;
  //   })
  // })
});
