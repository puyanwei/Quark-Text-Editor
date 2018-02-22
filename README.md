# Quark Text Editor

This is our text editor desktop app for coding.

The aim of this project was to experience and learn the processes of building a desktop app from scratch.

![Alt Text](https://github.com/puyanwei/Quark-Text-editor/blob/master/assets/demo.gif)

This was a 2 week final project by [abitravers89](https://github.com/abitravers1989), [david-div](https://www.github.com/david-div),
[FreddieCodes](https://github.com/freddiecodes) and
[puyanwei](https://github.com/puyanwei) from 9th-20th October. Note I have done extra work, so commits will be mine after that period.

### User Stories for the Minimum Viable Product

When we started the project we didn't really know where to start. So we looked into what Atom was built with and discovered Electron. At that point we decided at Electron would be a good tech to use and learn. Once we got to grips with Electron and setup the environment, we decided upon a MVP User Story as our first goal.

```
As a user of Quark Editor,
I would like to be able to open the programme.

As a user of Quark Editor,
I would like to be able to add some text.
```

### User Stories Features

Once we reached our MVP, we had to decide on the extra features that we wanted to add. We thought about what would be useful for the user and prioritised those features.

```
As a user of Quark Editor,
I would like to write text and have it automatically formatted into code live.

As a user of Quark Editor,
I would like to be able to save my code on my local machine.

As a user of Quark Editor,
I would like to be able to load my files and have its coding language be automatically recognised and formatted appropriately.

As a user of Quark Editor,
I would like to be able to edit my saved files.

As a user of Quark Editor,
I would like to be able to delete my saved files.

As a user of Quark Editor,
I would like to see character, word and line counts shown updated live as I type.

As a user of Quark Editor,
I would like to see my root folders be displayed in a tree format when pressing a button.
```

## Tech Stack

* Electron
* Spectron
* Node JS
* Chromium (The open source version of Chrome)
* HTML
* CSS
* Bootstrap
* Prism JS

## Installation

```
git clone git@github.com:puyanwei/Quark-Text-editor.git
npm install
cd Quark-Text-editor
npm run package-mac
cd release-builds/Quark-darwin-x64/
open Quark.app
```

For testing go to the root folder

```
npm test
```

## Features

* Opens the app using the icon.
* Text can be written and saved with a coding extension name.
* Syntax updates on the fly once coding language is specified after saving.
* The library tree button shows the current directory and its files.
* The toolbar shows the name of the current file edited, if it has been loaded or saved.
* The footer shows the character, word and line count live as you type.
* Ability to copy and paste, and use keyboard shortcuts.

## How Does Electron Work?

In the most simplest terms, Electron helps you design and program your app as if it is a website, and then converts it in the end.

Electron uses two processes, the Main process and the Renderer process. The Main process is the controller, and the Renderer renders everything to the page. Each instance of Renderer represents a single page, and they all all contained within the Main process.

## Setting Up

![file tree](https://user-images.githubusercontent.com/14803518/36535030-35c355f4-17c0-11e8-908c-fb1f1eff0e6c.png)

We were quite unsure about the most common way to structure our files but in the end we settled with this.

Note that our two processes are in the root, main.js and renderer.js. We also have our index.html, in which we load renderer.js and the javascript files in the src folder, which are all the features of our app. This is exactly the same as creating a single page app.

## Main.js

![screen shot 2018-02-22 at 11 00 27](https://user-images.githubusercontent.com/14803518/36535012-27ba6006-17c0-11e8-880a-32065b9ada36.png)

In our Main.js, we tell our application to load up a new BrowserWindow every time we open it. In the mainWindow.loadURL give it the location of our webpage, in this case our index.html.

Then finally, we tell our app to properly quit on exiting, so that it can start afresh when we reopen it again.

## Renderer.js

![renderer](https://user-images.githubusercontent.com/14803518/36535029-35ad4e6c-17c0-11e8-8928-1bb80675a7de.png)

Our renderer file was mainly used to apply the CRUD features of our app. CRUD is an acronym for Create, Read, Update, Delete - and these are the core functionalities of any application, including the very first computers. In order to create these CRUD functionalities, we used Node.js' in built module called 'fs' aka 'File System'.

ipc.on are event listeners which listen out for the clicking of the menu choices, and then applies the appropriate CRUD functionality wanted.

Since we had only one window, we had only one renderer file. We are not really sure if when creating multiple pages you create multiple renderer files, and if so it seems questionable as to if they would be in the root if that was true.

## Quality Control

We challenged ourselves to maintain a high quality standard of coding practices, as well as Agile methodologies during this project.

* Attempt at good testing coverage.
* Small commits and good descriptions.
* Never working off master branch, always using pull requests.
* Good planning and organisation throughout, using our [Trello](https://trello.com/b/mFZ3IP8U/build-our-own-program-from-scratch) board.
* Stand ups in the mornings, retrospectives in the evenings, XP values.
