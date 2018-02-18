const fs     = require('fs');
const config = require('./config');

module.exports.search = search;

function search(searchTerms) {
  const rootPath = config.getPath();
  const subdirs = getSubdirs(rootPath);

  const dirsWithImages = subdirs.map(dir => ({
    dir,
    images: getMatchingImages(`${rootPath}/${dir}`, searchTerms)
  }));

  return flattenImageResults(dirsWithImages);
}

function getSubdirs(path) {
  return fs.readdirSync(path)
    .filter(filename => fs.statSync(`${path}/${filename}`).isDirectory());
}

function getMatchingImages(path, searchTerms) {
  const filenames = listImageFiles(path);
  return filenames.filter(filename => allTermsMatch(filename, searchTerms));
}

function listImageFiles(path) {
  return fs
    .readdirSync(path)
    .filter(filename => isImage(filename));
}

function isImage(filename) {
  return filename.match(/\.(png|jpe?g|gif)$/);
}

module.exports.allTermsMatch = allTermsMatch;   // for test only

function allTermsMatch(filename, searchTerms) {
  return searchTerms.reduce((doesMatch, term) => (
    doesMatch && matches(filename, term)
  ), true);
}

function matches(filename, term) {
  return !!filename.match(new RegExp(term, "ig"));
}

function flattenImageResults(dirsWithImages) {
  return dirsWithImages.reduce((acc, cur) => {
    cur.images.forEach(image => acc.push(`${cur.dir}/${image}`));
    return acc;
  }, []);
}
