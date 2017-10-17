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

  xit("should save text our editor into a file", function(){
    return this.app.client
      .waitUntilWindowLoaded()
      // .leftClick('#savebutton')
      // // save filename

      // .leftClick('#loadbutton')
      // // load the filename you have saved after
      // .getText('#editor')
      // // check that the text in editor still match
      // .then(text => expect(text).to.eq('This is a test.'))
  });



});
