import Vue from 'vue';

const fse = require("fs-extra");

Vue.prototype.$jsonData = JSON.parse(fse.readFileSync("assets/TaskDataFormat.json"));
// export const jsonData = JSON.parse(fse.readFileSync("assets/TaskDataFormat.json"));