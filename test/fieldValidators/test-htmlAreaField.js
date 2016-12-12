var assert = require('assert');
var expect = require('expect.js');

var validators = require('../../lib/field_validators');
var Schema = require('../../lib/schema');

describe('HTMLArea field', function() {
    it('accepts strings', function() {        
        var htmlField = validators.HTMLAreaField({required: true});
    
        var tmp = htmlField.validate("<p>this is a sting<p>");
        expect(tmp).to.be(undefined);
    });

    it('throws error on undefined if required', function() {        
        var htmlField = validators.HTMLAreaField({required: true});
        var tmp = htmlField.validate();
        expect(tmp).to.not.be(undefined);
    });

    it('throws error on integer', function() {        
        var htmlField = validators.HTMLAreaField({required: false});
        var tmp = htmlField.validate(4);
        expect(tmp).to.not.be(undefined);
    });
    
    it('throws error if text (exlcuding tags) is longer than maxLength', function() {        
        var htmlField = validators.textAreaField({maxLength: 5});
        var tmp = htmlField.validate("<p>123456</p>");
        expect(tmp).to.not.be(undefined);
    });
    
    it('throws error if text (exlcuding tags) is shorter than minLength', function() {        
        var htmlField = validators.HTMLAreaField({minLength: 5});
        var tmp = htmlField.validate("<p>1234</p>");
        expect(tmp).to.not.be(undefined);
    });

    it('accepts if text (exlcuding tags) is equal to maxLength', function() {        
        var htmlField = validators.HTMLAreaField({maxLength: 6});
        var tmp = htmlField.validate("<p>123456</p>");
        expect(tmp).to.be(undefined);
    });

    it('accepts if text (exlcuding tags) is equal to minLength', function() {        
        var htmlField = validators.HTMLAreaField({minLength: 5});
        var tmp = htmlField.validate("<p>12345</p>");
        expect(tmp).to.be(undefined);
    });

    it('accepts if text (exlcuding tags) is in between minLength and maxLength', function() {        
        var htmlField = validators.HTMLAreaField({minLength: 5, maxLength: 10});
        var tmp = htmlField.validate("<p>1234567</p>");
        expect(tmp).to.be(undefined);
    });
    
});