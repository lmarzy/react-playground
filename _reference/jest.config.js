module.exports = {
  setupFiles: ['<rootDir>config/tests/setuptests.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/tests/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
