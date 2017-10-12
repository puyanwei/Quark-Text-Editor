var assert = require("assert");
var menu = require("../mainMenuTemplate");
var expect = require("chai").expect;

describe("Main", function() {
  context("#menu", function() {
    it('has a label named "File" in the file menu', function() {
      let result = menu[1].label;
      expect(result).to.eq("File");
    });

    it('has a label named "Save" in the file menu', function (){
      let result = menu[1].submenu[0].label1;
      expect(result).to.eq('Save File')
    });

    it('has a label named "Quit" in the file menu', function (){
      let result = menu[1].submenu[1].label2;
      expect(result).to.eq('Quit')
    });

    it("has toggle DevTools button", function() {
      let result = menu[2].label;
      expect(result).to.eq("Developer tools");
     });
  });
});
