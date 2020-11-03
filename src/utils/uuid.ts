import casual from 'casual-browserify';

export default (context: string = '', length: number = 0) => {
  const id = `${context !== '' ? `${context}_` : ''}${casual.uuid}`.replace(
    /-/g,
    ''
  );
  // if length is set, trim the id
  if (length > 0) {
    return id.substr(0, length);
  }
  return id;
};
