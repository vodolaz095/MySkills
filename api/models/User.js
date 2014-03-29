/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        username: {
            type: 'string',
            required:true,
            unique:true
        },
        name: {
            type: 'string'
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        email: {
            type: 'string',
            email: true,
//            required: true,
            unique: true
        },
        facebookId: {
            type: 'string',
            unique:true
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.email;
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }

};
