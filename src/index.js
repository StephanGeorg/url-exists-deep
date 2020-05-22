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

  if (/4\d\d/.test(statusCode) && ![403, 405].includes(statusCode)) return false;

  const { url } = request.options;

  let checkUrl;
  let newMethod = method;

  if (statusCode === 403) {
    if (prevStatus === 403) return false;
    checkUrl = url.href;
    headers = { Accept: 'text/html', 'User-Agent': 'Mozilla/5.0' };
    newMethod = 'GET';
  } else if (statusCode === 301 || statusCode === 302) {
    if (!response.headers.location.includes('://')) {
      checkUrl = `${url.protocol}//${response.headers.location}`;
    } else checkUrl = response.headers.location;
  }

  if (checkUrl) return urlExistsDeep(checkUrl, headers, newMethod, timeout, pool, statusCode);
  return response.request.options.url;
};

export default urlExistsDeep;
