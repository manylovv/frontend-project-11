import axios from 'axios';
import parseRSS from './utils/parseRSS';
import validate from './utils/validate';

const proxyUrl = 'https://allorigins.hexlet.app/raw?disableCache=true&url=';

export const handleSubmit = (rssUrl, state) => {
  return validate(rssUrl, state.urls)
    .then(() => axios.get(proxyUrl + rssUrl))
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
        feed: { id: feedId, title, description, url: trimmedUrl },
        posts: processedPosts,
        url: trimmedUrl,
        errors: { form: '' },
      };
    });
};
