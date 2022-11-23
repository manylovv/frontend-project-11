import onChange from 'on-change';
import i18next from 'i18next';
import render from './view';
import updatePosts from './utils/updatePosts';
import handleSubmit from './eventsHandlers';
import resources from './locales/index';

export default () => {
  // show html after js is loaded
  document.querySelector('[data-no-js]')?.remove();

  const elements = {
    form: document.querySelector('.rss-form'),
    rssInput: document.getElementById('url-input'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
    modal: {
      title: document.querySelector('.modal-title'),
      body: document.querySelector('.modal-body'),
      postLink: document.querySelector('.full-article'),
    },
    feedback: document.querySelector('.feedback'),
    exampleLink: document.querySelector('.example-link'),
  };

  const initialState = {
    feeds: [],
    posts: [],
    urls: [],
    errors: {
      form: '',
    },
    ui: {
      viewedPostsIds: [],
    },
  };

  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  const state = onChange(initialState, () => render(state, elements, i18n));

  elements.form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rssUrl = formData.get('url');

    handleSubmit(rssUrl, state)
      .then(({
        feed, posts, url, errors,
      }) => {
        console.log({
          feed,
          posts,
          url,
          errors,
        });

        state.feeds.push(feed);
        state.posts.unshift(...posts);
        state.urls.push(url);
        state.errors.form = errors.form;

        updatePosts(state);
      })
      .catch((error) => {
        console.error(error);
        if (error.isAxiosError) {
          state.errors.form = 'errors.network';
        } else {
          state.errors.form = error.message;
        }
      });
  });
};
