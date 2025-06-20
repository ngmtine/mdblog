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

    // PreTagに渡すコンポーネントに追加propsを渡すコンポーネント
    // biome-ignore lint: nursery/noNestedComponentDefinitions isDarkを参照するためにコンポーネント内定義
    const PreWithTheme = (props: AnchorHTMLAttributes<HTMLPreElement>) => (
        <CustomPre //
            {...props}
            isDark={isDark}
        />
    );

    return (
        <SyntaxHighlighter //
            style={isDark ? coldarkDark : coldarkCold}
            language={lang}
            PreTag={PreWithTheme}
        >
            {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
    );
};

// CustomPreに渡すPropsの型
interface CustomPreProps extends AnchorHTMLAttributes<HTMLPreElement> {
    isDark?: boolean;
}

const CustomPre = ({ isDark, ...props }: CustomPreProps) => {
    return (
        <pre
            {...props}
            className="
                border m-0 backdrop-blur-sm
                bg-iceberg-light/50 dark:bg-iceberg-dark/50
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
