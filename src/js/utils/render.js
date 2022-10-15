const reset = ({ form, rssInput, feedsContainer, postsContainer }) => {
  form.reset();
  rssInput.focus();
  const prevInvalidFeedback = document.querySelector('.invalid-feedback');
  if (prevInvalidFeedback) {
    prevInvalidFeedback.remove();
  }

  if (rssInput.classList.contains('is-invalid')) {
    rssInput.classList.remove('is-invalid');
  }

  if (feedsContainer.children.length > 0) {
    feedsContainer.innerHTML = '';
  }

  if (postsContainer.children.length > 0) {
    postsContainer.innerHTML = '';
  }
};

const renderErrors = (i18n, errors, { rssInput }) => {
  if (errors.form) {
    rssInput.classList.add('is-invalid');

    // create error message element
    const invalidFeedback = document.createElement('div');
    invalidFeedback.classList.add('invalid-feedback');
    invalidFeedback.textContent = i18n.t(errors.form);

    // add error message after input
    rssInput.after(invalidFeedback);
  }
};

const renderFeeds = (i18n, feeds, { feedsContainer }) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h3');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = i18n.t('feeds');

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group');

  feeds.forEach((feed) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    const feedTitle = document.createElement('h6');
    feedTitle.classList.add('h6');
    feedTitle.textContent = feed.title;

    const feedDescription = document.createElement('p');
    feedDescription.textContent = feed.description;

    listItem.append(feedTitle, feedDescription);
    listGroup.append(listItem);
  });

  cardBody.append(cardTitle);
  card.append(cardBody, listGroup);
  feedsContainer.append(card);
};

const renderPosts = (i18n, posts, { postsContainer }) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h3');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = i18n.t('posts');

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group');

  posts.forEach((post) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    const postLink = document.createElement('a');
    postLink.classList.add('font-weight-bold');
    postLink.setAttribute('href', post.link);
    postLink.setAttribute('target', '_blank');
    postLink.setAttribute('rel', 'noopener noreferrer');
    postLink.textContent = post.title;

    listItem.append(postLink);
    listGroup.append(listItem);
  });

  cardBody.append(cardTitle);
  card.append(cardBody, listGroup);
  postsContainer.append(card);
};

export default (state, elements, i18n) => {
  const { errors, feeds, posts } = state;
  reset(elements);

  renderErrors(i18n, errors, elements);
  renderFeeds(i18n, feeds, elements);
  renderPosts(i18n, posts, elements);
};
