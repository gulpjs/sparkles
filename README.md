sparkles
========

[![Build Status](https://travis-ci.org/phated/sparkles.svg?branch=master)](https://travis-ci.org/phated/sparkles)

Namespaced global event emitter

## Usage

It just exports an `EventEmitter`. Think of it as a singleton.

```js
var sparkles = require('sparkles');

sparkles.on('my-event', function(evt){
  console.log('my-event handled', evt);
});

sparkles.emit('my-event', { my: 'event' });
```

## License

MIT
