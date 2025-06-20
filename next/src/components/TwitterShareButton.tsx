import { FaTwitter } from "react-icons/fa6";

interface Props {
    url: string;
    text?: string;
    hashtags?: string[];
}

export const TwitterShareButton = ({ url, text = "", hashtags = [] }: Props) => {
    const shareUrl = new URL("https://twitter.com/intent/tweet");
    shareUrl.searchParams.set("url", url);
    if (text) shareUrl.searchParams.set("text", text);
    if (hashtags.length > 0) shareUrl.searchParams.set("hashtags", hashtags.join(","));

    return (
        <a //
            href={shareUrl.toString()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
            className="inline-flex w-fit items-center"
        >
            <FaTwitter className="h-10 w-10" />
        </a>
    );
};
