'use strict'

module.exports = async (event, context) => {
  return context
    .status(200)
    .succeed(event.body)
}
