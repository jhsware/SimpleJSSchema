'use strict'

import { createObjectPrototype } from 'component-registry'
import BaseField from './BaseField'
import { IObjectField } from '../interfaces'
import { i18n } from '../utils'

/*
    Object field
*/



export default createObjectPrototype({
    implements: [IObjectField],
    extends: [BaseField],
    
    constructor: function (options) {
        this._IBaseField.constructor.call(this, options)
        if (options) {
            this._schema = options.schema
            this._interface = options.interface
            this.objectFactoryName = options.objectFactoryName
        }
    },
    
    validate: function (inp, options, context, async) {
        var error = this._IBaseField.validate.call(this, inp)
        if (error) { return error }
    
        // Validate data and return an error object
        if (inp) {
            
            if (this._interface) {
                if (!async) {
                    var schema = this._interface.schema
                } else {

                }
            } else {
                var schema = this._schema
            }

            // Allow object fields without schema (useful for modelling objects that we don't know what they look like)
            if (typeof schema === 'undefined') {
              return (async ? Promise.resolve(undefined) : undefined)
            }

            if (!async) {
                var formErrors = schema.validate(inp, options, context, async)
                if (formErrors) {
                    // report error if data is passed and errors are found
                    return {
                        type: "object_error",
                        i18nLabel: i18n('isomorphic-schema--object_field_value_error', 'There is an error in the content of this object'),
                        message: "Delformuläret innehåller fältfel",
                        fieldErrors: formErrors.fieldErrors,
                        invariantErrors: formErrors.invariantErrors
                    }
                }        
            } else {
                var promise = schema.validateAsync(inp, options, context)

                if (!(promise && promise.then)) {
                    return Promise.resolve(promise)
                } else {
                    return promise.then(function (formErrors) {
                        return Promise.resolve(formErrors)
                    })
                }
            }
            
        } else {
            if (!async) {
                return undefined
            } else {
                return Promise.resolve(undefined)
            }
        }
    },

    toFormattedString: function (inp) {
        return inp
    },

    fromString: function (inp, options) {
        let schema = (this._interface ? this._interface.schema : this._schema)

        if (typeof inp === 'object' && typeof schema !== 'undefined') {
            return schema.transform(inp, options)  
        } else {
            return inp
        }
    }
    
})
