export function englishToPersianDigits (input) {
  if (typeof input !== "undefined") {
    input = input.toString();
    var result = '';
    var diff = 1776 - 48;
    for (var i = 0; i < input.length; i++) {
      if (input.charCodeAt(i) >= 48 && input.charCodeAt(i) <= 57 ) {
        result = result + String.fromCharCode(input.charCodeAt(i) + diff);
      } else {
        result = result + input[i];
      }
    }
    return result;
  }
  return '';
}
