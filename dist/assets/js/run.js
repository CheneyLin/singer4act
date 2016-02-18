/**
 * TinySort is a small script that sorts HTML elements. It sorts by text- or attribute value, or by that of one of it's children.
 * @summary A nodeElement sorting script.
 * @version 2.2.4
 * @license MIT/GPL
 * @author Ron Valstar <ron@ronvalstar.nl>
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 * @namespace tinysort
 */
!function(a,b){"use strict";function c(){return b}"function"==typeof define&&define.amd?define("tinysort",c):a.tinysort=b}(this,function(){"use strict";function a(a,d){function h(){0===arguments.length?q({}):b(arguments,function(a){q(z(a)?{selector:a}:a)}),n=G.length}function q(a){var b=!!a.selector,d=b&&":"===a.selector[0],e=c(a||{},p);G.push(c({hasSelector:b,hasAttr:!(e.attr===g||""===e.attr),hasData:e.data!==g,hasFilter:d,sortReturnNumber:"asc"===e.order?1:-1},e))}function r(){b(a,function(a,b){B?B!==a.parentNode&&(H=!1):B=a.parentNode;var c=G[0],d=c.hasFilter,e=c.selector,f=!e||d&&a.matchesSelector(e)||e&&a.querySelector(e),g=f?E:F,h={elm:a,pos:b,posn:g.length};D.push(h),g.push(h)}),A=E.slice(0)}function s(){E.sort(t)}function t(a,c){var d=0;for(0!==o&&(o=0);0===d&&n>o;){var g=G[o],h=g.ignoreDashes?l:k;if(b(m,function(a){var b=a.prepare;b&&b(g)}),g.sortFunction)d=g.sortFunction(a,c);else if("rand"==g.order)d=Math.random()<.5?1:-1;else{var i=f,p=y(a,g),q=y(c,g),r=""===p||p===e,s=""===q||q===e;if(p===q)d=0;else if(g.emptyEnd&&(r||s))d=r&&s?0:r?1:-1;else{if(!g.forceStrings){var t=z(p)?p&&p.match(h):f,u=z(q)?q&&q.match(h):f;if(t&&u){var v=p.substr(0,p.length-t[0].length),w=q.substr(0,q.length-u[0].length);v==w&&(i=!f,p=j(t[0]),q=j(u[0]))}}d=p===e||q===e?0:q>p?-1:p>q?1:0}}b(m,function(a){var b=a.sort;b&&(d=b(g,i,p,q,d))}),d*=g.sortReturnNumber,0===d&&o++}return 0===d&&(d=a.pos>c.pos?1:-1),d}function u(){var a=E.length===D.length;if(H&&a)I?E.forEach(function(a,b){a.elm.style.order=b}):B?B.appendChild(v()):console.warn("parentNode has been removed");else{var b=G[0],c=b.place,d="org"===c,e="start"===c,f="end"===c,g="first"===c,h="last"===c;if(d)E.forEach(w),E.forEach(function(a,b){x(A[b],a.elm)});else if(e||f){var i=A[e?0:A.length-1],j=i.elm.parentNode,k=e?j.firstChild:j.lastChild;k!==i.elm&&(i={elm:k}),w(i),f&&j.appendChild(i.ghost),x(i,v())}else if(g||h){var l=A[g?0:A.length-1];x(w(l),v())}}}function v(){return E.forEach(function(a){C.appendChild(a.elm)}),C}function w(a){var b=a.elm,c=i.createElement("div");return a.ghost=c,b.parentNode.insertBefore(c,b),a}function x(a,b){var c=a.ghost,d=c.parentNode;d.insertBefore(b,c),d.removeChild(c),delete a.ghost}function y(a,b){var c,d=a.elm;return b.selector&&(b.hasFilter?d.matchesSelector(b.selector)||(d=g):d=d.querySelector(b.selector)),b.hasAttr?c=d.getAttribute(b.attr):b.useVal?c=d.value||d.getAttribute("value"):b.hasData?c=d.getAttribute("data-"+b.data):d&&(c=d.textContent),z(c)&&(b.cases||(c=c.toLowerCase()),c=c.replace(/\s+/g," ")),c}function z(a){return"string"==typeof a}z(a)&&(a=i.querySelectorAll(a)),0===a.length&&console.warn("No elements to sort");var A,B,C=i.createDocumentFragment(),D=[],E=[],F=[],G=[],H=!0,I=a.length&&(d===e||d.useFlex!==!1)&&-1!==getComputedStyle(a[0].parentNode,null).display.indexOf("flex");return h.apply(g,Array.prototype.slice.call(arguments,1)),r(),s(),u(),E.map(function(a){return a.elm})}function b(a,b){for(var c,d=a.length,e=d;e--;)c=d-e-1,b(a[c],c)}function c(a,b,c){for(var d in b)(c||a[d]===e)&&(a[d]=b[d]);return a}function d(a,b,c){m.push({prepare:a,sort:b,sortBy:c})}var e,f=!1,g=null,h=window,i=h.document,j=parseFloat,k=/(-?\d+\.?\d*)\s*$/g,l=/(\d+\.?\d*)\s*$/g,m=[],n=0,o=0,p={selector:g,order:"asc",attr:g,data:g,useVal:f,place:"org",returns:f,cases:f,forceStrings:f,ignoreDashes:f,sortFunction:g,useFlex:f,emptyEnd:f};return h.Element&&function(a){a.matchesSelector=a.matchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.webkitMatchesSelector||function(a){for(var b=this,c=(b.parentNode||b.document).querySelectorAll(a),d=-1;c[++d]&&c[d]!=b;);return!!c[d]}}(Element.prototype),c(d,{loop:b}),c(a,{plugin:d,defaults:p})}());
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);

;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

(function () {

    var ua = window.navigator.userAgent.toLowerCase();
    var UA = {
        isQQBrowser: /qqbrowser/.test(ua),
        isWeixin: /micromessenger/.test(ua) || /weixin/.test(ua),
        isAndroid: /android/.test(ua),
        isIOS: /iphone/.test(ua) || /ipad/.test(ua) || /itouch/.test(ua) || /ipod/.test(ua),
        isFirefox: /firefox/.test(ua),
        isIpad: /ipad/.test(ua),
        isImgotv: /imgo/.test(ua)
    };

    window.UA = UA;

})();


(function () {

    var Utils = {

        setCookie: function (name, value, day) {
            var Days = day || 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = name + "="+ escape (value) + "; expires=" + exp.toGMTString();
        },

        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if( arr = document.cookie.match(reg) ) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        },

        clearCookie: function (){
            var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
            if (keys) {
                for (var i = keys.length; i--;)
                document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
            }
        },

        parseQuery: function(url) {
            var url = url ? url : location.search;
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    // 暂时没找到解决中文乱码的方法，先这么处理着 -.-||
                    try {
                        // 解决中文乱码
                        theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
                    } catch (e) {
                        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                    }
                }
            }
            return theRequest;
        },

        rnd: function (m, n) {
            return Math.floor((n - m) * Math.random() + m);
        },

        toParam: function(obj) {
            var result = [];
            for(var key in obj){
                result.push(key + '=' + obj[key]);
            }
            return result.join('&');
        },

        showToast: function (txt, callback) {
            $('.mg-toast').show();

            var p = $('.mg-toast p');
            p.removeClass('s h').html(txt).show();
            setTimeout(function () {
                p.addClass('s')
            }, 1);

            p.on('webkitTransitionEnd', function () {
                setTimeout(function () {
                    p.addClass('h');
                }, 1500);
            });

            setTimeout(function () {
                $('.mg-toast').hide();
                if ( typeof callback == 'function' ) callback();
            }, 3000);
        },

        /**
         * @desc 获取字节长度，中文算两个
         * @returns {Number}
         */
        getByteLength: function (s) {
            return (s + '').replace(/[^\x00-\xff]/g, "mm").length;
        },

        showLoading: function () {
            $('.mg-loading').show();
        },

        hideLoading: function () {
            $('.mg-loading').hide();
        },

        downloadApp: function () {
            var appUrl = {
                android: 'http://www.hunantv.com/v/m/v/2015/mandroid/',
                weixin: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hunantv.imgo.activity',
                ios: 'https://itunes.apple.com/cn/app/id629774477?pt=355474&ct=mgtv&mt=8'
            };

            if ( UA.isWeixin ) {
                window.location.href = appUrl.weixin;
            } else {
                window.location.href = UA.isIOS ? appUrl.ios : appUrl.android;
            }
        },

        checkAppVersion: function () {
            var ua = window.navigator.userAgent.toLowerCase();

            if (UA.isIOS) {
                var a = ua.split('imgotv-iphone/');
                var b = a[1].split('.');

                if (('' + b[0] + b[1] + b[2]) > 453) {
                    return true;
                }
            }

            if (UA.isAndroid) {
                var a = ua.split('imgotv-aphone/');
                var b = a[1].split('.');

                if (('' + b[0] + b[1] + b[2]) > 451) {
                    return true;
                }
            }

                    },
/*
wxReady,wxShare需要在index.html定义ShareData
var ShareData = {
    "type": "link",
    "imgUrl": "http://i5.hunantv.com/s1/2014/m/u/96/20161201022286836.jpg",
    "link": (location.href.split('#')[0]).replace(/h=1/g,'h=0'),
    "title": "我是歌手·互动",
    "desc": "我是歌手·互动",
    "title2": "我是歌手·互动"
};

*/
        wxReady: function () {
            wx.onMenuShareAppMessage({
                title: ShareData.title,
                desc: ShareData.desc,
                link: ShareData.link,
                imgUrl: ShareData.imgUrl,
                type: ShareData.type,
                success: function () {
                            //goAnalytics('','kpi_wxshare');
                }
                });
            wx.onMenuShareTimeline({
                title: ShareData.title2,
                link: ShareData.link,
                imgUrl: ShareData.imgUrl,
                type: ShareData.type,
                success: function () {
                            //goAnalytics('','kpi_wxshare');
                }
                });
        },

        wxShare: function () {

            var callurl=location.href.split('#')[0];
            callurl=escape(callurl);
            var u="http://v.api.hunantv.com/weixin/sign?url="+callurl+"&callback=?";

            $.getJSON(u,function(data){
                var dd=data.data;
                wx.config({
                    appId: dd.appId,
                    timestamp: dd.timestamp,
                    nonceStr: dd.nonceStr,
                    signature: dd.signature,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ]
                     });
                });
            wx.ready(function () {
                Utils.wxReady();
                });
        },

        parseUrl: function () {
            var ua = window.navigator.userAgent.toLowerCase();

            if ( ua.indexOf('imgo') != -1 ) {
                $('a').each(function (key, val) {
                    var href = $(val).attr('href');
                    if ( href.indexOf('hunantv.com') != -1 ) {
                        var ret = href.match(/\/\w{1}\/\d{1}\/\d{1,}\/\w{1}\/(.*)\.html/i);
                        if (!ret) return;
                        $(val).attr('href', 'imgotv://player?videoId=' + ret[1]);
                    }
                });
            }
        },

        jumpPage: function (url) {
            ImgotvApi.jumpPage({url: url});
        }

    };

    window.Utils = Utils;

})();


(function () {

    var Api = {

        url: 'http://singer.api.hunantv.com',

        get: function (url, data, succCallback) {
            $.ajax({
                url: url,
                data: data,
                dataType: 'jsonp',
                success: function (respData) {
                    console.log(url, respData);
                    if (respData.code == 200 || respData.err_code == 200 || respData.code == 400 || respData.code == 403 || respData.status == 'ok') {
                        succCallback(respData);
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    Utils.showToast('网络异常，请刷新重试！');
                    // _czc.push(﻿["_trackEvent", '接口错误', url]);
                },
                timeout: 5000
            });
        },

        get2: function (url, data, succCallback, errCallback) {
            $.ajax({
                url: url,
                data: data,
                dataType: 'jsonp',
                success: function (respData) {
                    console.log(url, respData);
                    if (typeof succCallback === 'function') succCallback(respData);
                }.bind(this),
                error: function (xhr, status, err) {
                    Utils.showToast('网络异常，请刷新重试！');
                    console.log(url);
                    //_czc.push(﻿["_trackEvent", '接口错误', url]);
                    if (typeof errCallback === 'function') errCallback();
                },
                timeout: 5000
            });
        },

        /**
         * 投票列表
         */
        getTermList: function (data, succCallback) {
            this.get(this.url + '/term/list', data, succCallback);
        },
        /**
         * 投票 term_id ticket uuid
         */
        getTermLike: function (data, succCallback) {
            this.get(this.url + '/term/like', data, succCallback);
        },

        /**
         * 投票2 term_id ticket uuid
         */
        getTermUnlike: function (data, succCallback) {
            this.get(this.url + '/term/unlike', data, succCallback);
        }

    };

    window.Api = Api;

})();


document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);

(function () {
    const COOKIE_TAG = 'singer4act_';
    const PROMPT_SUCCESS = '投票成功，谢谢你的参与';
    const PROMPT_REPEATE = '你已经投过啦，下次再来哈';

    var DEBUG = true;
    var APP_HALF=false;
    var APP_LOGIN_NEED=false;
    var PAGE_HEIGHT=$(window).height();
    var PAGE_TOP_OFFSET=0;

    var DEVICEINFO = '';
    var USERINFO = '';

    var TERMLIST = [];


    // var DEVICEINFO = {"appVersion":"4.5.2","channel":"mgtv","device":"MX4 Pro","mac":"i866002023160087","osType":"android","osVersion":"4.4.4","ticket":""};
    // var USERINFO = {"uid":5,"avatar":"http://wx.qlogo.cn/mmopen/PiajxSqBRaEJZ5UatEEsKT4fFo5jO5sE3tpooxS7zNAN8Qa4icwJibiaWegwLTu9vuBSLHiaqWxDrwUrgMWvL2Eu3lsmM3LFqBJHYibcMDxUWh4h8/132","ticket":"3427OF1VXBHIVYHZC101","isValidated":1,"vipExpiretime":"","isRenew":0,"birthday":"","gender":1,"vipInfo":{"vipDescImg":"http://attach.hunantv.com/i/20141124/i5472ca1e842f4.png","showVipIcon":1,"vipIcon":"http://attach.hunantv.com/i/20150413/i552b8d8e8b5da.png","notVipIcon":"","vipDescUrl":"http://mobile.api.hunantv.com/help/vip.html","showVipDesc":0},"nickname":"Jankerli21921","uuid":"5cb9b48723d78ab32b588a422e0f9c6c","isVip":0};

    var MG = {
        init: function () {

            if ( UA.isImgotv && !Utils.checkAppVersion() ) {
                window.location.href = 'http://www.hunantv.com/v/m/v/2015/mupdate/?from=wsgstg';
                return;
            }
            //微信调整

            var qs = Utils.parseQuery();
            if (qs) {
                APP_HALF = (qs.h==='1');
            }

            if (!APP_HALF){
            //非半屏下调整布局参数
                PAGE_TOP_OFFSET=$(window).width()/16*9;
                PAGE_HEIGHT -= PAGE_TOP_OFFSET;

                $('.app-nav ul li.quit').hide();
            }

            var _this = this;

            ImgotvApi.getDeviceInfo(function(data) {
                if ( data ) {
                    DEVICEINFO = JSON.parse(data);
                }
            });

            ImgotvApi.getUserInfo(function(data) {
                if ( data ) {
                    USERINFO = JSON.parse(data);
                    //alert(USERINFO.uuid);
                    //alert(USERINFO.ticket);
                    // _this.isBandPhone();
                    //_this.getStarDetail();
                }
            });

            this.getTermList();
            this.bindEvents();
        },
        goAlert:function(t){
            var _this = this;
            clearTimeout(_this.alertTimeout);
            $('.mg-toast p').html(t);
            $('.mg-toast').fadeIn();
            _this.alertTimeout=setTimeout("$('.mg-toast').fadeOut();",2000);
        },
        goCheckLogin:function(){
            var _this = this;
            if (!USERINFO) {
                if ( APP_HALF ) {
                    ImgotvApi.login(function(data) {
                        window.location.reload();
                    });
                }else {
                    _this.goAlert('请先登录芒果TV客户端');
                }
                return false;
            }else {
                return true;
            }
        },

        getVideo: function () {

            Api.get('http://m.api.hunantv.com/video/getbyid/', {videoId: PDATA.person_info.vid}, function (respData) {
                var videoInfo = respData.data;
                var canPlayM3U8 = !!document.createElement('video').canPlayType('application/x-mpegURL');
                var videoUrl = canPlayM3U8 ? (videoInfo.m3u8Url[1] ? videoInfo.m3u8Url[1] : videoInfo.m3u8Url[0] ) : (videoInfo.mp4Url[1] ? videoInfo.mp4Url[1] : videoInfo.mp4Url[0]);

                Api.get(videoUrl, {}, function (respData) {
                    var ele = '<video id="mgo-player" preload="auto" controls="controls" width="100%" height="100%" poster="'+ videoInfo.detail.image +'" src="'+ respData.info +'" webkit-playsinline></video>';
                    $('.video').html(ele);
                });
            });
        },



        bindEvents: function () {
            var _this = this;

            $('.vote-nav img').on('click', function (e) {
                $('.page-vote').hide();
            });
            $('.app-nav ul li.quit').on('click', function (e) {
                ImgotvApi.closeWebView();
            });


            // 隐藏分享浮层
            $('.mg-share').on('click', function () {
                $('.mg-share').hide();
            });


            $('.main-content-share img').on('click', function (e) {
                if (APP_HALF){
                    ImgotvApi.showShareMenus({
                        title: ShareData.title,
                        shareUrl: ShareData.link,
                        shareIcon: ShareData.imgUrl
                        });
                }else {
                    $('.mg-share').show();
                }
            });

        },

        //取得全部数据
        getTermList: function () {
            var _this = this;
            Api.getTermList({
                ticket: USERINFO.ticket,
                uuid: USERINFO.uuid
            }, function (respData) {
                TERMLIST = respData.data.list;
                console.log(respData.data.list);
                _this.appRender();
                _this.appBind();
            });
        },
        //取得全部数据
        appRender: function () {
            setTimeout("$('.page-loading').fadeOut('fast');",2000);

            $('.app-nav .title').html(CustomData.titleApp);

            $('.page-app').css('margin-top',PAGE_TOP_OFFSET+'px');
            $('.page-vote').css('margin-top',PAGE_TOP_OFFSET+'px');
            $('.main-menu').height(PAGE_HEIGHT-$('.nav').height());
            for(var i=0;i<TERMLIST.length;i++){
                $('.main-menu ul').append('<li><h1>'+(i+1)+'</h1><h2>期</h2></li>')
            }
            $('.main-menu ul li:last-child').addClass('active');
            $('.main-menu').scrollTop($('.main-menu').height());

            $('.main-content').width($(window).width()-$('.main-menu').width());
            $('.main-content').height(PAGE_HEIGHT-$('.nav').height());
            for(var i=0;i<TERMLIST.length;i++){
                var content = '';
                var data=TERMLIST[i];
                var maxValue=10;

                if(data[0].is_end==0){

                    for(var j=0;j<data.length;j++){
                        if(parseFloat(data[j].like_star_number)>maxValue){
                            maxValue = parseFloat(data[j].like_star_number)+1;
                        }
                    }


                    content = '<li><h1>'+CustomData.titleLastPage+'</h1><div class="content-list1 clearfix" style="height:'+($('.main-content').height()-80)+'px;"><ul>';

                    for(var j=0;j<data.length;j++){
                        content+='<li class="content-voteli clearfix" data-sortvalue="'+data[j].like_star_number+'" data-index="'+i+'" data-index2="'+j+'" data-max="'+maxValue+'">';
                        content+='<img class="avatar" src="'+data[j].pc_avatar_key+'">';
                        content+='<h1>'+data[j].name+'</h1>';
                        //content+='<h2><span id="check_'+data.term_id+'"><img class="icon" src="http://i5.hunantv.com/s1/2014/m/u/108/images/icon_uncheck.png"></span>'+data[j].like_star_number+'</h2>';
                        content+='<h2><span class="content-check" id="check_'+data[j].term_id+'"></span>'+data[j].like_star_number+'</h2>';
                        content+='<h3><div class="barbg"></div>';
                        content+='<div class="barshow" style="width:'+(Math.floor(parseFloat(data[j].like_star_number)/maxValue*80))+'%"></div></h3>';
                        content+='</li>';
                    }
                    content+='</ul></div></li>';
                }else {

                    for(var j=0;j<data.length;j++){
                        if(parseFloat(data[j].like_music_number)>maxValue){
                            maxValue = parseFloat(data[j].like_music_number)+1;
                        }
                    }
                    content = '<li class="content-term content-term-'+i+'"><h2 class="active" data-index="'+i+'">网友人气榜</h2><h3 data-index="'+i+'">本轮竞演排名</h3>';
                    content+='<div class="content-list1 clearfix" style="height:'+($('.main-content').height()-80)+'px;"><ul>';
                    for(var j=0;j<data.length;j++){
                        content+='<li class="content-voteli clearfix" data-sortvalue="'+data[j].like_music_number+'" data-index="'+i+'" data-index2="'+j+'" data-max="'+maxValue+'">';
                        content+='<img class="avatar" src="'+data[j].pc_avatar_key+'">';
                        content+='<h1>'+data[j].name+'<img class="icon"  src="http://i5.hunantv.com/s1/2014/m/u/108/images/icon_song.png">'+data[j].music+'</h1>';
                        content+='<h2><span class="content-check" id="check_'+data[j].term_id+'"></span>'+data[j].like_music_number+'</h2>';
                        content+='<h3><div class="barbg"></div><div class="barshow" style="width:'+(Math.floor(parseFloat(data[j].like_music_number)/maxValue*80))+'%"></div></h3>';
                        content+='</li>';
                    }
                    content+='</ul></div>';
                    content+='<div class="content-list2 clearfix" style="height:'+($('.main-content').height()-80)+'px;display:none;"><ul>';
                    for(var j=0;j<data.length;j++){
                        content+='<li class="-cancel-content-voteli clearfix" data-rank="'+data[j].rank+'">';
                        content+='<div data-rank="'+data[j].rank+'"><img class="avatar" src="'+data[j].pc_avatar_key+'"></div>';
                        content+='<h1>'+data[j].name+'</h1>';
                        //content+='<h2>'+data[j].like_star_number+'</h2>';
                        //content+='<h3><div class="barbg"></div><div class="barshow" style="width:'+(Math.floor(parseFloat(data[j].like_star_number)/maxValue*0.8))+'%"></div></h3>';
                        content+='</li>';
                    }
                    content+='</ul></div>';
                    content+='</li>'
                }
                $('.main-content>ul').append(content);

				//tinysort.defaults.order = 'asc';
				tinysort.defaults.attr = 'data-rank';
				tinysort('.main-content>ul li:nth-child('+(i+1)+') .content-list2 ul li');
                if(data.length==7){
                    $('.main-content>ul li:nth-child('+(i+1)+') .content-list2 ul li:nth-child(5)').addClass('cols3offset');
                }

                var lastCheck=Utils.getCookie(COOKIE_TAG+data[0].id);
                $('#check_'+lastCheck).removeClass('content-check').addClass('content-check-active');
            }
            $('.main-content>ul>li:last-child').show();

            $('.vote-main').height(PAGE_HEIGHT-$('.nav').height());
        },
        // 绑定事件
        appBind: function () {
            var _this = this;

            // 期数切换
            $('.main-menu ul li').on('click', '', function () {
                var termIndex = $(this).index();
                $('.main-menu ul li').removeClass('active');
                $('.main-menu ul li:nth-child('+(termIndex+1)+')').addClass('active');
                $('.main-content>ul>li').hide();
                $('.main-content>ul>li:nth-child('+(termIndex+1)+')').show();

                //var termData = TERMLIST[termIndex];
                //console.log(termData)
            });
            // 投票
            $('.main-content li').on('click', '.content-voteli', function () {
                var i = $(this).data('index');
                var j = $(this).data('index2');
                var m = $(this).data('max');
                var data = TERMLIST[i][j];
                //console.log(data);
                _this.showVotePage(data,m);
            });
            //歌曲投票和竞演排行切换
            $('.content-term').on('click', 'h2', function () {
                var i = $(this).data('index');
                $('.content-term-'+i+' h2').addClass('active');
                $('.content-term-'+i+' h3').removeClass('active');
                $('.content-term-'+i+' .content-list1').show();
                $('.content-term-'+i+' .content-list2').hide();

            });
            $('.content-term').on('click', 'h3', function () {
                var i = $(this).data('index');
                $('.content-term-'+i+' h3').addClass('active');
                $('.content-term-'+i+' h2').removeClass('active');
                $('.content-term-'+i+' .content-list2').show();
                $('.content-term-'+i+' .content-list1').hide();

            });

        },
        // 投票pop
        showVotePage: function (data,maxValue) {
            var _this = this;

            var goCanvasAdd=function(){
                var canvasWidth=$('.avatarline').width();
                $('.avatarbox').height($('.avatarbox').width());
                $('.avatarline').height($('.avatarline').width());
                $('.avatarbox .avatar').width(canvasWidth-20).css('top','-'+$('.avatarline').width()+'px');
                $('.avatarline').html('<canvas id="avatarCanvas" width="'+$('.avatarline').width()+'px" height="'+$('.avatarline').width()+'px"></canvas>');
            };
            var goCanvasClear=function(){
                var canvas = document.getElementById("avatarCanvas");
                var canvasWidth=$('.avatarline').width();
                //获取对应的CanvasRenderingContext2D对象(画笔)
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0,0,canvasWidth,canvasWidth);
                };
            var goCanvasDraw=function(color,padding,v,max){
                var canvas = document.getElementById("avatarCanvas");
                var canvasWidth=$('.avatarline').width();
                //获取对应的CanvasRenderingContext2D对象(画笔)
                var ctx = canvas.getContext("2d");

                //开始一个新的绘制路径
                ctx.beginPath();
                //设置弧线的颜色为蓝色
                ctx.strokeStyle = color;
                var circle = {
                    x : canvasWidth/2,    //圆心的x轴坐标值
                    y : canvasWidth/2,    //圆心的y轴坐标值
                    r : (canvasWidth-padding)/2      //圆的半径
                };
                //沿着坐标点(100,100)为圆心、半径为50px的圆的顺时针方向绘制弧线
                if(v==-1)
                ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI*2, false);
                else
                ctx.arc(circle.x, circle.y, circle.r, Math.PI*1.5, 0+(Math.PI*(v/max)), false);
                //按照指定的路径绘制弧线
                ctx.stroke();
            };
            var timer = function(code,speed,count){
                var num = 0;
                var myTimer = setInterval(function(){
                    code();
                    num++;
                    if(count&&num>=count)
                        clearInterval(myTimer);
                },speed);
            };

            if(data.is_end==0){

                var content='';
                content+='<h1>'+data.name+'</h1>';
                content+='<div class="avatarbox clearfix">';
                content+='<div class="avatarline">';
                content+='</div>';
                content+='<img class="avatar" src="'+data.pc_avatar_key+'">';
                content+='</div>';
                content+='<h2><img class="icon"  src="http://i5.hunantv.com/s1/2014/m/u/108/images/icon_uncheck.png"><span>'+data.like_star_number+'</span></h2>';
                content+='<h3><div><img class="btnvote1" src="http://i5.hunantv.com/s1/2014/m/u/108/images/btn_vote1.png"></div><div><img class="btnvote2" src="http://i5.hunantv.com/s1/2014/m/u/108/images/btn_vote2.png"></div></h3>';


                $('.vote-main').html(content);
                $('.page-vote').show();
                goCanvasAdd();
                //goCanvasDraw('#dddddd',12,-1,maxValue);
                //goCanvasDraw('#ff6666',12,data.like_star_number,maxValue);

                // 投票 6a30ccf62c399d605151dc022796721e X435J77VHPUVXVYXDB8B
                $('.btnvote1').on('click', '', function () {
                    var goVote=function(){
                        Api.getTermLike({
                            term_id: data.term_id,
                            ticket: USERINFO.ticket,
                            uuid: USERINFO.uuid
                        }, function (respData) {
                            if(respData.code==400){
                                _this.goAlert(PROMPT_REPEATE);
                            }else {
                                $('.vote-main h2 span').html(parseFloat($('.vote-main h2 span').html())+1);
                                Utils.setCookie(COOKIE_TAG+data.id,data.term_id,1/24);
                                $('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                                _this.goAlert(PROMPT_SUCCESS);
                            }
                        });
                    };
                    var goVoteGuest = function(){
                        var lastCheck=Utils.getCookie(COOKIE_TAG+data.id);
                        if(lastCheck==null){
                            $('.vote-main h2 span').html(parseFloat($('.vote-main h2 span').html())+1);
                            Utils.setCookie(COOKIE_TAG+data.id,data.term_id,1/24);
                            $('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                            _this.goAlert(PROMPT_SUCCESS);
                        }else {
                            _this.goAlert(PROMPT_REPEATE);
                        }
                    };
                    $(this).addClass('active');
                    if(!USERINFO){
                        if(APP_LOGIN_NEED){
                            if(_this.goCheckLogin()){
                                goVote();
                            }
                        }else {
                            goVoteGuest();
                        }
                    }else {
                        goVote();
                    }
                });
                // 取消
                $('.btnvote2').on('click', '', function () {
                    //$(this).addClass('active');
                    //setTimeout("$('.page-vote').hide();",200);
                    $('.page-vote').hide();
                });
            }else {

                var content='';
                content+='<h1>'+data.name+'</h1>';
                content+='<h2><img class="icon"  src="http://i5.hunantv.com/s1/2014/m/u/108/images/icon_song.png">'+data.music+'</h2>';
                content+='<div class="avatarbox clearfix">';
                content+='<div class="avatarline">';
                content+='</div>';
                content+='<img class="avatar" src="'+data.pc_avatar_key+'">';
                content+='</div>';
                content+='<h4><div><img class="btnvote1" src="http://i5.hunantv.com/s1/2014/m/u/108/images/btn_vote1.png"><span>'+data.like_music_number+'</span></div><div><img class="btnvote3" src="http://i5.hunantv.com/s1/2014/m/u/108/images/btn_vote3.png"><span>'+data.unlike_music_number+'</span></div></h4>';
                $('.vote-main').html(content);
                $('.page-vote').show();

                goCanvasAdd();
                goCanvasDraw('#dddddd',4,-1,maxValue);
                goCanvasDraw('#dddddd',12,-1,maxValue);
                var a = 0, b = 0;
                timer(function(){goCanvasClear();goCanvasDraw('#eeeeee',4,-1,maxValue);goCanvasDraw('#eeeeee',12,-1,maxValue);goCanvasDraw('#f55252',12,a,maxValue);a+=(data.like_music_number/10);goCanvasDraw('#35dcd6',4,b,maxValue);b+=(data.unlike_music_number/10)},100,10);
                //goCanvasDraw('#f55252',12,data.like_music_number,maxValue);
                //goCanvasDraw('#35dcd6',4,data.unlike_music_number,maxValue);

                // 投票 6a30ccf62c399d605151dc022796721e X435J77VHPUVXVYXDB8B
                $('.btnvote1').on('click', '', function () {

                    var goVote=function(){
                        Api.getTermLike({
                            term_id: data.term_id,
                            ticket: USERINFO.ticket,
                            uuid: USERINFO.uuid
                        }, function (respData) {
                            if(respData.code==400){
                                _this.goAlert(PROMPT_REPEATE);
                            }else {
                                $('.vote-main h4 div:first-child span').html(parseFloat($('.vote-main h4 div:first-child span').html())+1);
                                Utils.setCookie(COOKIE_TAG+data.id,data.term_id,1/24);
                                $('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                                _this.goAlert(PROMPT_SUCCESS);
                            }
                        });
                    };
                    var goVoteGuest = function(){
                        var lastCheck=Utils.getCookie(COOKIE_TAG+data.id);
                        if(lastCheck==null){
                            $('.vote-main h4 div:first-child span').html(parseFloat($('.vote-main h4 div:first-child span').html())+1);
                            Utils.setCookie(COOKIE_TAG+data.id,data.term_id,1/24);
                            $('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                            _this.goAlert(PROMPT_SUCCESS);
                        }else {
                            _this.goAlert(PROMPT_REPEATE);
                        }
                    };
                    $(this).addClass('active');

                    if(!USERINFO){
                        if(APP_LOGIN_NEED){
                            if(_this.goCheckLogin()){
                                goVote();
                            }
                        }else {
                            goVoteGuest();
                        }
                    }else {
                        goVote();
                    }
                });
                // 取消
                $('.btnvote3').on('click', '', function () {
                    var goVote=function(){
                        Api.getTermUnlike({
                            term_id: data.term_id,
                            ticket: USERINFO.ticket,
                            uuid: USERINFO.uuid
                        }, function (respData) {
                            if(respData.code==400){
                                _this.goAlert(PROMPT_REPEATE);
                            }else {
                                //$('.vote-main h4 div:last-child span').html(parseFloat($('.vote-main h4 div:last-child span').html())+1);
                                Utils.setCookie(COOKIE_TAG+data.id,data.term_id+100000,1/24);
                                //$('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                                _this.goAlert(PROMPT_SUCCESS);
                            }
                        });
                    };
                    var goVoteGuest = function(){
                        var lastCheck=Utils.getCookie(COOKIE_TAG+data.id);
                        if(lastCheck==null){
                            //$('.vote-main h4 div:last-child span').html(parseFloat($('.vote-main h4 div:last-child span').html())+1);
                            Utils.setCookie(COOKIE_TAG+data.id,data.term_id+100000,1/24);
                            //$('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                            _this.goAlert(PROMPT_SUCCESS);
                        }else {
                            _this.goAlert(PROMPT_REPEATE);
                        }
                    };
                    $(this).addClass('active');
                    if(!USERINFO){
                        if(APP_LOGIN_NEED){
                            if(_this.goCheckLogin()){
                                goVote();
                            }
                        }else {
                            goVoteGuest();
                        }
                    }else {
                        goVote();
                    }
                });
            }

        },
        //结束标记
        end: function(){

        }
    };

    MG.init();

})();
