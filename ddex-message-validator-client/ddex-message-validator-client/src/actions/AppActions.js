import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import API from '../utils/API';

var ActionCreator = {
	validate: function (formData) {
		API
		.validate(formData)
			.then(function (validation) {
				AppDispatcher.dispatch({
					actionType: AppConstants.VALIDATE_XML,
					validation: validation
				});
			});
	}
};


export default ActionCreator;
