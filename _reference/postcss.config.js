const Autoprefixer = require('autoprefixer');
const PostCssVr = require('postcss-vr');
const PostCssFocus = require('postcss-focus');
const PostCssPxToRem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    Autoprefixer({ browsers: ['last 2 versions'] }),
    PostCssVr,
    PostCssFocus,
    PostCssPxToRem({ propList: ['*'] }),
  ],
};
