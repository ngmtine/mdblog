import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { encodeUrl } from "~/lib/encodeUrl";

interface PostLink {
    title: string;
}

interface Props {
    prevPost?: PostLink;
    nextPost?: PostLink;
}

/**
 * 画面下部に表示する、次のページ/前のページ用リンクコンポーネント
 */
export const PrevNextPostLink = ({ prevPost, nextPost }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            {prevPost ? (
                <Link //
                    href={`/post/${encodeUrl(prevPost.title)}`}
                    className="justify-self-start flex items-center gap-2 hover:underline"
                >
                    <FaArrowLeft />
                    <span className="truncate max-w-[80vw]">{prevPost.title}</span>
                </Link>
            ) : undefined}
            {nextPost ? (
                <Link //
                    href={`/post/${encodeUrl(nextPost.title)}`}
                    className="justify-self-end flex items-center gap-2 hover:underline text-right"
                >
                    <span className="truncate max-w-[80vw]">{nextPost.title}</span>
                    <FaArrowRight />
                </Link>
            ) : undefined}
        </div>
    );
};
