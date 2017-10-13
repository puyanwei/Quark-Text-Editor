var assert = require("assert");
var menu = require("../mainMenuTemplate");
var expect = require("chai").expect;

describe("Menu", function() {
  context("#File", function() {
    it('has a label named "File" in the menu', function() {
      const result = menu[1].label;
      expect(result).to.eq("File");
    });

    it("has toggle DevTools button", function() {
      const result = menu[menu.length - 1].label;
      expect(result).to.eq("Developer tools");
    });
  });

  context("#Edit", function() {
    it('has a label named "Edit" in the menu', function() {
      const result = menu[2].label;
      expect(result).to.eq("Edit");
    });

    it("has a Cut option", function() {
      const result = menu[2].submenu[0].label;
      expect(result).to.eq("Cut");
    });

    it("has a Copy option", function() {
      const result = menu[2].submenu[1].label;
      expect(result).to.eq("Copy");
    });

    it("has a Paste", function() {
      const result = menu[2].submenu[2].label;
      expect(result).to.eq("Paste");
    });
  });
});
