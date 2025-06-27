// @ts-check

const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    constructor() {
        this.americanToBritishDict = { ...americanToBritishSpelling, ...americanOnly }
        this.britishToAmericanTitle = { ...britishOnly }
        this.americanToBritishTitle = {}
        this.britishToAmericanDict = {}

        for (const [k, v] of Object.entries(americanToBritishSpelling)) {
            this.britishToAmericanDict[v] = k
        }

        for (const [k, v] of Object.entries(americanToBritishTitles)) {
            const capitalizedKey = k.charAt(0).toUpperCase() + k.slice(1)
            const capitalizedValue = v.charAt(0).toUpperCase() + v.slice(1)

            this.americanToBritishTitle[capitalizedKey.replace('.', '\\.')] = capitalizedValue
            this.britishToAmericanTitle[capitalizedValue] = capitalizedKey
        }

        this.sortedAmericanToBritishKeys = Object.keys(this.americanToBritishDict).sort((a, b) => b.length - a.length)
        this.sortedBritishToAmericanKeys = Object.keys(this.britishToAmericanDict).sort((a, b) => b.length - a.length)
    }


    /**
     * Translator
     * @param {string} text 
     * @param {string} locale 
     */
    translate(text, locale) {
        let translated = text.slice()
        let dictionary = {}
        let keys = []
        let titleDic = {}
        const replacementMap = new Map()

        if (locale === 'american-to-british') {
            dictionary = this.americanToBritishDict
            keys = this.sortedAmericanToBritishKeys
            titleDic = this.americanToBritishTitle
            translated = translated.replace(/(\d+):(\d+)/g, '$1.$2')
        } else if (locale === 'british-to-american') {
            dictionary = this.britishToAmericanDict
            keys = this.sortedBritishToAmericanKeys
            titleDic = this.britishToAmericanTitle
            translated = translated.replace(/(\d+)\.(\d+)/g, '$1:$2')
        } else {
            return { error: 'Invalid value for locale field', translation: null, plain_tanslation: null}
        }

        let plaholderIndex = 0

        // loop title
        for (let [key, value] of Object.entries(titleDic)) {
            const regx = new RegExp(`(?<!\\w)${key}(?!\\w)`, 'ig')

            translated = translated.replace(regx, (match) => {
                const ph = `__REPL_${plaholderIndex++}__`
                const vl = `<span class="highlight">${value}</span>`
                replacementMap.set(ph, vl)

                return ph
            })
        }

        // loop word
        for (let key of keys) {
            const value = dictionary[key]
            const regx = new RegExp(`\\b${key}\\b`, 'ig')

            translated = translated.replace(regx, (match) => {
                const ph = `__REPL_${plaholderIndex++}__`
                const vl = match[0] === match
                    ? `<span class="highlight">${value.charAt(0).toUpperCase() + value.slice(1)}</span>`
                    : `<span class="highlight">${value}</span>`;
                replacementMap.set(ph, vl)

                return ph
            });
        }

        // restore
        for (const [ph, vl] of replacementMap.entries()) {
            translated = translated.replace(ph, vl)
        }

        const plain_tanslation = translated.replace(/<span class="highlight">(.*?)<\/span>/g, '$1')

        return {
            error: null,
            translation: translated === text ? "Everything looks good to me!" : translated,
            plain_tanslation
        }
    }
}

module.exports = Translator;