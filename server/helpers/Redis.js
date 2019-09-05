/**
 * Helper para utilizar redis-client por medio de promesas
 * Redis Doc: http://redis.io/commands
 */
import Promise          from 'bluebird'
import RedisClient      from '../../config/redis'

/**
 * KEYS: Returns all keys matching pattern.
 * @param {string} pattern - pattern
 * @return {promise} - Error flag
 */
function keys(pattern) {
  return new Promise((resolve, reject) => {
    RedisClient.keys(pattern, (err, v) => {
      if (!err)
        return resolve(v)
      else
        return reject(err)
    })
  })
}

/**
 * EXISTS: validate if the key is set or exists
 * @param {string} key - key name
 * @return {promise} - Error flag
 */
function exists(key) {
  return new Promise((resolve, reject) => {
    RedisClient.exists(key, (err, v) => {
      if (err)
        return reject(err)
      else if (v === 1)
        return resolve(true)
      else
        return resolve(false)
    })
  })
}

/**
 * GET: return the value of the key
 * @param {string} key - key name
 * @return {promise}
 */
function get(key) {
  return new Promise((resolve, reject) => {
    RedisClient.get(key, (err, v) => {
      if (!err)
        return resolve(v)
      else
        return reject(err)
    })
  })
}


/**
 * SET: set new key
 * @param {string} key - key name
 * @param {string} value - key value
 * @return {promise}
 */
function set(key, value) {
  return new Promise((resolve, reject) => {
    RedisClient.set(key, value, (err, v) => {
      if (err)
        return reject(err)
      else if (v == 'OK')
        return resolve(true)
      else
        return resolve(false)
    })
  })
}


/**
 * SET: set new key with exp
 * @param {string} key - key name
 * @param {string} value - key value
 * @param {Number} exp - key exp time seconds
 * @return {promise}
 */
function setExp(key, value, exp) {
  return new Promise((resolve, reject) => {
    RedisClient.set(key, value, 'EX', exp, (err, v) => {
      if (err)
        return reject(err)
      else if (v == 'OK')
        return resolve(true)
      else
        return resolve(false)
    })
  })
}


/**
 * RENAME: Rename the key. This method not validate if the new key name exists
 * @param {string} key - key name
 * @param {string} newName - new key name
 * @return {promise}
 */
function rename(key, newName) {
  return new Promise((resolve, reject) => {
    RedisClient.rename(key, newName, ((err, v) => {
      if (err)
        return reject(err)
      else if (v == 'OK')
        return resolve(true)
      else
        return resolve(false)
    }))
  })
}


/**
 * RENAMENX: Rename the key if not exists the new key name
 * @param {string} key - key name
 * @param {string} newName - new key name
 * @return {promise}
 */
function renamenx(key, newName) {
  return new Promise((resolve, reject) => {
      RedisClient.renamenx(key, newName, (err, v) => {
        if (err)
          return reject(err)
        else if (v == 'OK')
          return resolve(true)
        else
          return resolve(false)
      })
    }
  )
}


/**
 * DEL: Delete the key
 * @param {string} key - key name
 * @return {promise} - Error Flag
 */
function del(key) {
  return new Promise((resolve, reject) => {
    RedisClient.del(key, (err, v) => {
      if (err)
        return reject(err)
      else if (v == 'OK')
        return resolve(true)
      else
        return resolve(false)
    })
  })
}


/**
 * DEL All: Delete all keys by pattern
 * @param {string} pattern - pattern
 * @return {promise} - Error Flag
 */
function delAll(pattern) {
  return new Promise((resolve, reject) => {
    keys(pattern)
      .then((keys) => {
        const pAll = []
        keys.map((k) => {
          pAll.push(del(k))
        })
        Promise.all(pAll)
          .then((value) => {
            return resolve(true)
          })
          .catch((e) => {
            return resolve(e)
          })
      })
      .catch((e) => {
        return reject(e)
      })
  })
}


/**
 * EXPIRE: Set expire time in seconds
 * @param {string} key - key name
 * @param {string} seg - time to expire in seconds
 * @return {promise} - Error Flag
 */
function expire(key, seg) {
  return new Promise((resolve, reject) => {
    RedisClient.expire(key, seg, (err, v) => {
      if (err)
        return reject(err)
      else if (v === 1)
        return resolve(true)
      else
        return resolve(false)
    })
  })
}

/**
 * PEXPIRE: Set expire time in milliseconds
 * @param {string} key - key name
 * @param {string} milliseconds - time to expire in milliseconds
 * @return {promise} - Error Flag
 */
function pexpire(key, milliseconds) {
  return new Promise((resolve, reject) => {
    RedisClient.expire(key, milliseconds, (err, v) => {
      if (err)
        return reject(err)
      else if (v === 1)
        return resolve(true)
      else
        return resolve(false)
    })
  })
}

/**
 * PERSIST: remove expire value
 * @param {string} key - key name
 * @return {promise} - Error Flag
 */
function persist(key) {
  return new Promise((resolve, reject) => {
    RedisClient.persist(key, (err, v) => {
      if (err)
        return reject(err)
      else if (v === 1)
        return resolve(true)
      else
        return resolve(false)
    })
  })
}

/**
 * TTL: get expire value remaining in seconds
 * @param {string} key - key name
 * @return {promise}
 */
function ttl(key) {
  return new Promise((resolve, reject) => {
    RedisClient.ttl(key, (err, v) => {
      if (err)
        return reject(err)
      else
        return resolve(v)
    })
  })
}

/**
 * PTTL: get expire value remaining in milliseconds
 * @param {string} key - key name
 * @return {promise}
 */
function pttl(key) {
  return new Promise((resolve, reject) => {
    RedisClient.pttl(key, (err, v) => {
      if (err)
        return reject(err)
      else
        return resolve(v)
    })
  })
}

/**
 * SELECT: select the database
 * @param {number} id - id of Database
 * @return {promise}
 */
function select(id) {
  return new Promise((resolve, reject) => {
    RedisClient.select(id, (err, v) => {
      if (err)
        return reject(err)
      else if (v == 'OK')
        return resolve(true)
      else
        return resolve(false)
    })
  })
}

/**
 * MOVE: Move the key to a selected database
 * @param {string} key - key name
 * @param {number} idDB - id of selected database
 * @return {promise} - Error Flag
 */
function move(key, idDB) {
  return new Promise((resolve, reject) => {
    RedisClient.move(key, idDB, (err, v) => {
      if (err)
        return reject(err)
      else if (v === 1)
        return resolve(true)
      else
        return resolve(false)
    })
  })
}

export default {
  keys,
  exists,
  get,
  set,
  rename,
  renamenx,
  del,
  delAll,
  expire,
  pexpire,
  persist,
  ttl,
  pttl,
  select,
  move,
  setExp,
}
