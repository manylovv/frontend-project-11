import i18next from 'i18next';
import app from './app';
import resources from './locales/index';

const runApp = () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  const proxyUrl = 'https://allorigins.hexlet.app/raw?disableCache=true&url=';
  app(i18nextInstance, proxyUrl);
};

runApp();
