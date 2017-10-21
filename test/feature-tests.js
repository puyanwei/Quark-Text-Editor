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

  it("loads a window", function() {
    return this.app.client.getWindowCount().then(function(count) {
      expect(count).to.eq(1);
    });
  });

  it("the title shows 'Quark Text Editor'", function() {
    return this.app.client
      .waitUntilWindowLoaded()
      .getTitle()
      .then(text => expect(text).to.eq("Quark Text Editor"));
  });

  it("should enter and show text", function() {
    return this.app.client
      .waitUntilWindowLoaded()
      .leftClick("#editor")
      .keys("Text editor")
      .getText("#editor")
      .then(text => expect(text).to.eq("Text editor"));
  });

  // it("should load text from the file into our window", function(){
  //   return this.app.client
  //     .waitUntilWindowLoaded()
  //     .leftClick('#load-button')
  //     .getText('#editor')
  //     .then(text => expect(text).to.eq('This is a test.'))
  // })

  //  it ("should add line numbers to the text", function(){
  //    return this.app.client
  //     .waitUntilWindowLoaded()
  //     .leftClick('#editor')
  //     .keys('function()')
  //     .leftClick("#syntax-button")
  //     .getText('#editor')
  //     .then(text => expect(text).to.eq())
  //  });

  // it("should save text our editor into a file", function(){
  //   return this.app.client
  //     .waitUntilWindowLoaded()
  // .leftClick('#savebutton')
  // // save filename

  // .leftClick('#loadbutton')
  // // load the filename you have saved after
  // .getText('#editor')
  // // check that the text in editor still match
  // .then(text => expect(text).to.eq('This is a test.'))
  // });
});
