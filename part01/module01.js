/**
 * 1. settimeout嵌套
 */
const MyPromise = require('./myPromise')
function newMyPromise(value) {
    return new MyPromise(resolve => {
        setTimeout(() => {
            resolve(value + 'lagou ')
        }, 10);
    })
}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello ')
    }, 10);
    
})
.then(value => {
    return newMyPromise(value)
})
.then(value => {
    setTimeout(() => {
        console.log(value + "I ❤ you");
    }, 10);
})

function newPromise(value) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value + 'lagou ')
        }, 10);
    })
}

new Promise(resolve=>{
    setTimeout(() => {
        resolve('hello ')
    }, 10);
})
.then(value => {
    return newPromise(value)
})
.then(value => {
    setTimeout(() => {
    console.log(value + 'I ❤ you');
}, 10);
})

/**
 * 2. lodash.fp
 */

 const fp = require('lodash/fp')

 const cars = [
     {
         name: 'bmw',
         horsepower: 660,
         dollar_value: 700000,
         in_stock: true
     },
     {
         name: 'bmw01',
         horsepower: 66001,
         dollar_value: 70000001,
         in_stock: true
     },
     {
         name: 'bmw02',
         horsepower: 66002,
         dollar_value: 70000002,
         in_stock: true
     },
     {
         name: 'bmw03',
         horsepower: 66003,
         dollar_value: 70000003,
         in_stock: true
     },
     {
         name: 'bmw04',
         horsepower: 66004,
         dollar_value: 70000004,
         in_stock: true
     },
     {
         name: 'bmw05',
         horsepower: 66005,
         dollar_value: 70000005,
         in_stock: true
     }
 ]
  
let isLastInStock = function (cars) {
    let last_car = _.last(cars)
    return _.prop('in_stock', last_car)
}

/**
 * 2.1 函数重写
 */
const fn0201 = fp.flowRight(fp.prop('in_stock'),fp.last)
console.log(fn0201(cars));

/**
 * 2.2 获取cars[0].name
 */
const fn0202 = fp.flowRight(fp.prop('name'),fp.first)
console.log(fn0202(cars));

/**
 * 2.3 _average重构 averageDollarValue
 */
let _average = function (xs) {
    return fp.reduce(fp.add,0,xs) / xs.length
}

let averageDollarValue = function (cars) {
    // 1
    let dollar_values = fp.map(function (car) {
        return car.dollar_value    
    },cars)
    // 2
    return _average(dollar_values)
}
let fun0203 = fp.flowRight(_average, fp.map(function (car) {
    return car.dollar_value
}))
console.log(fun0203(cars));

/**
 * 2.4 flowRight 重写函数
 */
let _underscore = fp.replace(/\W+/g, '_')
const fn0204 = fp.flowRight(_underscore, fp.lowerCase)
const sanitizeNames = fp.flowRight(fp.map(fn0204))
console.log(sanitizeNames(["Hello World"]));

/**
 * 3. 函子
 */
const {Maybe, Container} = require("./functor")
/**
 * 3.1 maybe
 */
let maybe = Maybe.of([5, 6, 1])
const addFn = fp.flowRight(fp.map(fp.add(1)))
let ex1 = () => {
    let r = maybe.map(addFn)
    return r
}
console.log(ex1());

/**
 * 3.2 Container
 */
let xs = Container.of(['do','ray','me','fa'])
let ex2 = () => {
    return xs.map(fp.first)
}
console.log(ex2());
/**
 * 3.3 user name first letter
 */


let user = {id: 2, name: 'Albert'}

let safeProp = fp.curry(function (x, o) {
    return Maybe.of(x[o])
})

let ex3 = () => {
    return safeProp(user, "name").map(fp.first)
}
console.log(ex3());
/**
* 3.4 使用Maybe重构
*/
let ex4 = function (n) {
    if (n) {
        return parseInt(n)
    }
}
console.log(ex4("10"))
let newEx4 = function(n) {
    return Maybe.of(n).map(parseInt)
}
console.log(newEx4("100"))