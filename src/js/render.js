const reset = ({ form, rssInput, feedsContainer, postsContainer }) => {
  form.reset();
  rssInput.focus();
  const prevInvalidFeedback = document.querySelector('.feedback.text-danger');
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
    const exampleLink = document.querySelector('.example-link');

    // create error message element
    const invalidFeedback = document.createElement('div');
    invalidFeedback.textContent = i18n.t(errors.form);
    invalidFeedback.classList.add(
      'feedback',
      'm-0',
      'small',
      'text-danger',
      'position-absolute'
    );

    // add error message after input
    exampleLink?.after(invalidFeedback);
  }
};

const renderFeeds = (i18n, feeds, { feedsContainer }) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h3');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = i18n.t('feeds');

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'list-group-flush');

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
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h3');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = i18n.t('posts');

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'border-0', 'rounded-0');

  posts.forEach((post) => {
    const listItem = document.createElement('li');
    listItem.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0'
    );

    const postLink = document.createElement('a');
    postLink.classList.add('fw-bold');
    postLink.setAttribute('href', post.link);
    postLink.setAttribute('target', '_blank');
    postLink.setAttribute('rel', 'noopener noreferrer');
    postLink.textContent = post.title;

    // create button for modal window
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.setAttribute('data-id', post.id);
    button.textContent = i18n.t('preview');

    // data-bs-toggle="modal" data-bs-target="#exampleModal">

    listItem.append(postLink, button);
    listGroup.append(listItem);
  });

  cardBody.append(cardTitle);
  card.append(cardBody, listGroup);
  postsContainer.append(card);
};

export default (state, elements, i18n) => {
  const { errors, feeds, posts } = state;
  reset(elements);

  if (errors.form) {
    renderErrors(i18n, errors, elements);
    return;
  }

  renderFeeds(i18n, feeds, elements);
  renderPosts(i18n, posts, elements);
};
