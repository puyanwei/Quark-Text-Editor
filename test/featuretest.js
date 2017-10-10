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

  it("finds the text on the page", function() {
  return this.app.client
    .waitUntilWindowLoaded()
    .waitForVisible("h2")
    .getText("h2")
    .then(text => expect(text).to.eq("HELLO WORLD"))
    .then(console.log("TESTING NOW"))
    .then(this.app.client.getHTML("p").then((info)=> console.log(info)))
    .then(this.app.client.getWindowCount().then((count)=> console.log(count)))
});

it("inputted text", function() {
  return this.app.client
    .waitUntilWindowLoaded()
    .waitForVisible("h2")
    .getText("h2")
    .then(text => expect(text).to.eq("HELLO WORLD"))
    .then(console.log("TESTING NOW"))
    .then(this.app.client.getText("p").then((info)=> console.log(info)))
    .then(this.app.client.getWindowCount().then((count)=> console.log(count)))
});
