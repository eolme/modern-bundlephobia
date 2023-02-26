import { badge, og } from '#/utils/path';
import { SizeType } from '#/utils/size';

export const images = (...parts: string[]) => {
  const image = og(...parts);

  return (
    <>
      <meta
        property="og:image"
        content={image}
      />
      <meta
        name="image"
        content={image}
      />
      <link
        rel="image_src"
        type="image/png"
        href={image}
      />
      <meta
        property="og:image:type"
        content="image/png"
      />
      <meta
        property="og:image:width"
        content="1074"
      />
      <meta
        property="og:image:height"
        content="480"
      />
      <link
        rel="prefetch"
        href={image}
      />
      <link
        rel="preload"
        crossOrigin="anonymous"
        as="image"
        href={badge(SizeType.INSTALL, ...parts)}
      />
      <link
        rel="preload"
        crossOrigin="anonymous"
        as="image"
        href={badge(SizeType.BROTLI, ...parts)}
      />
      <link
        rel="preload"
        crossOrigin="anonymous"
        as="image"
        href={badge(SizeType.GZIP, ...parts)}
      />
    </>
  );
};
