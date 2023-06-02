export const AppConfig = {
  site_name: 'Chris Ozgo',
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/'
      : 'https://chrisozgo.com',
  title: 'Chris Ozgo',
  description: 'Personal website and blog of Chris Ozgo',
  locale: 'en',
};
