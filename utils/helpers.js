/* Gets the nested array of errors by the name path */
export const getErrorsByPath = (errors, name) => {
  const parts = name.split(".");
  let result = errors;
  for (const part of parts) {
    if (!result) return;
    result = result[part];
  }
  return result;
};
