'use strict'
/**
* Application interceptor
* e.g. interceptor(obj.middlewares)(ctx, fn)
* @param {Array} middlewares 中间件数组
* @return {Function}
**/
module.exports = function interceptor (middlewares) {
  if (Object.prototype.toString.call(middlewares) !== '[object Array]') throw new TypeError('Middleware stack must be an array!')
  for (var fi in middlewares) {
    if (typeof middlewares[fi] !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }
  
  return function (content, next) {
    var index = -1
    function dispatch (i) {
      if (i <= index) throw new Error('next() called multiple times')
      index = i
      if (i >= middlewares.length) {
        return next(content)
      }
      var fn = middlewares[i]

      fn(content, function () {
        dispatch(i + 1)
      })
    }
    dispatch(0)
  }
}
