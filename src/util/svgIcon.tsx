"use client";

type SvgIconProps = {
    dictKey: "twitter" | "hamburger" | "moon";
};

type PathStrDict = {
    [K in SvgIconProps["dictKey"]]: string;
};

// ここでの PathStrDict はTypeScriptで定義されたマップ型（またはインデックスシグニチャ）です。これはオブジェクトが特定の形状を持つことを示すために使われます。
// 具体的には、PathStrDict はオブジェクトで、そのキーは SvgIconProps['dictKey'] の型（この場合、 'twitter' | 'hamburger' | 'moon'）を持ち、それぞれのキーの値は文字列であることを示しています。

// [K in SvgIconProps['dictKey']]: string; の部分を解析すると次のようになります：
// K はジェネリック型変数です。この場合、それは SvgIconProps['dictKey'] のすべての可能な値を表しています。具体的には、'twitter'、'hamburger'、'moon' のいずれかです。
// in キーワードはTypeScriptのマップ型（Mapped types）で使われます。これは K のすべての可能な値に対して何かを行います。
// : string は値の型を示しています。つまり、K（'twitter'、'hamburger'、'moon' のいずれか）に対応する値が文字列であることを示しています。

// したがって、この型を用いることで、オブジェクトのキーが 'twitter'、'hamburger'、'moon' のいずれかで、それぞれのキーの値が文字列であることをTypeScriptに伝えています。
// これにより、TypeScriptはコードの正確さを保証し、あなたにエラーを知らせることができます。

const SvgIcon = (props: SvgIconProps) => {
    const { dictKey } = props;
    if (!dictKey) {
        console.warn("SvgIcon: no dictKey error!!");
        return;
    }

    const pathStrDict: PathStrDict = {
        twitter:
            "M54.49 12.3c0-.1-.09-.16-.17-.09-1.57 1.36-5.36 2.46-5.84 2.51a.11.11 0 01-.09 0c-2.78-4.44-9.19-3.24-9.19-3.24C29.78 13.48 30.82 23 31 24c0 .05 0 .09-.09.09-10.48.52-19.63-9.22-20.67-10.37a.11.11 0 00-.17 0A10.57 10.57 0 0012.78 27a.11.11 0 010 .19 12.87 12.87 0 01-4-.77c-.06 0-.13 0-.13.1.14 6.2 6.22 9 7.63 9.59a.1.1 0 010 .19 13.4 13.4 0 01-3.85.27.11.11 0 00-.11.14c1.27 4.78 7.5 6.78 8.62 7.11A.11.11 0 0121 44c-3.85 3.44-11.44 4.35-13 4.51a.11.11 0 00-.06.19c5.82 4 21.06 7.32 32.7-2.63A30.3 30.3 0 0051 21.83a.09.09 0 01.05-.08 14.22 14.22 0 005.06-5.06c0-.1 0-.16-.15-.13a5.63 5.63 0 01-3.15.17s1.71-2.96 1.68-4.43z",
        hamburger: "",
        moon: "",
    };

    // 型 'any' の式を使用して型 '{ twitter: string; hamburger: string; moon: string; }' にインデックスを付けることはできないため、要素は暗黙的に 'any' 型になります。ts(7053)
    const pathStr = pathStrDict?.[dictKey];
    if (!pathStrDict) {
        console.warn("SvgIcon: no pathStr in pathStrDict!!");
        return;
    }

    return (
        <a href="https://twitter.com/ngmtine" target="_blank">
            <svg style={{ display: "inline-block" }} xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 60 60" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d={pathStr} strokeLinecap="round"></path>
            </svg>
        </a>
    );
};

export default SvgIcon;
