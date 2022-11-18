const reset = ({
  form,
  rssInput,
  feedsContainer,
  postsContainer,
  feedback,
}) => {
  form.reset();
  rssInput.focus();

  if (feedback) {
    feedback.textContent = '';
    feedback.classList.remove('text-danger', 'text-success');
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

const renderErrors = (i18n, state, { rssInput, feedback }) => {
  if (state.errors.form) {
    rssInput.classList.add('is-invalid');
    feedback.textContent = i18n.t(state.errors.form);
    feedback.classList.add('text-danger');
  }
};

const renderFeeds = (i18n, state, { feedsContainer, feedback }) => {
  feedback.textContent = i18n.t('feedback');
  feedback.classList.add('text-success');

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h3');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = i18n.t('feeds');

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'list-group-flush');

  state.feeds.forEach((feed) => {
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

const renderPosts = (i18n, state, { postsContainer, modal }) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h3');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = i18n.t('posts');

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'border-0', 'rounded-0');

  state.posts.forEach((post) => {
    const listItem = document.createElement('li');
    listItem.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0'
    );

    const isViewed = state.ui.viewedPostsIds.includes(post.id);

    const postLink = document.createElement('a');
    // TODO: add 'me-4' for better text alignment
    postLink.classList.add(isViewed ? 'fw-normal' : 'fw-bold');
    postLink.setAttribute('href', post.link);
    postLink.setAttribute('target', '_blank');
    postLink.setAttribute('rel', 'noopener noreferrer');
    postLink.textContent = post.title;
    // add event listener to post link to mark post as viewed
    postLink.addEventListener('click', () => {
      state.ui.viewedPostsIds.push(post.id);
    });

    // create button for modal window
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.setAttribute('data-id', post.id);
    button.textContent = i18n.t('preview');

    button.addEventListener('click', () => {
      state.ui.viewedPostsIds.push(post.id);

      modal.title.textContent = post.title;
      modal.body.textContent = post.description;
      modal.postLink.href = post.link;
    });

    listItem.append(postLink, button);
    listGroup.append(listItem);
  });

  cardBody.append(cardTitle);
  card.append(cardBody, listGroup);
  postsContainer.append(card);
};

const renderFeedback = (i18n, state, { feedback }) => {};

export default (state, elements, i18n) => {
  reset(elements);

  if (state.errors.form) {
    renderErrors(i18n, state, elements);
    return;
  }

  renderFeedback(i18n, state, elements);
  renderFeeds(i18n, state, elements);
  renderPosts(i18n, state, elements);
};
