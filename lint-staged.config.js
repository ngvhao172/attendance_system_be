module.exports = {
  "*.{js,jsx,ts,tsx}": ["npm run lint:fix"],
  "**/*.ts?(x)": () => "npm run check-types",
};
