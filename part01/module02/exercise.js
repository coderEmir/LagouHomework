// @flow
function indexFn(params01 = 1,params02) {
    console.log(params01, params02);
}
indexFn()



function recommendName (obj: Object) {
    console.log(obj);
    const newObj = Object.assign({}, obj)
    newObj.name = "obj.name"
    console.log(newObj);
    return obj
}

recommendName({name: "jack"})
recommendName({ name: "rose" })

const arr = [1,2,3]
arr.push(4)
console.log(arr);

const obj = {
    name: "xiaoming"
}

Object.defineProperty(obj,"name",{
    
}) 