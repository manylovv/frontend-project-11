import { parseRSS, fetchRSS } from '../utils';
import validate from '../actions/validate';

export const handleSubmit = (e, state) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const rssUrl = formData.get('url');

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
        feeds: { id: feedId, title, description, url: trimmedUrl },
        posts: processedPosts,
        urls: trimmedUrl,
        errors: { form: '' },
      };
    })
    .catch((e) => {
      if (e.isAxiosError) {
        state.errors.form = 'errors.network';
      } else {
        state.errors.form = e.message;
      }

      console.warn(e);
    });
};
