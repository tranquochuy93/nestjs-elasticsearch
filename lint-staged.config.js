const { filter } = require('lodash')
const micromatch = require('micromatch')

module.exports = {
  'src/**/*.ts': (files) => {
    const nonTestFiles = micromatch.not(files, '*spec.ts', { matchBase: true })
    const match = nonTestFiles.filter(file => file.indexOf('src/migration') < 0)
    const matches = match.join(' ')
    const allFiles = files.join(' ')
    return [`eslint --fix --max-warnings 0 ${matches}`, `prettier --write ${allFiles}`]
  },
  '*.{md,json}': 'prettier --write'
}
