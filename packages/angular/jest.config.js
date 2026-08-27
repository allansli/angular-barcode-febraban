/** @type {import("jest").Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.spec.json" }]
  },
  moduleNameMapper: {
    "^@allansli/barcode-febraban-core$": "<rootDir>/../core/src/index.js"
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"]
};
