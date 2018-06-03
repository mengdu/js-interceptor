const interceptor = require('./')

const obj = {
  middlewares: [],
  use (fn) {
    this.middlewares.push(fn)
  }
}

obj.use(function (ctx, next) {
  console.log('1')
  console.log(ctx)

  ctx.age++
  ctx.fullName = ctx.firstName + '●' + ctx.lastName

  next()
})

obj.use(function (ctx, next) {
  console.log('2')
  console.log(ctx)

  next()
})

interceptor(obj.middlewares)({firstName: 'Sharon', lastName: 'Jackson', age: 21}, function (ctx) {
  console.log(3)
  console.log(ctx)
})
