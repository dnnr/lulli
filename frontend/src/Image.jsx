import React from 'react';

export default function Image({image}) {
  const {filename, url, year} = image;
  const title = makeTitle(filename, year);
  return (
    <figure>
      <img src={url} alt={title} title={title} />
      <figcaption>{title}</figcaption>
    </figure>
  );
}

function makeTitle(filename, year) {
  const name = filename.replace(/\.[^.]*$/, '');
  const withSpaces = name.replace(/_/g, ' ');
  return `${withSpaces} (${year})`;
}