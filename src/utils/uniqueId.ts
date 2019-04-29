export const generateUniqueId = () => {
  // desired length of Id
  const idStrLen = 32;
  // always start with a letter -- base 36 makes for a nice shortcut
  let idStr = (Math.floor(Math.random() * 25) + 10).toString(36) + '_';
  // add a timestamp in milliseconds (base 36 again) as the base
  idStr += new Date().getTime().toString(36) + '_';
  // similar to above, complete the Id using random, alphanumeric characters
  do {
    idStr += Math.floor(Math.random() * 35).toString(36);
  } while (idStr.length < idStrLen);

  return {
    uniqId: idStr,
    platform: 'web',
  };
};
