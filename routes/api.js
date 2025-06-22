'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body

      if (!text && !locale || !locale) {
        res.json({ error: 'Required field(s) missing' })
      } else if (!text) {
        res.json({ error: 'No text to translate' })
      } else {
        const translated = translator.translate(text, locale)
        res.json(translated)
      }
    });
};
