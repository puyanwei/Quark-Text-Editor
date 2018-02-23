# Makers Academy Final Project - Quark Text Editor

This is our text editor desktop app for coding.

The aim of this project was to experience and learn the processes of building a desktop app from scratch.

![Alt Text](https://github.com/puyanwei/Quark-Text-editor/blob/master/assets/demo.gif)

This was a 2 week final project by [Abi Travers](https://github.com/abitravers1989), [David Divilly](https://www.github.com/david-div),
[Freddy Ofori](https://github.com/freddiecodes) and
[Puyan Wei](https://github.com/puyanwei) from 9th-20th October. Note I have done extra work, so commits will be mine after that period.

### Quick Start Installation

```
git clone git@github.com:puyanwei/Quark-Text-editor.git
cd Quark-Text-editor
npm install
npm run package-mac
cd release-builds/Quark-darwin-x64/
open Quark.app
```

For testing go to the root folder

```
npm test
```

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

### Tech Stack

* Electron
* Spectron
* Node JS
* Chromium (The open source version of Chrome)
* HTML
* CSS
* Bootstrap
* Prism JS

### Features

* Opens the app using the icon.
* Text can be written and saved with a coding extension name.
* Syntax updates on the fly once coding language is specified after saving.
* The library tree button shows the current directory and its files.
* The toolbar shows the name of the current file edited, if it has been loaded or saved.
* The footer shows the character, word and line count live as you type.
* Ability to copy and paste, and use keyboard shortcuts.

### How Does Electron Work?

In the most simplest terms, Electron helps you design and program your app as if it is a website, and then converts it in the end.

Electron uses two processes, the Main process and the Renderer process. The Main process is the controller, and the Renderer renders everything to the page. Each instance of Renderer represents a single page, and they all all contained within the Main process.

### Setting Up

![file tree](https://user-images.githubusercontent.com/14803518/36535030-35c355f4-17c0-11e8-908c-fb1f1eff0e6c.png)

We were quite unsure about the most common way to structure our files but in the end we settled with this.

Note that our two processes are in the root, main.js and renderer.js. We also have our index.html, in which we load renderer.js and the javascript files in the src folder, which are all the features of our app. This is exactly the same as creating a single page app.

### Main.js

![screen shot 2018-02-22 at 11 00 27](https://user-images.githubusercontent.com/14803518/36535012-27ba6006-17c0-11e8-880a-32065b9ada36.png)

In our Main.js, we tell our application to load up a new BrowserWindow every time we open it. In the mainWindow.loadURL give it the location of our webpage, in this case our index.html.

Then finally, we tell our app to properly quit on exiting, so that it can start afresh when we reopen it again.

### Renderer.js

![renderer](https://user-images.githubusercontent.com/14803518/36535029-35ad4e6c-17c0-11e8-8928-1bb80675a7de.png)

Our renderer file was mainly used to apply the CRUD features of our app. CRUD is an acronym for Create, Read, Update, Delete - and these are the core functionalities of any application, including the very first computers. In order to create these CRUD functionalities, we used Node.js' in built module called 'fs' aka 'File System'.

ipc.on are event listeners which listen out for the clicking of the menu choices, and then applies the appropriate CRUD functionality wanted.

Since we had only one window, we had only one renderer file. We are not really sure if when creating multiple pages you create multiple renderer files, and if so it seems questionable as to if they would be in the root if that was true.

### Applying Our Features

Our first User Story MVP was to open the app and write in some text. When researching how to do this on a webpage, we had difficulty working out how we could do this for the whole page. We managed to find a 'contentEditable' attribute that we could add to tags, and so we added that to the body tag of our page.

![screen shot 2018-02-22 at 11 37 14](https://user-images.githubusercontent.com/14803518/36536410-cab7cea2-17c4-11e8-98e8-a15ac8353105.png)

An example of implementing our file tree feature is exactly as how you would do it if you wanted to do it in a webpage.

![tree](https://user-images.githubusercontent.com/14803518/36536233-1d02016a-17c4-11e8-8b60-12747c6947d4.png)

Firstly, we would load up this file in our index.html file with a script tag.

In order to implement this feature we used Node.js' in built module 'fs'. We looked at our root folder, and applied the contents to a list using a loop, and then output that into our tree tag on the page. This would be linked to an event listener that looked out for a click on our tree-dir element.

### The Cursed Cursor Blocker

One of the biggest challenges in this project was a problem with our automatic highlight syntaxing feature. We used an external library prism.js to help us apply the syntax rearrangement based on the type of language being used.

However, when we ran this function based on the keypress within our textbox, it was always resetting the cursor to the top left, therefore making us write backwards only!

![cursed cursor](https://user-images.githubusercontent.com/14803518/36536911-7f126aa0-17c6-11e8-8898-2f654bbfa86f.gif)

This was one of the biggest downsides of deciding to use an external library, instead of writing our own. We found it difficult to understand what it was doing, and where in their code it was resetting the cursor. We found that prism.js was not used for apply syntax highlighting on the fly.

The problem was solved by writing code that kept track of the position of our cursor and then putting it back to where it was after applying the prism.js highlighting.

This blocker lasted probably 9 days of our 14 days in our project. Once this was solved, our cursor just looks like it is acting normally, and there is no evidence at first sight of how much work and stress came about because of it!

### Testing

Learning how to test an Electron app was another challenge. It was difficult for us to learn the correct syntax using Spectron and get our test to see the elements on the DOM. We also had to to make sure our tests ran asynchronously, which meant using promises and using a callback function structure to the code.

Another big blocker was knowing how to test our features if they were on the renderer, as the renderer acts as a layer on the DOM when outputting to the page. This meant that most of our features ended up on Main.js in order to be testable, which is likely to be incorrect. But we felt that testing was important to us, so we decided that this was the direction to go, and then possibly refactor later on if we had time.

Spectron tests our app as if it is a user, by opening it and running a feature.

![testing](https://user-images.githubusercontent.com/14803518/36536912-7f276900-17c6-11e8-996d-2df372f42b18.gif)

### Quality Control

We challenged ourselves to maintain a high quality standard of coding practices, as well as Agile methodologies during this project.

* Attempt at good testing coverage.
* Small commits and good descriptions.
* Never working off master branch, always using pull requests.
* Good planning and organisation throughout, using our [Trello](https://trello.com/b/mFZ3IP8U/build-our-own-program-from-scratch) board.
* Stand ups in the mornings, retrospectives in the evenings, XP values.

### Future Improvements

There are a lot of elements that could be improved upon that we would have liked to implement if we had more time.

* **Test coverage** - In the end, we were unable to fully test all our features. The main ones we couldn't test were our CRUD functionality. We just could not work out how Spectron was able to write in our save file box or click buttons when they came up.
* **Main or Renderer** - Despite completing our user stories, our understanding of how Electron works was still quite limited. There is some confusion as to what was meant to be in the Renderer, and what was meant to be in Main, especially when we wanted to fully test it.
* **Refactoring** - We are aware that our code is not as readable or as scalable as it could be. It was difficult in playing with the code as it would break, and therefore we ended up with some global variables to get our app to work. We wanted to refactor and make our code more object orientated, but it was hard to do this working off the code provided in the documentation of Electron.
* **Adding more features** - Originally we had an ambitious feature which was to create the ability to live pair with someone remotely. However, we did not have enough time. Looking at the way Electron is set up though, means that it has an incredible amount of potential to scale it up in an agile fashion. One could build off this adding small features here and there, and then end up with a big application that can do many things!

Overall, it was an amazing experience to not only work with my group, but also gave me a great insight into what working in a dev team would be like. And at the end of the day it was an incredible achievement to build a Text Editor from scratch with no prior knowledge in 2 weeks!
