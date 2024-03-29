/*
 * @Author: pikachu
 * @Date
 * @LastEditors: pikachu
 * @LastEditTime
 */
import type { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/layout";
import { getPostDataById,getAllPostIds } from "../../utils/posts";
import Head from "next/head";
import Date from "../../components/date";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

import "prismjs/themes/prism-okaidia.min.css";

interface Props {
    postData: {
        title: string;
        date: string;
        content: MDXRemoteProps;
    };
}
export default function Post({ postData }: Props) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <h1 className='text-3xl font-extrabold my-4 tracking-tighter'>
                {postData.title}
            </h1>

            <Date dateString={postData.date} />

            <article className='py-8 prose  prose-h1:mt-8'>
                <MDXRemote {...postData.content} />

            </article>
        </Layout>
    );
}

// getStaticProps和getStaticPaths只在服务器端运行，永远不会在客户端运行
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostDataById(params!.id as string);
    return {
        props: {
            postData,
        },
    };
};

