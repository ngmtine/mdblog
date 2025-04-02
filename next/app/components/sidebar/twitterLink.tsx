import { Twitter } from "~/app/components/svg/twitter";

const url = `https://twitter.com/${process.env.NEXT_PUBLIC_AUTHOR}`;

export const TwitterLink = () => {
    return (
        <a id="twitterLink" href={url} target="_blank" rel="noreferrer">
            <Twitter />
        </a>
    );
};
