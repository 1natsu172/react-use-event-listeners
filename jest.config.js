module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      // diagnostics: true
      // diagnostics: false
      diagnostics: {
        warnOnly: true
      }
    }
  }
}
