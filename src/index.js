import Vue from 'vue'


function component() {
    var element = document.createElement('div');

    console.log(1);
    return element;
}

import(/* webpackChunkName: "a" */'./a').then(component => {
    console.log(component);
});

document.body.appendChild(component());