//This is what we need to include for mocha to run its tests
const electron = require("electron");
var expect = require("chai").expect;

var Application = require("spectron").Application;
var assert = require("assert");

describe("application launch", function() {
  this.timeout(10000);

  beforeEach(function() {
    this.app = new Application({
      path: `${__dirname}/../node_modules/.bin/electron`,
      args: ["main.js"]
    });
    return this.app.start();
  });

  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("a window opens", function() {
    return this.app.client.getWindowCount().then(function(count) {
      assert.equal(count, 1);
    });
  });

  it("title says Text Editor", function() {
    return this.app.client
      .waitUntilWindowLoaded()
      .getTitle()
      .then(text => expect(text).to.eq("Text Editor"));
  });

  it("should enter and show text", function(){
    return this.app.client
      .waitUntilWindowLoaded()
      .leftClick('#editor')
      .keys('Text editor, yeaaah')
      .getText('#editor')
      .then(text => expect(text).to.eq('Text editor, yeaaah'))
      // .then(function(text){
      //   expect(text).to.eq('Text editor, yeaaah')
      // })
  });

  it("saves text into a file with the save as a new file button", function(){
      return this.app.client
      .waitUntilWindowLoaded()
      .leftClick('#editor')
      .keys('Hopefully this text will save to a new file')
      .leftClick('#create-new-file')
      .keys('savefileas')
      .then(function(file){
        console.log(file)
        expect(file).to.eq('savefileas')
      })

  })
});

//click, then press enter and then add text
// document.getElementByTagName('div')[0].innerHTML = string
