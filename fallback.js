(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'
var t = require('typical')

/**
 * @module array-back
 * @example
 * var arrayify = require("array-back")
 */
module.exports = arrayify

/**
 * Takes any input and guarantees an array back.
 *
 * - converts array-like objects (e.g. `arguments`) to a real array
 * - converts `undefined` to an empty array
 * - converts any another other, singular value (including `null`) into an array containing that value
 * - ignores input which is already an array
 *
 * @param {*} - the input value to convert to an array
 * @returns {Array}
 * @alias module:array-back
 * @example
 * > a.arrayify(undefined)
 * []
 *
 * > a.arrayify(null)
 * [ null ]
 *
 * > a.arrayify(0)
 * [ 0 ]
 *
 * > a.arrayify([ 1, 2 ])
 * [ 1, 2 ]
 *
 * > function f(){ return a.arrayify(arguments); }
 * > f(1,2,3)
 * [ 1, 2, 3 ]
 */
function arrayify (input) {
  if (input === undefined) {
    return []
  } else if (t.isArrayLike(input)) {
    return Array.prototype.slice.call(input)
  } else {
    return Array.isArray(input) ? input : [ input ]
  }
}

},{"typical":3}],2:[function(require,module,exports){
'use strict'
var arrayify = require('array-back')

/**
 * Detect which ES6 (ES2015 and above) features are available.
 *
 * @module feature-detect-es6
 * @typicalname detect
 * @example
 * var detect = require('feature-detect-es6')
 *
 * if (detect.all('class', 'spread', 'let', 'arrowFunction')){
 *   // safe to run ES6 code natively..
 * } else {
 *   // run your transpiled ES5..
 * }
 */

/**
 * Returns true if the `class` statement is available.
 *
 * @returns {boolean}
 */
exports.class = function () {
  return evaluates('class Something {}')
}

/**
 * Returns true if the arrow functions available.
 *
 * @returns {boolean}
 */
exports.arrowFunction = function () {
  return evaluates('var f = x => 1')
}

/**
 * Returns true if the `let` statement is available.
 *
 * @returns {boolean}
 */
exports.let = function () {
  return evaluates('let a = 1')
}

/**
 * Returns true if the `const` statement is available.
 *
 * @returns {boolean}
 */
exports.const = function () {
  return evaluates('const a = 1')
}

/**
 * Returns true if the [new Array features](http://exploringjs.com/es6/ch_arrays.html) are available (exluding `Array.prototype.values` which has zero support anywhere).
 *
 * @returns {boolean}
 */
exports.newArrayFeatures = function () {
  return typeof Array.prototype.find !== 'undefined' &&
    typeof Array.prototype.findIndex !== 'undefined' &&
    typeof Array.from !== 'undefined' &&
    typeof Array.of !== 'undefined' &&
    typeof Array.prototype.entries !== 'undefined' &&
    typeof Array.prototype.keys !== 'undefined' &&
    typeof Array.prototype.copyWithin !== 'undefined' &&
    typeof Array.prototype.fill !== 'undefined'
}

/**
 * Returns true if the new functions of Object are available.
 *
 * @returns {boolean}
 */
exports.newObjectFeatures = function () {
  return typeof Object.assign !== 'undefined' &&
    typeof Object.setPrototypeOf !== 'undefined' &&
    typeof Object.getOwnPropertySymbols !== 'undefined' &&
    typeof Object.is !== 'undefined'
}

/**
 * Returns true if `Map`, `WeakMap`, `Set` and `WeakSet` are available.
 *
 * @returns {boolean}
 */
exports.collections = function () {
  return typeof Map !== 'undefined' &&
    typeof WeakMap !== 'undefined' &&
    typeof Set !== 'undefined' &&
    typeof WeakSet !== 'undefined'
}

/**
 * Returns true if generators are available.
 *
 * @returns {boolean}
 */
exports.generators = function () {
  return evaluates('function* test() {}')
}

/**
 * Returns true if `Promise` is available.
 *
 * @returns {boolean}
 */
exports.promises = function () {
  return typeof Promise !== 'undefined'
}

/**
 * Returns true if template strings are available.
 *
 * @returns {boolean}
 */
exports.templateStrings = function () {
  return evaluates('var a = `a`')
}

/**
 * Returns true if `Symbol` is available.
 *
 * @returns {boolean}
 */
exports.symbols = function () {
  return typeof Symbol !== 'undefined' && typeof Symbol.for === 'function'
}

/**
 * Returns true if destructuring is available.
 *
 * @returns {boolean}
 */
exports.destructuring = function () {
  return evaluates("var { first: f, last: l } = { first: 'Jane', last: 'Doe' }")
}

/**
 * Returns true if the spread operator (`...`) is available.
 *
 * @returns {boolean}
 */
exports.spread = function () {
  return evaluates('Math.max(...[ 5, 10 ])')
}

/**
 * Returns true if default parameter values are available.
 *
 * @returns {boolean}
 */
exports.defaultParamValues = function () {
  return evaluates('function test (one = 1) {}')
}

/**
 * Returns true if async functions are available.
 *
 * @returns {boolean}
 */
exports.asyncFunctions = function () {
  return evaluates('async function test () {}')
}

function evaluates (statement) {
  try {
    eval(statement)
    return true
  } catch (err) {
    return false
  }
}

/**
 * Returns true if *all* specified features are detected.
 *
 * @returns {boolean}
 * @param [...feature] {string} - the features to detect.
 * @example
 * var result = detect.all('class', 'spread', 'let', 'arrowFunction')
 */
exports.all = function () {
  return arrayify(arguments).every(function (testName) {
    var method = exports[testName]
    if (method && typeof method === 'function') {
      return method()
    } else {
      throw new Error('no detection available by this name: ' + testName)
    }
  })
}

},{"array-back":1}],3:[function(require,module,exports){
'use strict'

/**
 * For type-checking Javascript values.
 * @module typical
 * @typicalname t
 * @example
 * const t = require('typical')
 */
exports.isNumber = isNumber
exports.isString = isString
exports.isBoolean = isBoolean
exports.isPlainObject = isPlainObject
exports.isArrayLike = isArrayLike
exports.isObject = isObject
exports.isDefined = isDefined
exports.isFunction = isFunction
exports.isClass = isClass
exports.isPrimitive = isPrimitive
exports.isPromise = isPromise
exports.isIterable = isIterable

/**
 * Returns true if input is a number
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isNumber(0)
 * true
 * > t.isNumber(1)
 * true
 * > t.isNumber(1.1)
 * true
 * > t.isNumber(0xff)
 * true
 * > t.isNumber(0644)
 * true
 * > t.isNumber(6.2e5)
 * true
 * > t.isNumber(NaN)
 * false
 * > t.isNumber(Infinity)
 * false
 */
function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

/**
 * A plain object is a simple object literal, it is not an instance of a class. Returns true if the input `typeof` is `object` and directly decends from `Object`.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isPlainObject({ clive: 'hater' })
 * true
 * > t.isPlainObject(new Date())
 * false
 * > t.isPlainObject([ 0, 1 ])
 * false
 * > t.isPlainObject(1)
 * false
 * > t.isPlainObject(/test/)
 * false
 */
function isPlainObject (input) {
  return input !== null && typeof input === 'object' && input.constructor === Object
}

/**
 * An array-like value has all the properties of an array, but is not an array instance. Examples in the `arguments` object. Returns true if the input value is an object, not null and has a `length` property with a numeric value.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * function sum(x, y){
 *     console.log(t.isArrayLike(arguments))
 *     // prints `true`
 * }
 */
function isArrayLike (input) {
  return isObject(input) && typeof input.length === 'number'
}

/**
 * returns true if the typeof input is `'object'`, but not null!
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isObject (input) {
  return typeof input === 'object' && input !== null
}

/**
 * Returns true if the input value is defined
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isDefined (input) {
  return typeof input !== 'undefined'
}

/**
 * Returns true if the input value is a string
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isString (input) {
  return typeof input === 'string'
}

/**
 * Returns true if the input value is a boolean
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isBoolean (input) {
  return typeof input === 'boolean'
}

/**
 * Returns true if the input value is a function
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isFunction (input) {
  return typeof input === 'function'
}

/**
 * Returns true if the input value is an es2015 `class`.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isClass (input) {
  if (isFunction(input)) {
    return /^class /.test(Function.prototype.toString.call(input))
  } else {
    return false
  }
}

/**
 * Returns true if the input is a string, number, symbol, boolean, null or undefined value.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isPrimitive (input) {
  if (input === null) return true
  switch (typeof input) {
    case "string":
    case "number":
    case "symbol":
    case "undefined":
    case "boolean":
      return true
    default:
      return false
  }
}

/**
 * Returns true if the input is a Promise.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isPromise (input) {
  if (input) {
    var isPromise = isDefined(Promise) && input instanceof Promise
    var isThenable = input.then && typeof input.then === 'function'
    return isPromise || isThenable ? true : false
  } else {
    return false
  }
}

/**
 * Returns true if the input is an iterable (`Map`, `Set`, `Array` etc.).
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isIterable (input) {
  if (input === null || !isDefined(input)) {
    return false
  } else {
    return typeof input[Symbol.iterator] === 'function'
  }
}

},{}],4:[function(require,module,exports){
var detect = require ('feature-detect-es6')

if (! detect .all ('defaultParamValues', 'destructuring', 'promises', 'collections', 'spread', 'let', 'arrowFunction')) {
	;document .write ('<p style="color: white; text-align: center; position: fixed; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">Sorry, your browser is not supported. Please update to the latest version of your browser for an optimal browsing experience.</p>')
	;__die () }

},{"feature-detect-es6":2}]},{},[4]);
