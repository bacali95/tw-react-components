module.exports = (config) => {
  config.external = [/node_modules/s];
  config.output.preserveModules = true;
  config.output.preserveModulesRoot = 'libs/tw-react-components/src';
  return config;
};
