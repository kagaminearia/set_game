# Project Overview
The project is an online card game called set.

In the game, certain combinations of three cards are said to make up a set. For each one of the four categories of features — color, number, shape, and shading — the three cards must display that feature as a) either all the same, or b) all different. Put another way: For each feature the three cards must avoid having two cards showing one version of the feature and the remaining card showing a different version.

For example, 3 solid red diamonds, 2 solid green squiggles, and 1 solid purple oval form a set, because the shadings of the three cards are all the same, while the numbers, the colors, and the shapes among the three cards are all different.

For any "set", the number of features that are all the same and the number of features that are all different may break down as 0 the same + 4 different; or 1 the same + 3 different; or 2 the same + 2 different; or 3 the same + 1 different. (It cannot break down as 4 features the same + 0 different as the cards would be identical, and there are no identical cards in the Set deck.)


# Before playing: Instructions on Installation and Launch

__Installation__

dependencies to install

node: https://nodejs.org/en/

install react-icons
```
npm install react-icons
```

install mongodb
```
npm install mongodb
```
install other necessary dependencies
```
npm install
```

__Launch__

open the terminal in server and client (right click on corresponding folder -> open integrated terminal)

in client terminal, run 
```
npm run build
```
after client builds, in the server terminal, run
```
npm run start
```
then navigate to ‘http://localhost:3000/’ in browser of your choice.


# Playing the Game

__Start Page__

Click 'Play Now' to play the game

__Playing__

Now finding valid set and clear the cards. When you clean all the cards, your performance will be shown.
Different actions (find correct or wrong set, get hints) will affect your scores in different way. 

Use 'Setting' button to change the playing mode.

While playing, you can draw 3 more cards one time, get hints, and reset the game by clicking corresponding buttons on the top of the page.

After playing, you can save your name and see your ranking and performance in the 'Leaderboard'.

When you need more details and information about playing the game, click the 'Help' button on the left-top. 


# Reference
Wikipedia: [Set Card Game](https://en.wikipedia.org/wiki/Set_(card_game))


## Things about Getting Started with React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available ScriptsIn the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
