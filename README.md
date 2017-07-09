# url-exists-deep

A deeper node library to determine if a url exists.

url-exists-deep was developed for performance and accuracy. To check whether a url
exists or not a HEAD request is sent, because this is much faster then a GET.
Most hosts are responding correct. If the host responses with a 403 Forbidden a GET
request with User-Agent and Accept header is sent.  

## Usage

```javascript
var urlExists = require('url-exists-deep');
var url = 'https://www.google.com';
urlExists(url)
  .then(function(response){
    if (response) {
      console.log("Url exists", response.href);
    } else {
      console.log("Url does not exists!");
    }
  });
```

Makes a deeper determination if a url exists or not. To reduce false negative
responses.

### Rewrites 301

If ```url ``` redirects with 301 url-exists-deep follows the redirect and returns
the destination url if exists.
