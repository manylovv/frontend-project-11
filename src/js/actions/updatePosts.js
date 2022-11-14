import axios from 'axios';
import _ from 'lodash';
import { parseRSS } from '../utils';
import { PROXY_URL } from '../constants';

const updatePosts = (state) => {
  const promises = state.feeds.map((feed) => {
    return axios
      .get(PROXY_URL + feed.url)
      .then((response) => {
        const { posts } = parseRSS(response.data);
        const newPosts = _.differenceBy(posts, state.posts, 'link');
        state.posts.unshift(...newPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  Promise.all(promises).finally(() =>
    setTimeout(updatePosts, 5000, state, PROXY_URL)
  );
};

export default updatePosts;
