# url-exists-deep

A deeper node library to determine if a url exists.

## Usage

```javascript
var urlExists = require('url-exists-deep');

urlExists('https://www.google.com')
  .then(function(response){
    console.log(response)
  });

```

Makes a deeper determination if a url exists or not. To reduce false negative
responses.
