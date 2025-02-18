import type { AnchorHTMLAttributes } from "react";

type MarkdownLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

// markdown内のリンクを別タブで開くaタグに変換するコンポーネント
export const MarkdownLink = ({ children, ...props }: MarkdownLinkProps) => {
    return (
        <a target="_blank" rel="noopener noreferrer" {...props}>
            {children}
        </a>
    );
};
