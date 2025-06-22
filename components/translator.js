// @ts-check

const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    constructor() {
        this.americanToBritishDict = {
            ...americanToBritishSpelling,
            ...americanOnly,
        }
        this.americanToBritishTitle = {}
        this.britishToAmericanTitle = {}
        this.britishToAmericanDict = {}

        for (const [k, v] of Object.entries(britishOnly)) {
            this.americanToBritishDict[v] = k
        }

        for (const [k, v] of Object.entries(this.americanToBritishDict)) {
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
        let translated = text
        let dictionary = {}
        let keys = []
        let titleDic = {}

        if (locale === 'american-to-british') {
            dictionary = this.americanToBritishDict
            keys = this.sortedAmericanToBritishKeys
            titleDic = this.americanToBritishTitle
        } else if (locale === 'british-to-american') {
            dictionary = this.britishToAmericanDict
            keys = this.sortedBritishToAmericanKeys
            titleDic = this.britishToAmericanTitle
        }

        // loop title
        for (let [key, value] of Object.entries(titleDic)) {
            console.log(key, value)
            const regx = new RegExp(`(?<!\\w)${key}(?!\\w)`, 'ig')

            translated = translated.replace(regx, `<span class="highlight">${value}</span>`)
        }

        // loop word
        for (let key of keys) {
            const value = dictionary[key]
            const regx = new RegExp(`\\b${key}\\b`, 'ig')

            translated = translated.replace(regx, (match) => {
                if (match[0] === match) {
                    return `<span class="highlight">${value.charAt(0).toUpperCase() + value.slice(1)}</span>`
                }

                return `<span class="highlight">${value}</span>`
            })
        }

        return {
            text,
            translation: translated === text ? "Everything looks good to me!" : translated
        }
    }
}

module.exports = Translator;