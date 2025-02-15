export const clearPhoneNumber = (number) => {
  let newNumber = number
    .split('')
    .filter((item) => {
      if (isNumeric(item)) {
        return item;
      }
    })
    .join('');
  if (newNumber.length < 12) {
    newNumber = '998' + newNumber;
  }
  return newNumber;
};

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}


export const clearCardNumber = (number) => {
  const newNumber = number
    .split('')
    .filter((item) => {
      if (isNumeric(item)) {
        return item;
      }
    })
    .join('');
  return newNumber;
};

