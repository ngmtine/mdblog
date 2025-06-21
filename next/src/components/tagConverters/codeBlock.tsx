"use client";

import { useTheme } from "next-themes";
import type { AnchorHTMLAttributes } from "react";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold, coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "~/components/functionalIcons/copyButton";

type CodeBlockProps = AnchorHTMLAttributes<HTMLElement>;

/**
 * markdownのコードブロック描画用コンポーネント
 */
export const CodeBlock = ({ className, children }: CodeBlockProps) => {
    // コンポーネントのマウント完了フラグ 詳細下部
    const [mounted, setMounted] = useState(false);

    // コンポーネントがクライアント側でマウントされたらtrue
    useEffect(() => {
        setMounted(true);
    }, []);

    const { theme } = useTheme();
    const isDark = theme === "dark";

    // 改行を含まないならpreタグで囲まない
    // FIXME: つまり現状は ```コード``` と `単語` を判別できてない 他に良い判定方法は無い？
    const isCodeBlock = String(children)?.match("\n") !== null;
    if (!isCodeBlock) {
        return <code className="bg-iceberg-light-code! dark:bg-iceberg-dark-code!">{children}</code>;
    }

    // コード文の言語（js, python, etc）
    const match = /language-(\w+)/.exec(className || "");
    const lang = match?.[1] ?? "";

    // コード文
    const codeStr = String(children).replace(/\n$/, "");

    return (
        <div className="relative">
            <SyntaxHighlighter //
                style={mounted && isDark ? coldarkDark : coldarkCold}
                language={lang}
                PreTag={CustomPre}
            >
                {codeStr}
            </SyntaxHighlighter>
            <div className="absolute top-1 right-2 p-2 rounded-lg">
                <CopyButton text={codeStr} />
            </div>
        </div>
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


setMountフラグについて
nextはssr時にクライアント側の情報（isDark）を検知することは当然できない
そのためハイドレーション時に、ssrしたhtmlとクライアントが生成する仮想domの間で不一致してエラー起こす
これを回避するため、ハイドレーション完了してクライアント側で完全にマウントされてからスタイルを適用する
こうすればハイドレーションエラーは起きず、モードに沿ったスタイルも適用される

*/
