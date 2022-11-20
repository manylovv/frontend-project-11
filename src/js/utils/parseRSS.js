const parseRSS = (xmlData) => {
  try {
    console.log(xmlData);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlData.contents, 'application/xml');
    const title = doc.querySelector('title').textContent;
    const description = doc.querySelector('description').textContent;
    const postsNodes = doc.querySelectorAll('item');
    const posts = [...postsNodes].map((post) => ({
      title: post.querySelector('title').textContent,
      link: post.querySelector('link').textContent,
      description: post.querySelector('description').textContent,
    }));

    return { title, description, posts };
  } catch (e) {
    console.warn(e);
    throw new Error('errors.invalidRss');
  }
};

export default parseRSS;
