// @ts-check
'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body

      if (text === undefined && !locale || text === undefined || !locale) {
        res.json({ error: 'Required field(s) missing' })
      } else if (text === '') {
        res.json({ error: 'No text to translate' })
      } else {
        const { error, translation } = translator.translate(text, locale)
        error ? res.json({ error }) : res.json({ text, translation })
      }
    });
};
