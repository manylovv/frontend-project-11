import axios from 'axios';
import { PROXY_URL } from '../constants';

const fetchRSS = (rssUrl) => axios.get(PROXY_URL + rssUrl);

export default fetchRSS;
