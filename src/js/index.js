import i18next from 'i18next';
import app from './app';
import resources from './locales/index';
import 'bootstrap';
import '../scss/styles.scss';

(async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  app(i18nextInstance);
})();
