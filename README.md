# json-x-loader
Webpack JSON transformer

```bash
npm i --save-dev json-x-loader
```

In your webpack configuration:

```js
rules: [{
    test: /\.json$/,
    use: ['json-x-loader?exclude=bar+baz']
}]
```

Then, when you load a json file:

```json
{
    "foo": 1,
    "bar": 2,
    "baz": 3
}
```

Webpack will emit only `{"foo":1}` and exclude the `bar` and `baz` keys.

You can also use wildcards and deep keys. For example:

```js
rules: [{
    test: /\.json$/,
    use: ['json-x-loader?exclude=foo.*+*.zilly']
}]
```

with

```json
{
    "foo": {
        "a": "b",
        "c": {
            "d": "e"
        }
    },
    "baz": {
        "zilly": "hoo",
        "zonk": "patwang"
    },
    "donkeykong": {
        "zilly": "silly",
        "foreally": "dealy"
    }
}
```

yields

```json
{
    "foo": {},
    "baz": {
        "zonk": "patwang"
    },
    "donkeykong": {
        "foreally": "dealy"
    }
}
```
