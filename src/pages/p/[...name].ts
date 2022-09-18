import type { GetStaticPaths, GetStaticProps } from 'next';

import { calcInfo, calcSize } from 'src/api/calc';
import { loadInfo } from 'src/api/info';

import { ModuleError, ModuleErrorType } from 'src/module/error';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || !params.name) {
      throw new ModuleError(ModuleErrorType.REQUEST, params?.name as string, 400);
    }

    const info = await calcInfo(params.name);

    if (info.version !== info.loaded.version) {
      return {
        revalidate: true,
        redirect: {
          statusCode: 302,
          destination: `/p/${info.name}@${info.loaded.version}`
        }
      };
    }

    const [size, pkg] = await Promise.all([
      calcSize(info),
      loadInfo(info.name, info.loaded.version)
    ]);

    return {
      revalidate: false,
      props: {
        size,
        pkg
      }
    };
  } catch (ex: unknown) {
    console.error(ex);

    return {
      revalidate: true,
      redirect: {
        statusCode: 303,
        destination: '/'
      }
    };
  }
};

export { Name as default } from 'src/views';
