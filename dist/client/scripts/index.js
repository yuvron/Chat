var app=function(t){var i={};function n(e){if(i[e])return i[e].exports;var o=i[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}return n.m=t,n.c=i,n.p="",n(0)}([function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});const i=t(1),n=document.querySelector(".chat"),r=document.getElementById("new-message");i.CookiesManager.getCookie("token")||(window.location.href="/signin"),r.addEventListener("submit",e=>{e.preventDefault()}),n.scrollTop=n.scrollHeight},function(e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.CookiesManager=void 0;class t{static addCookie(e,o){document.cookie=e+"="+o}static getCookie(o){const e=document.cookie.split(";");var t=e.find(e=>e.trim().split(";")[0]===o);return t?{name:t[0],value:t[1]}:void 0}static deleteCookie(e){document.cookie=e+"=a;expires=Thu, 01 Jan 1970 00:00:00 GMT"}static deleteAllCookies(){const e=document.cookie.split(";");e.forEach(e=>{e=(e=e.trim()).split("=")[0];t.deleteCookie(e)})}}o.CookiesManager=t}]);