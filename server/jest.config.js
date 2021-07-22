module.exports = {
    "roots": [
      "<rootDir>"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  }
  
process.on('unhandledRejection', (reason, promise) => {
  console.error(reason);
  process.exit(1);
});