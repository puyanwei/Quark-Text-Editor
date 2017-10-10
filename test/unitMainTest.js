var assert = require("assert");
var menu = require("../mainMenuTemplate")
// require 'webdriver'?

describe('Main', function (){

  context('#menu', function(){

    it('has a menu/label named File', function (){
      let result = menu[1].label
      assert.equal(result, 'File')
    });
  });
});
