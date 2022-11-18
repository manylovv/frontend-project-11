import * as yup from 'yup';

const validate = (rssUrl, rssUrls) => {
  yup.setLocale({
    mixed: {
      notOneOf: 'errors.unique',
    },
    string: {
      url: 'errors.url',
    },
  });

  const schema = yup.string().url().notOneOf(rssUrls);
  return schema.validate(rssUrl);
};

export default validate;
