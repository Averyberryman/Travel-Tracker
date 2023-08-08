
function isValue(value) {
  return value === '' ? false : true;
}

function isNotPastOrPresent(date) {
  const today = new Date().toISOString().slice(0, 10);
  return date > today ? true : false;
}

function isAnInteger(value) {
  const integer = parseInt(value);
  return integer > 0 ? true : false;
}

export { isValue, isNotPastOrPresent, isAnInteger };
