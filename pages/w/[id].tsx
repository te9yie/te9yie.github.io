import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Body from "../../components/Body";
import Markdown from "../../components/Markdown";
import { WikiData, getAllWikiIds, getWikiData } from "../../libs/wiki";

type Props = {
  data: WikiData;
};

const WikiPage: React.FC<Props> = ({ data }) => {
  const RefLinks: React.FC = () => {
    if (data.refLinks.length === 0) return null;
    return (
      <div className="reflinks">
        <h4>ref links:</h4>
        <ul>
          {data.refLinks.map((link) => (
            <li key={link}>
              <Link href={`/w/${link}`}>
                <a>{link}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const Links: React.FC = () => {
    if (data.links.length === 0) return null;
    return (
      <div className="links">
        <h4>links:</h4>
        <ul>
          {data.links.map((link) => (
            <li key={link}>
              <Link href={`/w/${link}`}>
                <a>{link}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <Body title={data.id}>
      <article>
        <Markdown content={data.content} />
      </article>
      <div className="wiki-footer">
        <RefLinks />
        <Links />
      </div>
    </Body>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllWikiIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.id === "string") {
    const data = await getWikiData(params?.id);
    return { props: { data } };
  } else {
    return { props: {} };
  }
};

export default WikiPage;
