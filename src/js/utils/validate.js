import * as yup from 'yup';

const validate = (rssUrl, rssUrls) => {
  yup.setLocale({
    mixed: {
      notOneOf: 'errors.unique',
      required: 'errors.required',
    },
    string: {
      url: 'errors.url',
    },
  });

  const schema = yup.string().required().url().notOneOf(rssUrls);
  return schema.validate(rssUrl);
};

export default validate;
