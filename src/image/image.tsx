import React from 'react';
import { forwardRef } from 'react';
import { useImage } from './use-image';

function getInt(x) {
  if (typeof x === 'number') {
    return x;
  }
  if (typeof x === 'string') {
    return parseInt(x, 10); // returns NaN if string does not starts with number
  }
  return undefined;
}

/**
 * React Component for images which shows
 * placeholder while image is loading
 */
const Image = forwardRef((props, ref) => {
  const {
    placeholderSrc,
    placeholder,
    placeholderColor = 'gray',
    ignorePlaceholder = false,

    src,
    loading,
    height,
    width,
    ...rest
  }: any = props;

  const intWidth = getInt(width);
  const intHeight = getInt(height);

  const shared = { ref, width, height, ...rest };

  // if loading (`lazy` | `eager`) is provided ignore adding placeholder
  const shouldIgnore = loading || ignorePlaceholder;

  const { isLoaded } = useImage({
    ...props,
    ignorePlaceholder: shouldIgnore,
  });

  if (process.env.NODE_ENV !== 'production') {
    // throw error if src is not provided
    if (!src) {
      throw new Error(
        `Image is missing required "src" property. Make sure you pass "src" in props to the \`react-image-placeholder\` component.`
      );
    }

    if (!intHeight || !intWidth) {
      throw new Error(
        `Image with src "${src}" must use unitless "width" and "height" properties.`
      );
    }
  }

  // conditions for: `src` loading and if `src` fails
  if (!isLoaded) {
    if (placeholderSrc) return <img src={placeholderSrc} {...shared} />;

    // react element
    if (placeholder) {
      return placeholder;
    }

    // default placeholder if source and element is not provided
    return (
      <div
        style={{
          background: placeholderColor,
          height: `${intHeight}px`,
          width: `${intWidth}px`,
        }}
      ></div>
    );
  }

  // shows up after loading of `src`
  return <img src={src} {...shared} />;
});

export { Image };
