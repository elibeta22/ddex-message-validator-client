import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import API from '../utils/API';

var ActionCreator = {
	schemaValidate: function (formData) {
		API
		.schemaValidate(formData)
			.then(function (schemaValidation) {
			 console.log(schemaValidation);
				  AppDispatcher.dispatch({
          					actionType: AppConstants.SCHEMA_VALIDATION,
          					schemaValidation: schemaValidation
          				});
			});
	},
		schematronValidate: function (formData) {
  		API
  		.schematronValidate(formData)
  			.then(function (schematronValidation) {
  			  console.log(schematronValidation);
  				AppDispatcher.dispatch({
  					actionType: AppConstants.SCHEMATRON_VALIDATION,
  					schematronValidation: schematronValidation
  				});
  			});
  	},

  	resetSchematronValidation:function(){
  	      				AppDispatcher.dispatch({
          					actionType: AppConstants.RESET,
          					schematronValidation: undefined
          				});
  	}

};


export default ActionCreator;
