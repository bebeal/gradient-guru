import { getContent } from '@/utils';
import { MDXLayout } from '@/components';

export const generateMetadata = async ({
  params,
}: any): Promise<any | undefined> => {
  const page = getContent().find((post) => post.slug === params.slug);
  if (!page) {
    console.error(`No content found for slug: ${params.slug}`);
    return;
  }
  const {
    date,
    title,
    author,
  } = page.frontMatter;
  return {
    date,
    title,
    author,
  };
};

const MDXContentPage = ({ params }: any) => {
  const page = getContent().find((post) => post.slug === params.slug);
  return <MDXLayout {...page} />
}

export default MDXContentPage;
