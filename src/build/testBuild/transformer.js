const babel = require('babel-core');
const tsc = require('typescript');
const babelConfig = require('./.babelrc.test.js')
const tsConfig = require('../../../tsconfig.json');

module.exports = {
  process(src, path) {
    if (path.endsWith(".ts")) {
      const srcTransformedByTS = tsc.transpile(src, tsConfig.compilerOptions, path, [])
      return babel.transform(srcTransformedByTS, babelConfig).code
    } else {
      console.log("Unknown file extension received for transforming.")
    }
    return src
  }
}
