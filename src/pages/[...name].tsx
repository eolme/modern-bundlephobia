import type { GetStaticPaths, GetStaticProps } from 'next';

import { calc } from 'src/api/calc';
import { isValidModuleTag } from 'src/utils/module';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.name) {
    return {
      revalidate: false,
      notFound: true
    };
  }

  try {
    const size = await calc(params.name);

    if (size.raw !== size.query) {
      return {
        revalidate: true,
        redirect: {
          statusCode: 302,
          destination: `/${size.query}`
        }
      };
    }

    return {
      revalidate: isValidModuleTag(size.version),
      props: {
        size
      }
    };
  } catch (ex) {
    console.error(ex);

    return {
      revalidate: true,
      notFound: true
    };
  }
};

export { Name as default } from 'src/views';
