import '../scss/styles.scss';
import _ from 'lodash';
import axios from 'axios';
import onChange from 'on-change';
import render from './utils/render';
import validate from './utils/validate';
import parseRss from './utils/parser';

const elements = {
  form: document.querySelector('.rss-form'),
  rssInput: document.getElementById('rss-url-input'),
  feedsContainer: document.querySelector('.feeds'),
  postsContainer: document.querySelector('.posts'),
};

const app = (i18n, proxyUrl) => {
  const state = onChange(
    {
      feeds: [],
      posts: [],
      urls: [],
      errors: {
        form: '',
      },
    },
    () => render(state, elements, i18n)
  );

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rssUrl = formData.get('url');

    validate(rssUrl, state.urls)
      .then(() => {
        state.errors.form = '';
        return axios.get(proxyUrl + rssUrl);
      })
      .then((response) => {
        const { title, description, posts } = parseRss(response.data);
        const feedId = _.uniqueId('feed-');
        const prosessedPosts = posts.map((post) => {
          return { ...post, feedId, id: _.uniqueId('post-') };
        });

        state.urls.push(rssUrl.trim());
        state.feeds.push({ title, description, id: feedId });
        state.posts.push(...prosessedPosts);
      })
      .catch((e) => {
        if (e.isAxiosError) {
          state.errors.form = 'errors.network';
        } else {
          state.errors.form = e.message;
        }

        console.warn(e);
      });
  });
};

export default app;
