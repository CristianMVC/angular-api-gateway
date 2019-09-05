import _ from 'lodash'

const objectToSnakeCase = (myObject) => {
  if (typeof myObject != 'object') {
    return null
  }

  const entries = Object.entries(myObject)

  const newObject = {}

  // eslint-disable-next-line comma-dangle
  for (const [key, value] of entries) {
    let newValue = value

    if (value !== null && typeof value === 'object') {
      newValue = objectToSnakeCase(value)
    }

    newObject[_.snakeCase(key)] = newValue
  }

  return newObject
}

export default {
  objectToSnakeCase,
}