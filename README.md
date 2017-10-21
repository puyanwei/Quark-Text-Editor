# PDAF-Text-editor

This is our text editor desktop app for coding.

The aim of this projects was to experience and learn the processes of building a desktop app from scratch.

![Alt Text](https://github.com/puyanwei/Quark-Text-editor/blob/master/assets/demo.gif)

This was a 2 week final project by [abitravers89](https://github.com/abitravers1989), [david-div](https://www.github.com/david-div),
[FreddieCodes](https://github.com/freddiecodes) and
[puyanwei](https://github.com/puyanwei)

User Stories for the Minimum Viable Product

```
As a user of Quark Editor,
I would like to be able to open the programme.

As a user of Quark Editor,
I would like to be able to add some text.
```

User Stories Features

````
As a user of Quark Editor,
I would like to write text and have it automatically formatted into code live.

As a user of Quark Editor,
I would like to be able to save my code on my local machine.

As a user of Quark Editor,
I would like to be able to load my files and have its coding language be automatically recognized and formatted appropriately.

As a user of Quark Editor,
I would like to be able to edit my saved files.

As a user of Quark Editor,
I would like to be able to delete my saved files.

As a user of Quark Editor,
I would like to see character, word and line counts shown updated live as I type.

As a user of Quark Editor,
I would like to see my root folders be displayed when pressing a button.

`````

## Tech Stack
- Electron
- Spectron
- Node JS
- Chromium
- HTML
- CSS
- Bootstrap
- Prism JS

## Installation
Clone this repository by typing in `git clone git@github.com:FreddieCodes/PDAF-Text-editor.git`

Go to the root folder of the project and `npm install` to install all the relevant dependancies.

Create the app by typing the following: `npm run package-mac`

The app will then be located in: release-builds/Quark-darwin-x64/

Double click the Quark Editor Icon in the root folder to open.

For testing type in `npm test` in the root folder.

## Features
- Opens the app using the icon.
- Text can be written and saved with a coding extension name.
- Syntax updates on the fly once coding language is specified after saving.
- The library tree button shows the current directory and its files.
- The toolbar shows the name of the current file edited, if it has been loaded or saved.
- The footer shows the character, word and line count live as you type.
- Ability to copy and paste, and use keyboard shortcuts.

## Quality Control

We challenged ourselves to maintain a high quality standard of coding practices, as well as Agile methodologies during this project.
- All feature and unit tests passing, good coverage.
- Consistent variable naming and linting.
- Small commits and good descriptions.
- Never working off master branch, always using pull requests.
- Good planning and organisation throughout, using our [Trello](https://trello.com/b/mFZ3IP8U/build-our-own-program-from-scratch) board.
- Stand ups in the mornings, retrospectives in the evenings, XP values.
