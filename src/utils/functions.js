import Chip from '../themes/overrides/Chip';


export function formatPrice(number) {
  if (number)
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return 0;
}

export const hideCardNumber = (number) => {
  if (number) {

    let newNumber = number.split('');
    const hidden = newNumber.map((item, index) => {

      if (index > 3 && index < 12) {
        return '*';
      }
      return item;
    });

    return hidden.join('');
  }
  return null;
};

export const setUpDate = (date) => {
  if (date) {

    const time = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }
  return null;
};

export const setDateTomorrow = (date) => {
  let currentDate = new Date();
  let day = currentDate.getDate() + 1;
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  return `${year}-${month}-${day}`;
};

// export const statusCustomer = (id, status) => {
//
//   switch (id) {
//     case 1:
//       return <Chip color="info" label={status} size="small" variant="light" />;
//     case 2:
//       return 'asd';
//
//     default:
//       return <Chip color="info" label={status} size="small" variant="light" />;
//
//   }
// };

export const generateFilterLink = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value)
      params.set(key, value);
  });
  return params.toString();
};