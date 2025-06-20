"use client";

import { useTheme } from "next-themes";
import type { AnchorHTMLAttributes } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold, coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = AnchorHTMLAttributes<HTMLElement>;

export const CodeBlock = ({ className, children }: CodeBlockProps) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const match = /language-(\w+)/.exec(className || "");
    const lang = match?.[1] ?? "";

    return (
        <SyntaxHighlighter //
            style={isDark ? coldarkDark : coldarkCold}
            language={lang}
            PreTag={CustomPre}
        >
            {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
    );
};

const CustomPre = ({ ...props }: AnchorHTMLAttributes<HTMLPreElement> ) => {
    return (
        <pre
            {...props}
            className="
                border m-0
                bg-iceberg-light-code! dark:bg-iceberg-dark-code!
            "
        />
    );
};

/*

react-syntax-highlighterは、渡されたcodeタグをpreタグでラップしてスタイリングする
そのため、react-markdownのMarkdownコンポーネントのcomponents propsにて、元のpreタグには何もしない（子要素をそのまま返す）事を明示する（article.tsx）

また、ラップされるpreタグに対してスタイリングするには、以下の2つの方法がある
・別途cssファイルでスタイリングする
・PreTag propsに独自のコンポーネントを渡す（今回の手法）

*/
