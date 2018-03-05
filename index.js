const loaderUtils = require('loader-utils')

function removeByPath(obj, path) {
    if(typeof obj !== 'object')
        throw new Error(`expected object but found ${typeof obj} ${obj}`)
    if(path.length == null)
        throw new Error(`path must be an array!`)
    if(path.length === 0)
        throw new Error(`cannot remove from ${obj} by empty path!`)

    let component = path[0]
    if(path.length === 1) {
        if(component === '*') {
            for(let key in obj) {
                if(obj.hasOwnProperty(key)) {
                    delete obj[key]
                }
            }
        } else {
            if(obj.hasOwnProperty(component)) {
                delete obj[component]
            }
        }
    } else {
        if(component === '*') {
            for(let key in obj) {
                if(obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                    removeByPath(obj[key], path.slice(1))
                }
            }
        } else {
            if(obj.hasOwnProperty(component) && typeof obj[component] === 'object') {
                removeByPath(obj[component], path.slice(1))
            }
        }
    }

}

module.exports = function (source) {
    this.cacheable && this.cacheable()
    let value = typeof source === 'string' ? JSON.parse(source) : source

    const options = loaderUtils.getOptions(this)

    if(options != null) {
        let excludedKeys = options.exclude
        if (excludedKeys != null) {
            excludedKeys = excludedKeys.split('+')
            for (let key of excludedKeys) {
                removeByPath(value, key.split('.'))
            }
        }
    }

    return JSON.stringify(value)
}
