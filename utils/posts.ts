import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseISO } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";
import prism from "remark-prism";
import externalLinks from "remark-external-links";
import MarkdownNavbar from 'markdown-navbar';
interface MatterMark {
  data: {
    date: string;
    title: string;
  };
  content: string;
  [key: string]: unknown;
}
// 获取 markdown目录 路径
const postsDirectory = path.join(process.cwd(), "posts");

// 获取 markdown 目录下的文件名 (带后缀)
const fileNames = fs.readdirSync(postsDirectory);

// 获取所有文章用于展示首页列表的数据
export const getSortedPostsData = () => {
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as MatterMark["data"]),
    };
  });
  //   文章按照时间从近到远排序
  return allPostsData.sort(({ date: a }, { date: b }) => {
    // parseISO 字符串转 日期
    return parseISO(a) < parseISO(b) ? 1 : -1;
  });
};

// 获取格式化后所有的文章id(文件名)

export const getAllPostIds = () => {
  // 这是返回的格式:
  // [
  //   {
  //     params: {
  //       id: '......'
  //     }
  //   },
  //   {
  //     params: {
  //       id: '......'
  //     }
  //   }
  // ]
  return fileNames.map((fileNmae) => {
    return {
      params: {
        id: fileNmae.replace(/\.md$/, ""),
      },
    };
  });
};

// 获取指定文章内容

export const getPostDataById = async (id: string) => {
  // 获取文章路径
  const fullPath = path.join(postsDirectory, `${id}.md`);
  // 读取文章内容
  const fullContent = fs.readFileSync(fullPath, "utf-8");

  // 使用matter解析markdown元数据和内容
  const matterResult = matter(fullContent);
  console.log(matterResult);
  

  return {
    content: await serialize(matterResult.content, {
      mdxOptions: {
        remarkPlugins: [prism, externalLinks],
      },
    }),
    ...(matterResult.data as MatterMark["data"]),
  };
};

