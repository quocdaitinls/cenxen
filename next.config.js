// /** @type {import('next').NextConfig} */

// const withTM = require("next-transpile-modules")([
//   "@mui/material",
//   "@mui/system",
// ]); // pass the modules you would like to see transpiled

// module.exports = withTM({
//   reactStrictMode: true,
//   distDir: "build",
//   experimental: {
//     // ssr and displayName are configured by default
//     styledComponents: true,
//   },
//   webpack: (config) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       "@mui/styled-engine": "@mui/styled-engine-sc",
//     };
//     return config;
//   },
// });

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};
