import Vue from 'vue';

const requireComponent = require.context(
  '@/components', true, /\.vue$/,
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  Vue.component(componentConfig.default.name, componentConfig.default || componentConfig);
});
