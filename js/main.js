require.config({
  baseUrl: 'js/',
  paths: {
    jquery: ['https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min', 'libs/jquery.min'],
    domReady: 'plugin/domReady'
  }
});

require(['modules/start']);
