import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { calc } from 'src/api/calc';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.name) {
    return {
      notFound: true
    };
  }

  try {
    const size = await calc(params.name);

    return {
      revalidate: size.name !== size.query,
      props: {
        size
      }
    };
  } catch (ex) {
    console.error(ex);

    return {
      notFound: true
    };
  }
};

export { Name as default } from 'src/views';
