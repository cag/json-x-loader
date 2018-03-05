const jsonXLoader = require('.')
const assert = require('assert')
const _ = require('lodash')

describe('json-x-loader', () => {
    const fooData = {
        foo: 'bar',
        baz: {
            zilly: 'hoo',
            zonk: 'patwang',
        },
        donkeykong: {
            zilly: 'silly',
            foreally: 'dealy',
        },
    }
    const fooJSON = JSON.stringify(fooData)

    it('should load json', () => {
        assert.deepEqual(JSON.parse(jsonXLoader.call({}, fooJSON)), fooData)
    })

    it('should exclude a key', () => {
        assert.deepEqual(
            JSON.parse(jsonXLoader.call({ query: '?exclude=foo' }, fooJSON)),
            _.omit(fooData, ['foo'])
        )
    })

    it('should exclude multiple keys', () => {
        assert.deepEqual(
            JSON.parse(jsonXLoader.call({ query: '?exclude=foo+donkeykong' }, fooJSON)),
            _.omit(fooData, ['foo', 'donkeykong'])
        )
    })

    it('should exclude deep keys', () => {
        assert.deepEqual(
            JSON.parse(jsonXLoader.call({ query: '?exclude=baz.zonk' }, fooJSON)),
            _.omit(fooData, ['baz.zonk'])
        )
    })

    it('should exclude wildcard keys', () => {
        assert.deepEqual(JSON.parse(jsonXLoader.call({ query: '?exclude=*' }, fooJSON)), {})
    })

    it('should exclude deep wildcard keys', () => {
        assert.deepEqual(JSON.parse(jsonXLoader.call({ query: '?exclude=*.zilly+foo' }, fooJSON)), {
            baz: {
                zonk: 'patwang',
            },
            donkeykong: {
                foreally: 'dealy',
            },
        })
        assert.deepEqual(JSON.parse(jsonXLoader.call({ query: '?exclude=baz+donkeykong.*' }, fooJSON)), {
            foo: 'bar',
            donkeykong: {},
        })
    })
})
