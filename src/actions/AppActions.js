 import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import API from '../utils/API';

var ActionCreator = {
	schemaValidate: function (formData) {
		API
		.schemaValidate(formData)
			.then(function (response) {
			  if(response[0]['status']){
			    console.log("An error was detected!");

			  }
         if (response[0]['schema'] !== 'Document is valid'){
				  AppDispatcher.dispatch({
          					actionType: AppConstants.SCHEMA_VALIDATION,
          					schemaValidation: response[0]['schema'],
          					schematronValidation : []
          				});
         }else{
         				  AppDispatcher.dispatch({
                   					actionType: AppConstants.SCHEMA_VALIDATION,
                   					schemaValidation: response[0]['schema'],
                   					schematronValidation : response[0]['schematron']
                   				});
         }
			}).catch(function(errorMessage){

			            AppDispatcher.dispatch({
                    actionType: AppConstants.SCHEMA_VALIDATION,
                    schemaValidation: errorMessage + " -> Sorry but it seems something went wrong.",
                    schematronValidation : []

                  });
			});
	},
		schematronValidate: function (formData) {
  		API
  		.schematronValidate(formData)
  			.then(function (schematronValidation) {
  				AppDispatcher.dispatch({
  					actionType: AppConstants.SCHEMATRON_VALIDATION,
  					schematronValidation: schematronValidation
  				});
  			});
  	},


  	reset:function(){
  	                var schemaDefault = '';
  	                var schematronDefault = [];
  	      					AppDispatcher.dispatch({
          					actionType: AppConstants.RESET,
          					schematronValidation: schematronDefault,
          					schemaValidation: schemaDefault
          				});
  	        }
          };


export default ActionCreator;
