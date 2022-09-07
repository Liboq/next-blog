import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
const name = "pikachu"; // 名称，根据需要修改
export const siteTitle = "piakchu Blog"; // 网站标题，根据需要修改

interface Props {
    children: React.ReactNode;
    home?: boolean;
}

export default function Layout({ children, home }: Props) {
    return (
        <div className='max-w-2xl mx-auto px-4 mt-12 mb-24'>
            <Head>
                <link rel='icon' href='/favicon.ico' />
                <meta name='description' content='pikachu的博客' />
                <meta
                    property='og:image'
                />
                <meta name='og:title' content={siteTitle} />
                <meta name='twitter:card' content='summary_large_image' />
            </Head>
            <header className='flex flex-col items-center'>
                {home ? (
                    <>
                        <Image
                            priority
                            src='/images/pikachu.jpeg'
                            className='rounded-full'
                            height={144}
                            width={144}
                            alt={name}
                        />
                        <h1 className='text-5xl font-extrabold tracking-tighter my-4'>
                            {name}
                        </h1>
                    </>
                ) : (
                    <div className="">
                        <Link href='/'>
                            <a>
                                <Image
                                    priority
                                    src='/images/pikachu.jpeg'
                                    className='rounded-full'
                                    height={108}
                                    width={108}
                                    alt={name}
                                />
                            </a>
                        </Link>
                        <h2 className='text-2xl my-4'>
                            <Link href='/'>
                                <a>{name}</a>
                            </Link>
                        </h2>
                    </div>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className='mt-12'>
                    <Link href='/'>
                        <a>← 返回首页</a>
                    </Link>
                </div>
            )}
        </div>
    );
}
