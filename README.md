# url-exists-deep [![npm version](https://badge.fury.io/js/url-exists-deep.svg)](https://badge.fury.io/js/url-exists-deep)

A deeper node library to determine if a url exists.

url-exists-deep was developed for performance and accuracy. To check whether a url
exists or not a HEAD request is sent, because this is much faster then a GET.
Most hosts are responding correct. If the host responses with a 403 Forbidden a GET
request with User-Agent and Accept header is sent.  

## Installation

```
> npm i url-exists-deep
```

## Usage

```javascript
import urlExists from 'url-exists-deep';

```

```
const url = 'https://www.google.com';
const exists = await urlExists(url);
```


## Result

Returns ``false`` if url does not exists or ``` object ``` with url information.

Makes a deeper determination if a url exists or not. To reduce false negative
responses.

### Rewrites 301

If ```url ``` redirects with 301 url-exists-deep follows the redirect and returns
the destination url if exists.
