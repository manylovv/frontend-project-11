import parseRSS from './actions/parseRSS';
import fetchRSS from './actions/fetchRSS';
import validate from './actions/validate';

export const handleSubmit = (rssUrl, state) => {
  return validate(rssUrl, state.urls)
    .then(() => fetchRSS(rssUrl))
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
