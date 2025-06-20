import { FaGithub } from "react-icons/fa";

const url = `https://github.com/${process.env.NEXT_PUBLIC_AUTHOR}`;

export const GithubLinkButton = () => {
    return (
        <a //
            href={url}
            target="_blank"
            rel="noreferrer"
        >
            <FaGithub className="h-10 w-10" />
        </a>
    );
};
