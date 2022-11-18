import axios from 'axios';
import parseRSS from './utils/parseRSS';
import validate from './utils/validate';
import getUrl from './utils/proxy';

const handleSubmit = (rssUrl, state) => validate(rssUrl, state.urls)
  .then(() => axios.get(getUrl(rssUrl)))
  .then((response) => {
    const { title, description, posts } = parseRSS(response.data);
    const feedId = crypto.randomUUID();
    const trimmedUrl = rssUrl?.trim();
    const processedPosts = posts.map((post) => ({
      id: crypto.randomUUID(),
      feedId,
      ...post,
    }));

    return {
      feed: {
        id: feedId,
        title,
        description,
        url: trimmedUrl,
      },
      posts: processedPosts,
      url: trimmedUrl,
      errors: { form: '' },
    };
  });

export default handleSubmit;
