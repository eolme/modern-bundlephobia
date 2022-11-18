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
        type="image/jpeg"
        href={image}
      />
      <meta
        property="og:image:type"
        content="image/jpeg"
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
        rel="preload"
        as="image"
        href={image}
      />
      <link
        rel="preload"
        as="image"
        href={badge(SizeType.INSTALL, ...parts)}
      />
      <link
        rel="preload"
        as="image"
        href={badge(SizeType.BROTLI, ...parts)}
      />
      <link
        rel="preload"
        as="image"
        href={badge(SizeType.GZIP, ...parts)}
      />
    </>
  );
};
