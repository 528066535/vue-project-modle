"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function component() {
    var element = document.createElement('div');
    console.log(1);
    return element;
}
Promise.resolve().then(function () { return require(/* webpackChunkName: "a" */ './a'); }).then(function (component) {
    console.log(component);
});
document.body.appendChild(component());
