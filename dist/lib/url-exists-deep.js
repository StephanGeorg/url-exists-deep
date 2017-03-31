'use strict';

var request = require('request');

function urlExistsDeep(url, header, method, timeout) {
  return new Promise(function (resolve) {
    request({
      url: url,
      method: method || 'HEAD',
      headers: header || {},
      followRedirect: false,
      timeout: timeout || 5000
    }, function (err, res) {
      if (!res || err) {
        resolve(false);
        return;
      }

      var checkUrl = void 0;

      if (/4\d\d/.test(res.statusCode) && res.statusCode !== 403) {
        resolve(false);
        return;
      }

      if (res.statusCode === 403) {
        checkUrl = res.request.uri.href;
        header = { 'Accept': 'text/html', 'User-Agent': 'Mozilla/5.0' };
        method = 'GET';
      } else if (res.statusCode === 301) {
        checkUrl = res.headers.location;
      }

      if (checkUrl) {
        urlExistsDeep(checkUrl, header, method).then(resolve);
      } else resolve(res.request.uri);
    });
  });
}

module.exports = urlExistsDeep;