export const PROXY_URL =
  'https://allorigins.hexlet.app/raw?disableCache=true&url=';

export const ELEMENTS = {
  form: document.querySelector('.rss-form'),
  rssInput: document.getElementById('url-input'),
  feedsContainer: document.querySelector('.feeds'),
  postsContainer: document.querySelector('.posts'),
  modal: {
    title: document.querySelector('.modal-title'),
    body: document.querySelector('.modal-body'),
    postLink: document.querySelector('.full-article'),
  },
  invalidFeedback: document.querySelector('.feedback.text-danger'),
  exampleLink: document.querySelector('.example-link'),
};
