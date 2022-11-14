import '../scss/styles.scss';
import onChange from 'on-change';
import render from './render';
import updatePosts from './actions/updatePosts';
import { handleSubmit } from './eventHandlers';

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
    handleSubmit(e, state).then((data) => {
      const { feed, post, url, errors } = data;
      state.feeds.push(feed);
      state.posts.push(post);
      state.urls.push(url);
      state.errors.form = errors.form;
    });
  });
};

export default app;
