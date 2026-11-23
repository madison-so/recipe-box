import React from 'react';
/** Render a trusted, pre-escaped HTML string (our own SVG drawings and formatted recipe text). */
export default function Html({ as: Tag = 'span', html, ...rest }) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
}
