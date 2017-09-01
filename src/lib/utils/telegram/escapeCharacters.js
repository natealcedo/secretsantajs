const escapeCharacters = string =>
  string
    .replace("<", "&lt;")
    .replace(">", "&gt;")
    .replace("&", "&amp;")
    .replace("\"", "&quot;");

export default escapeCharacters;
