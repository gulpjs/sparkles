sparkles
========

[![Build Status](https://travis-ci.org/phated/sparkles.svg?branch=master)](https://travis-ci.org/phated/sparkles)

Namespaced global event emitter

## Usage

Sparkles exports a function that returns a singleton `EventEmitter`.
This EE can be shared across your application, whether or not node loads
multiple copies.

```js
var sparkles = require('sparkles')(); // make sure to call the function

sparkles.on('my-event', function(evt){
  console.log('my-event handled', evt);
});

sparkles.emit('my-event', { my: 'event' });
```

## License

MIT
