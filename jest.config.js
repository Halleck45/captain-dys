const config = {
    testEnvironment: "jsdom",
    verbose: true,
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    }
};

module.exports = config;