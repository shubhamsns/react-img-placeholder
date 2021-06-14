# Dependencies

There are no external dependencies, aside for a version of react and react-dom which support hooks.

# Getting Started

To include the code locally in ES6, CommonJS, or UMD format, install react-image using npm:

```
npm i react-img-placeholder
```

## Import

```
import { Image, useImage } from 'react-img-placeholder'
```

# Documentation

you can use the `Image` component or create your own custom component with `useImage()` hook.

## Image Component

### Default Placeholder Support

- Every image would show a default placeholder when you use `Image` component.
- current default placeholder is `block of solid color` , color can be changed using prop

Example usage

```js
import { Image } from 'react-img-placeholder';

function LoadImage() {
  return (
    <Image
      src="/me.png"
      alt="Picture of the author"
      width={500}
      height={500}
      placeholderColor="pink" // <- this field is optional
    />
  );
}
```

# Required Props

The `<Image />` component requires the following properties.

## src

The path or URL to the source image. This is required.

## width

The width of the image, in pixels. Must be an integer without a unit.

## height

The height of the image, in pixels. Must be an integer without a unit.

<br>

# Optional Props

## placeholder

Takes a React Element which you want to show when image is loading or if `src` fails

- type: `React.ReactElement`

```js
function LoadImage() {
  return (
    <Image
      src="big-size-image.jpg"
      alt="big size"
      height="500"
      width="500"
      placeholder={<Loader />}
    />
  );
}
```

<br>

## placeholderSrc

Placeholder image to show when main src image is loading or it fails

> Note : you can use other image urls but use local images if possible

```js
import logo from './logo.svg';

function LoadImage() {
  return (
    <Image
      src="/big-size-image.jpg"
      height={200}
      width={200}
      alt="big size logo"
      placeholderSrc={logo}
    />
  );
}
```

<br>

## placeholderColor

pass a valid color value when using default placeholder to change the color of loading div

```js
function LoadImage() {
  return (
    <Image
      src="/big-size-image.jpg"
      height={200}
      width={200}
      alt="big size logo"
      placeholderColor="#FFA7C4"
    />
  );
}
```

<br>

## ignorePlaceholder

if true component ignores placeholder logic and shows `img`.

- default: `false`
- type: Boolean

```js
import logo from './logo.svg';

function LoadImage() {
  return (
    <Image
      src="/big-size-image.jpg"
      ignorePlaceholder={true}
      placeholderSrc={logo} // <- this will be ignored
    />
  );
}
```

<br>

# Advanced Props

## loading

type: _eager_ | _lazy_

if loading is passed then `<Image />` component ignores all placeholder.

## onLoad

A callback for when the image `src` has been loaded.

- type: `Function`

<br>

## onError

A callback for when there was an error loading the image `src`.

- type: `Function`

> ### All img attributes like srcSet, sizes, crossOrigin are supported

<br>

## useImage() :

The useImage hook allows users to get `react-image-placeholder` logic in any image component. this hooks returns loading status for source which is passed.

### useImage api:

takes object as argument with

- src (required): source of image for which you want loading states, if src is not passed it would return`pending`.
- ignorePlaceholder (optional): `Boolean`. if true ignores placeholder logic and always returns 'loaded' status.

### returns:

object with following properties

- `status: String` :<br>
  Will be <br>
  `idle` fetching is yet to start
  `loading` if imaged is being loaded<br>
  `failed` if image loading fails<br>
  `loaded` if successfully loads image<br>

- derived booolean from status variable
  `isError`,
  `isIdle`,
  `isLoading`,
  `isLoaded`,

Example usage of hook:

```js
import { useImage } from 'react-img-placeholder';

function CustomImage() {
  const { isLoaded, isError, isLoading, isIdle, status } = useImage({
    src: 'https://via.placeholder.com/600/92c952',
  });

  if (isError) return <p>Image not found</p>;

  if (!isLoaded) return <Loader />;

  return <img src="https://via.placeholder.com/600/92c952" />;
}
```

# Acknowedgement

This component is inspired by lot of libraries like react-image, next/image, @chakra-ui/image.
