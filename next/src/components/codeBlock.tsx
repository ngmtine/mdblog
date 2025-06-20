"use client";

import { useTheme } from "next-themes";
import type { AnchorHTMLAttributes } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold, coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = AnchorHTMLAttributes<HTMLElement>;

/**
 * markdownのコードブロック描画用コンポーネント
 */
export const CodeBlock = ({ className, children }: CodeBlockProps) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // 改行を含まないならpreタグで囲まない
    // FIXME: つまり現状は ```コード``` と `単語` を判別できてない 他に良い判定方法は無い？
    const isCodeBlock = String(children)?.match("\n") !== null;
    if (!isCodeBlock) {
        return <code>{children}</code>;
    }

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

/**
 * react-syntax-highlighterによって付与されるスタイルを上書きするためのコンポーネント
 */
const CustomPre = ({ ...props }: AnchorHTMLAttributes<HTMLPreElement>) => {
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
