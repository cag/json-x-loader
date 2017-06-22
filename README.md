# json-x-loader
Webpack JSON transformer

```bash
npm i --save-dev json-x-loader
```

In your webpack configuration:

```js
rules: [{
    test: /\.json$/,
    use: ['json-loader', 'json-x-loader?exclude=bar,baz']
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
