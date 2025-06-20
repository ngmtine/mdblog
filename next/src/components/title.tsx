import Link from "next/link";

/**
 * ブログタイトルボタン
 */
export const Title = () => (
    <Link //
        id="title"
        href="/"
        className="btn btn-ghost font-extrabold text-xl p-3"
    >
        {process.env.NEXT_PUBLIC_BLOG_NAME}
    </Link>
);
