// var assert = require("assert");
// var menu = require("../main").mainMenuTemplate
// var expect = require("chai").expect;
//
// describe("Menu", function() {
//   context("#File", function() {
//     it('has a label named "File" in the menu', function() {
//       const result = menu[1].label;
//       expect(result).to.eq("File");
//     });
//
//     it("has toggle DevTools button", function() {
//       const result = menu[menu.length - 1].label;
//       expect(result).to.eq("Developer tools");
//     });
//   });
//
//   context("#Edit", function() {
//     let submenu = menu[2].submenu;
//
//     it('has a label named "Edit" in the menu', function() {
//       const menuResult = menu[2].label;
//       expect(menuResult).to.eq("Edit");
//     });
//
//     it("has a Cut option", function() {
//       const hash = { label: "Cut", accelerator: "Command+X", selector: "cut:" };
//       expect(submenu).to.deep.include(hash);
//     });
//
//     it("has a Copy option", function() {
//       const hash = {
//         label: "Copy",
//         accelerator: "Command+C",
//         selector: "copy:"
//       };
//       expect(submenu).to.deep.include(hash);
//     });
//
//     it("has a Paste option", function() {
//       const hash = {
//         label: "Paste",
//         accelerator: "Command+V",
//         selector: "paste:"
//       };
//       expect(submenu).to.deep.include(hash);
//     });
//
//     it("has a Undo option", function() {
//       const hash = {
//         label: "Undo",
//         accelerator: "Command+Z",
//         selector: "undo:"
//       };
//       expect(submenu).to.deep.include(hash);
//     });
//
//     it("has a Redo option", function() {
//       const hash = {
//         label: "Redo",
//         accelerator: "Command+Y",
//         selector: "redo:"
//       };
//       expect(submenu).to.deep.include(hash);
//     });
//   });
// });
