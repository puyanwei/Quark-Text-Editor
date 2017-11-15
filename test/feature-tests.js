const electron = require('electron');
var expect = require('chai').expect;

var Application = require('spectron').Application;
var assert = require('assert');

describe('application launch', function() {
  this.timeout(10000);

  beforeEach(() => {
    this.app = new Application({
      path: `${__dirname}/../node_modules/.bin/electron`,
      args: ['main.js']
    });
    return this.app.start();
  });

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('loads a window', () => {
    return this.app.client
      .getWindowCount()
      .then(count => expect(count).to.eq(1));
  });

  it("the title shows 'Quark Text Editor'", () => {
    return this.app.client
      .waitUntilWindowLoaded()
      .getTitle()
      .then(text => expect(text).to.eq('Quark Text Editor'));
  });

  it('should enter and show text', () => {
    return this.app.client
      .waitUntilWindowLoaded()
      .leftClick('#editor')
      .keys('Text editor')
      .getText('#editor')
      .then(text => expect(text).to.eq('Text editor'));
  });

  it('should click the library tree and see the files in the project folder', () => {
    return this.app.client
      .waitUntilWindowLoaded()
      .leftClick('#tree-dir')
      .getText('#tree')
      .then(text => expect(text).to.include('main.js'));
  });

  it('should count the number of characters correctly', () => {
    return this.app.client
      .waitUntilWindowLoaded()
      .leftClick('#editor')
      .keys('the number of characters should be 37')
      .getText('#character-counter')
      .then(text => expect(text).to.eq('37'));
  });

  it('should count the number of words correctly', () => {
    return this.app.client
      .waitUntilWindowLoaded()
      .leftClick('#editor')
      .keys('the number of words \n should be 7')
      .getText('#word-counter')
      .then(text => expect(text).to.eq('7'));
  });
});
