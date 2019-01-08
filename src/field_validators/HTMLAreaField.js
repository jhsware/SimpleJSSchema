'use strict'
/*
    Text field
*/
import { createObjectPrototype } from 'component-registry'
import TextAreaField from './TextAreaField'
import { i18n } from '../utils'
import striptags from 'striptags'

import { IHTMLAreaField } from '../interfaces'

const HTMLAreaField = createObjectPrototype({
    implements: [IHTMLAreaField],
    extends: [TextAreaField],
    
    constructor: function (options) {
        this._ITextAreaField.constructor.call(this, options)
    },
    
    validate: function (inp) {
        var tmp = inp
        if (typeof inp === 'string') {
            tmp = striptags(inp)
        }
        var error = this._ITextAreaField.validate.call(this, tmp)
        if (error) { return error }

        // TODO: should I add HTML validation? Might need cheerio, in which case 
        // perhaps only serverside validation to keep file size small in browser?
        // Could use striptags with allowed tags but it doesn't support attribute
        // stripping
    }
})
module.exports = HTMLAreaField
