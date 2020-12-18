/**
 * Create a basic component with common options
 */
import { defineComponent } from 'vue';
// import type { DefineComponent } from 'vue';
// import { camelize } from '../format/string';
var camelizeRE = /-(\w)/g;
export function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c.toUpperCase();
  });
}
export function padZero(num) {
  var targetLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var str = num + '';
  while (str.length < targetLength) {
    str = '0' + str;
  }
  return str;
}
export function createComponent(name) {
  return function (sfc) {
    sfc.name = name;
    sfc.install = function (app) {
      app.component(name, sfc);
      app.component(camelize('-'.concat(name)), sfc);
    };
    return defineComponent(sfc);
  };
}