// @dts-check

const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const translator = new Translator()

suite('Unit Tests', () => {
    test('Translate Mangoes are my favorite fruit. to British English', function () {
        assert.equal(translator.translate('Mangoes are my favorite fruit.', 'american-to-british').plain_tanslation, 'Mangoes are my favourite fruit.')
    })

    test('Translate I ate yogurt for breakfast. to British English', function () {
        assert.equal(translator.translate('I ate yogurt for breakfast.', 'american-to-british').plain_tanslation, 'I ate yoghurt for breakfast.')
    })
    
    test("Translate We had a party at my friend's condo. to British English", function () {
        assert.equal(translator.translate("We had a party at my friend's condo.", 'american-to-british').plain_tanslation, `We had a party at my friend's flat.`)
    })

    test('Translate Can you toss this in the trashcan for me? to British English', function () {
        assert.equal(translator.translate('Can you toss this in the trashcan for me?', 'american-to-british').plain_tanslation, 'Can you toss this in the bin for me?')
    })

    test('Translate The parking lot was full. to British English', function () {
        assert.equal(translator.translate('The parking lot was full.', 'american-to-british').plain_tanslation, 'The car park was full.')
    })

    test('Translate Like a high tech Rube Goldberg machine. to British English', function () {
        assert.equal(translator.translate('Like a high tech Rube Goldberg machine.', 'american-to-british').plain_tanslation, 'Like a high tech Heath Robinson device.')
    })

    test('Translate To play hooky means to skip class or work. to British English', function () {
        assert.equal(translator.translate('To play hooky means to skip class or work.', 'american-to-british').plain_tanslation, 'To bunk off means to skip class or work.')
    })

    test('Translate No Mr. Bond, I expect you to die. to British English', function () {
        assert.equal(translator.translate('No Mr. Bond, I expect you to die.', 'american-to-british').plain_tanslation, 'No Mr Bond, I expect you to die.')
    })

    test('Translate Dr. Grosh will see you now. to British English', function () {
        assert.equal(translator.translate('Dr. Grosh will see you now.', 'american-to-british').plain_tanslation, 'Dr Grosh will see you now.')
    })

    test('Translate Lunch is at 12:15 today. to British English', function () {
        assert.equal(translator.translate('Lunch is at 12:15 today.', 'american-to-british').plain_tanslation, 'Lunch is at 12.15 today.')
    })

    test('Translate We watched the footie match for a while. to American English', function () {
        assert.equal(translator.translate('We watched the footie match for a while.', 'british-to-american').plain_tanslation, 'We watched the soccer match for a while.')
    })

    test('Translate Paracetamol takes up to an hour to work. to American English', function () {
        assert.equal(translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american').plain_tanslation, 'Tylenol takes up to an hour to work.')
    })

    test('Translate First, caramelise the onions. to American English', function () {
        assert.equal(translator.translate('First, caramelise the onions.', 'british-to-american').plain_tanslation, 'First, caramelize the onions.')
    })

    test('Translate I spent the bank holiday at the funfair. to American English', function () {
        assert.equal(translator.translate('I spent the bank holiday at the funfair.', 'british-to-american').plain_tanslation, 'I spent the public holiday at the carnival.')
    })

    test('Translate I had a bicky then went to the chippy. to American English', function () {
        assert.equal(translator.translate('I had a bicky then went to the chippy.', 'british-to-american').plain_tanslation, 'I had a cookie then went to the fish-and-chip shop.')
    })

    test("Translate I've just got bits and bobs in my bum bag. to American English", function () {
        assert.equal(translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american').plain_tanslation, `I've just got odds and ends in my fanny pack.`)
    })

    test('Translate The car boot sale at Boxted Airfield was called off. to American English', function () {
        assert.equal(translator.translate('The car boot sale at Boxted Airfield was called off.', 'british-to-american').plain_tanslation, 'The swap meet at Boxted Airfield was called off.')
    })

    test('Translate Have you met Mrs Kalyani? to American English', function () {
        assert.equal(translator.translate('Have you met Mrs Kalyani?', 'british-to-american').plain_tanslation, 'Have you met Mrs. Kalyani?')
    })

    test("Translate Prof Joyner of King's College, London. to American English", function () {
        assert.equal(translator.translate("Prof Joyner of King's College, London.", 'british-to-american').plain_tanslation, `Prof. Joyner of King's College, London.`)
    })

    test('Translate Tea time is usually around 4 or 4.30. to American English', function () {
        assert.equal(translator.translate('Tea time is usually around 4 or 4.30.', 'british-to-american').plain_tanslation, 'Tea time is usually around 4 or 4:30.')
    })

    test('Highlight translation in Mangoes are my favorite fruit.', function () {
        assert.equal(translator.translate('Mangoes are my favorite fruit.', 'american-to-british').translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
    })

    test('Highlight translation in I ate yogurt for breakfast.', function () {
        assert.equal(translator.translate('I ate yogurt for breakfast.', 'american-to-british').translation, 'I ate <span class="highlight">yoghurt</span> for breakfast.')
    })

    test('Highlight translation in We watched the footie match for a while.', function () {
        assert.equal(translator.translate('We watched the footie match for a while.', 'british-to-american').translation, 'We watched the <span class="highlight">soccer</span> match for a while.')
    })

    test('Highlight translation in Paracetamol takes up to an hour to work.', function () {
        assert.equal(translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american').translation, '<span class="highlight">Tylenol</span> takes up to an hour to work.')
    })
});
