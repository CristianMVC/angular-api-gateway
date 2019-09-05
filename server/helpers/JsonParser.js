/**
 * Helper para utilizar JSON.stringfy y JSON.parser como promises
 * Doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 * Doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
 */
import Promise from 'bluebird'

/**
 * toStr: JSON.stringify
 * @param {object} obj - json object
 * @return {promise} - string
 */
function toStr(obj) {
  return new Promise((callback) => {
    try {
      callback([null, JSON.stringify(obj)]) // eslint-disable-line comma-dangle
    } catch (e) {
      callback([true, null]) // eslint-disable-line comma-dangle
    }
  })
}


/**
 * toObj: JSON.parse
 * @param {string} str - string of json object
 * @return {promise} - object
 */
function toObj(str) {
  return new Promise((callback) => {
    try {
      callback([null, JSON.parse(str)]) // eslint-disable-line comma-dangle
    } catch (e) {
      callback([true, null]) // eslint-disable-line comma-dangle
    }
  })
}

export default {
  toStr,
  toObj,
}