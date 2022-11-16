import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';
import onChange from 'on-change';
import render from './render';
import updatePosts from './actions/updatePosts';
import { handleSubmit } from './eventsHandlers';

const elements = {
  form: document.querySelector('.rss-form'),
  rssInput: document.getElementById('url-input'),
  feedsContainer: document.querySelector('.feeds'),
  postsContainer: document.querySelector('.posts'),
};

const app = (i18n) => {
  const initialState = {
    feeds: [],
    posts: [],
    urls: [],
    errors: {
      form: '',
    },
  };

  const state = onChange(initialState, () => render(state, elements, i18n));
  updatePosts(state);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rssUrl = formData.get('url');

    handleSubmit(rssUrl, state)
      .then(({ feed, posts, url, errors }) => {
        console.log({ feed, posts, url, errors });
        state.feeds.push(feed);
        state.posts.push(...posts);
        state.urls.push(url);
        state.errors.form = errors.form;
      })
      .catch((e) => {
        console.error(e);
        if (e.isAxiosError) {
          state.errors.form = 'errors.network';
        } else {
          state.errors.form = e.message;
        }
      });
  });
};

export default app;
