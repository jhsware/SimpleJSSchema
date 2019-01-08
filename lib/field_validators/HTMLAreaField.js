'use strict';
/*
    Text field
*/
const { createObjectPrototype } = require('component-registry')
const TextAreaField = require('./TextAreaField');
const { i18n } = require('../utils')
const striptags = require('striptags');

const IHTMLAreaField = require('../interfaces').IHTMLAreaField;

const HTMLAreaField = createObjectPrototype({
    implements: [IHTMLAreaField],
    extends: [TextAreaField],
    
    constructor: function (options) {
        this._ITextAreaField.constructor.call(this, options);
    },
    
    validate: function (inp) {
        var tmp = inp;
        if (typeof inp === 'string') {
            tmp = striptags(inp);
        }
        var error = this._ITextAreaField.validate.call(this, tmp);
        if (error) { return error };

        // TODO: should I add HTML validation? Might need cheerio, in which case 
        // perhaps only serverside validation to keep file size small in browser?
        // Could use striptags with allowed tags but it doesn't support attribute
        // stripping
    }
});
module.exports = HTMLAreaField;
