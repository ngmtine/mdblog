import { FaTwitter } from "react-icons/fa";

const url = `https://twitter.com/${process.env.NEXT_PUBLIC_AUTHOR}`;

export const TwitterLinkButton = () => {
    return (
        <a //
            href={url}
            target="_blank"
            rel="noreferrer"
        >
            <FaTwitter className="h-10 w-10" />
        </a>
    );
};
