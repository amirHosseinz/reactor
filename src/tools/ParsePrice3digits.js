
export function parsePrice3digits(input) {
  var input = parseInt(input);
  input = Math.ceil(input / 1000);
  input = input * 1000;
  input = String(input);
  var res = input.substr(input.length - 3);
  input = input.substring(0, input.length - 3);
  while (input.length > 3) {
    res = input.substr(input.length - 3) + ',' + res;
    input = input.substring(0, input.length - 3);
  }
  res = input + ',' + res;
  return(res);
}
