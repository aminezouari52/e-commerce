const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddressInput(data) {
  let errors = {};

  // data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  // data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.postalCode = !isEmpty(data.postalCode) ? data.postalCode : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  // data.addressType = !isEmpty(data.addressType) ? data.addressType : "";

  // if (Validator.isEmpty(data.firstname)) {
  //     errors.firstname = "Le prénom est requis";
  // }

  // if (Validator.isEmpty(data.lastname)) {
  //     errors.lastname = "Le nom est requis";
  // }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Le numéro de téléphone est requis";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "L'adresse est requise";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "La ville est requise";
  }

  if (Validator.isEmpty(data.postalCode)) {
    errors.postalCode = "Le code postal est requis";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Le pays est requis";
  }

  // if (type === 'create') {
  //     if (Validator.isEmpty(data.addressType)) {
  //         errors.addressType = "Le type d'adresse est requis";
  //     } else if (!['livraison', 'facturation'].includes(data.addressType)) {
  //         errors.addressType = "Le type d'adresse doit être 'livraison' ou 'facturation'";
  //     }
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
