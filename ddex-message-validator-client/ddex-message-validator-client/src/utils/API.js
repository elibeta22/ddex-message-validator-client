'use strict';

var request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line

export default {
  schemaValidate: function(formData) {
    return new Promise((resolve, reject) => {
      request
        .post('http://localhost:6060/api/json/validateSchema')
         .send(formData)
        .end((error, response) => {
          if (error) reject(error);
          resolve(response.text);
        });
    });
  },
    schematronValidate: function(formData) {
      return new Promise((resolve, reject) => {
        request
          .post('http://localhost:6060/api/json/validateSchematron')
           .send(formData)
           .set('Accept', 'application/json')
          .end((error, response) => {
            if (error) reject(error);
            resolve(response.body);
          });
      });
    }



}
