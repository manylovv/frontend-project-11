import i18next from 'i18next';
import app from './app';
import resources from './locales/index';

(() => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  app(i18nextInstance);
})();
