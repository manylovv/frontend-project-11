export default (url) => {
  const newUrl = new URL('https://allorigins.hexlet.app/get');
  const searchUrl = encodeURI(url);
  newUrl.searchParams.set('disableCache', 'true');
  newUrl.searchParams.set('url', searchUrl);
  return newUrl;
};
