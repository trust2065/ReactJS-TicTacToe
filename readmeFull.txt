ref: 
https://www.valentinog.com/blog/webpack-4-tutorial/

npm init -y
npm i webpack webpack-cli --save-dev
npm i babel-core babel-loader babel-preset-env --save-dev
npm i react react-dom babel-preset-react --save-dev
npm i html-webpack-plugin html-loader --save-dev
npm i webpack-dev-server --save-dev
>>
npm i webpack webpack-cli babel-core babel-loader babel-preset-env react react-dom babel-preset-react html-webpack-plugin html-loader webpack-dev-server webpack-dev-server

package.json 
"scripts": {
  "dev": "webpack -d",
  "build": "webpack -p",
  "devChangeFile": "webpack --mode development ./foo/src/js/index.js --output ./foo/main.js",
  "buildChangeFile": "webpack --mode production ./foo/src/js/index.js --output ./foo/main.js",
  "start": "webpack-dev-server --mode development --open",
}

.babelrc 
{
  "presets": ["env", "react"]
}

webpack.config.js
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};

定義Component
./src/App.js
import React from "react";
import ReactDOM from "react-dom";
const App = () => {
  return (
    <div>
      <p>React here!</p>
    </div>
  );
};
export default App;

引入Component，render到index.html
./src/index.js
import React from 'react'
import { render } from 'react-dom'
import App from "./App";
render(<App/>, document.getElementById('app'))

就只是個容器
./src/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>webpack 4 quickstart</title>
</head>
<body>
    <div id="app">
    </div>
</body>
</html>

npm run start






附上版本 package.json
{
	...
  "devDependencies": {
    "webpack": "^4.1.0",
    "webpack-cli": "^2.0.10",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.4",
    "babel-preset-env": "^1.6.1",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "babel-preset-react": "^6.24.1",
    "html-webpack-plugin": "^3.0.5",
    "html-loader": "^0.5.5",
    "webpack-dev-server": "^3.1.0"
  }
}
