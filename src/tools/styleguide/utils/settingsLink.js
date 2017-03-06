/**
 * CreateSettingsLink for sharing
 * @param  {Object} props
 * @return {String}
 */
export function createSettingsLink(props) {
  const jsonProps = JSON.stringify(props);
  return `${location.origin}?props=${encodeURIComponent(jsonProps)}${location.hash.replace(/(\?.*)/, '')}`;
}

/**
 * Get query variable from search string
 * @param  {[type]} variable [description]
 * @return {[type]}          [description]
 */
export function getQueryVariable(variable) {
  const query = location.search.substring(1);
  const vars = query.split('&');
  let find;
  vars.forEach((item) => {
    const pair = item.split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      find = decodeURIComponent(pair[1]);
    }
  });
  return find || String();
}
