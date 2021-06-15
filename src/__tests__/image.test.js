import * as React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { Image } from '../image/image';

const fakeSrc = 'https://image.xyz/source';
const workingSrc = 'https://i.redd.it/baodylyz4f571.jpg';

afterEach(cleanup);

test('render default div', () => {
  render(
    <Image data-testid="color-block" src={fakeSrc} height="200" width="200" />
  );

  expect(screen.getByTestId('color-block')).toHaveAttribute('height', '200');
  expect(screen.getByTestId('color-block')).toHaveAttribute('width', '200');
});

test('custom component load', () => {
  render(
    <Image
      data-testid="color-block"
      src={fakeSrc}
      height="200"
      width="200"
      placeholder={<h1>Not found</h1>}
    />
  );

  expect(screen.getAllByText(/not found/i));
});

test('render with src', () => {
  render(
    <Image
      src={workingSrc}
      data-testid="color-block"
      height="200"
      width="200"
    />
  );

  waitFor(() =>
    expect(screen.getByRole('img')).toHaveAttribute('src', workingSrc)
  );
});

test('render with fallback src', async () => {
  render(
    <Image height="200" width="200" src={src} placeholderSrc={workingSrc} />
  );

  waitFor(() =>
    expect(screen.getByRole('img')).toHaveAttribute('src', workingSrc)
  );
});
