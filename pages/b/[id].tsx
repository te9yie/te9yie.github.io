import { GetStaticPaths, GetStaticProps } from "next";
import Body from "../../components/Body";
import Markdown from "../../components/Markdown";
import { BlogData, getAllBlogIds, getBlogData } from "../../libs/blog";

type Props = {
  data: BlogData;
};

const BlogPage: React.FC<Props> = ({ data }) => (
  <Body title={data.id}>
    <article>
      <Markdown content={data.content} />
    </article>
  </Body>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllBlogIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.id === "string") {
    const data = await getBlogData(params?.id);
    return { props: { data } };
  } else {
    return { props: {} };
  }
};

export default BlogPage;
