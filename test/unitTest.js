var assert = require("assert");
var menu = require("../mainMenuTemplate")
var expect = require("chai").expect;

describe('Main', function (){

  context('#menu', function(){

    it('has a menu/label named File', function (){
      let result = menu[1].label
      expect(result).to.eq('File')
    });

    it('has toggle DevTools button', function(){
      let result = menu[2].label
      expect(result).to.eq('Developer tools')
    });

  });
});
