import got from 'got';

const urlExistsDeep = async (uri, header = {}, method = 'HEAD', timeout = 5000, pool = {}, prevStatus = 0) => {
  let headers = header;
  const options = {
    url: uri,
    method,
    headers,
    followRedirect: false,
    timeout,
    pool,
    throwHttpErrors: false,
  };

  let response;
  try {
    response = await got(options);
  } catch (error) {
    return false;
  }

  const { statusCode, request } = response;
  const { url } = request.options;
  const responseHeaders = response.headers;

  if (/3\d\d/.test(statusCode) && !responseHeaders.location) return false;
  if (/4\d\d/.test(statusCode) && ![403, 405].includes(statusCode)) return false;
  if (/5\d\d/.test(statusCode)) return false;

  let checkUrl;
  let newMethod = method;

  if ([403, 405].includes(statusCode)) {
    if ([403, 405].includes(prevStatus)) return false;
    checkUrl = url.href;
    headers = {
      Accept: headers.Accept || 'text/html',
      'User-Agent': headers['User-Agent'] || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
    };
    newMethod = 'GET';
  } else if (/3\d\d/.test(statusCode) && responseHeaders.location) {
    checkUrl = !response.headers.location.includes('://')
      ? `${url.protocol}//${responseHeaders.location}`
      : response.headers.location;
  }

  if (checkUrl) return urlExistsDeep(checkUrl, headers, newMethod, timeout, pool, statusCode);
  return response.request.options.url;
};

export default urlExistsDeep;
module.exports = urlExistsDeep;
