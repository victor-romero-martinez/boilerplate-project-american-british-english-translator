const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

const API_ROUTE = '/api/translate'
const translator = new Translator()

suite('Functional Tests', () => {
    
    test('Translation with text and locale fields: POST request to /api/translate', (done) => {
        const text = 'I ate yogurt for breakfast.'
        const locale = 'american-to-british'
        chai.request(server)
            .post(API_ROUTE)
            .set('Content-Type', 'application/json')
            .send({ text, locale })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.body.translation, translator.translate(text, locale).translation)
                done()
            })
    })
    
    test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
        chai.request(server)
            .post(API_ROUTE)
            .set('Content-Type', 'application/json')
            .send({ text: 'I ate yogurt for breakfast.', locale: 'latam' })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'Invalid value for locale field')
                done()
            })
    })
    
    test('Translation with missing text field: POST request to /api/translate', (done) => {
        chai.request(server)
            .post(API_ROUTE)
            .set('Content-Type', 'application/json')
            .send({ locale: 'american-to-british' })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'Required field(s) missing')
                done()
            })
    })
    
    test('Translation with missing locale field: POST request to /api/translate', (done) => {
        chai.request(server)
            .post(API_ROUTE)
            .set('Content-Type', 'application/json')
            .send({ text: 'I ate yogurt for breakfast.' })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'Required field(s) missing')  
                done()
            })
    })
    
    test('Translation with empty text: POST request to /api/translate', (done) => {
        chai.request(server)
            .post(API_ROUTE)
            .set('Content-Type', 'application/json')
            .send({ text: '', locale: 'british-to-american' })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'No text to translate')
                done()
            })
    })
    
    test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
        chai.request(server)
            .post(API_ROUTE)
            .set('Content-Type', 'application/json')
            .send({ text: 'We watched the footie match for a while.', locale: 'american-to-british' })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.body.translation, 'Everything looks good to me!')
                done()
            })
    })
});
