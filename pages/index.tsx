import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Date from "../components/date";
import { login } from "../api/user/login";

import { getSortedPostsData } from "../utils/posts";

interface Props {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}

const Home: NextPage<Props> = ({ allPostsData }) => {
  return (
    <Layout home>
      <div>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        <section className="text-xl leading-normal text-center">
          <div onClick={() => login()}>登陆</div>
          <p>你好，我是 pikachu</p>
          <p>一个又菜又爱玩的前端小白，欢迎来到我的博客！</p>
        </section>

        <section className="text-xl leading-normal pt-4">
          <h2 className=" text-2xl my-4 font-bold">Blog</h2>
          <ul>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id} className="mb-5">
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
          <h2 className=" text-2xl my-4 font-bold">小玩意儿</h2>
          <ul>
            <li>
              <Link href="/bauble/Clock">
                <a>时钟</a>
              </Link>
            </li>
            <li>
              <Link href="/bauble/ScratchCard">
                <a>刮刮乐</a>
              </Link>
            </li>
            <li>
            <Link href="/bauble/SearchLight">
                <a>探照灯</a>
              </Link>
            </li>
            <li>
            <Link href="/bauble/Particale">
                <a>图像粒子化</a>
              </Link>
            </li>
          </ul>
          <h2 className=" text-2xl my-4 font-bold">Three</h2>
          <ul>
            <li>
              <Link href="/three/three-hello">
                <a>hello</a>
              </Link>
            </li>
            <li>
              <Link href="/three/3d-text">
                <a>text</a>
              </Link>
            </li>
            <li>
              <Link href="/three/3d-hello">
                <a>3d-hello</a>
              </Link>
            </li>
          
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // 获取文章列表
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};

export default Home;
