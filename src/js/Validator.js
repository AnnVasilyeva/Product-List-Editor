export default class Validator {
  isValid(inputs) {
    const notValidEl = [...inputs].find((el) => el.classList.contains('error'));
    if (notValidEl) {
      notValidEl.focus();
      return false;
    }
    return true;
  }

  removeValidation(inputs) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove('error');
    }
  }

  checkFieldsPresence(form, fields) {
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        fields[i].classList.add('error');
      }
    }
  }

  checkPrice(input) {
    if (Number(input.value) <= 0) {
      input.classList.add('error');
      input.focus();
    }
  }

  keyUp(fields) {
    [...fields].forEach((item) => {
      item.addEventListener('keyup', () => {
        item.classList.remove('error');
      });
    });
  }
}
