// @ts-nocheck
const parseRSS = (xmlData) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlData, 'application/xml');
    const title = doc.querySelector('title').textContent;
    const description = doc.querySelector('description').textContent;
    const postsNodes = doc.querySelectorAll('item');
    const posts = [...postsNodes].map((post) => ({
      title: post.querySelector('title').textContent,
      link: post.querySelector('link').textContent,
    }));

    return { title, description, posts };
  } catch (e) {
    console.warn(e);
    throw new Error('errors.invalidRss');
  }
};

export default parseRSS;
