/**
 * Upper case first character
 * @param  {String} string
 * @return {String}
 */
export default function upperFirst(string) {
  return string[0].toUpperCase() + string.substring(1);
}
