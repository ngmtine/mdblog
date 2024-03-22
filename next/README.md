metadataについて
Pages Routerでは、ページのタイトルやmetaタグ情報はnext/headのHeadコンポーネントで設定していました。
App Routerでは、metadataオブジェクトをexportすることで設定します。page.jsxもしくはlayout.jsxでexportできます。

---

各ページに共通する部品は、layout.jsxの名前で、レイアウトとして定義することができます。appフォルダ内の各階層に配置可能です。
また、appフォルダ直下では、必ずlayout.jsxを配置する必要があり、htmlタグとbodyタグを記述する必要があります。
Pages Routerにあった\_document.jsや\_app.jsは廃止され、/appフォルダ直下のlayout.jsxがその代わりになります。

layoutは、パラメタとして実際のpage.jsxでexportされるコンポーネントを受け取り、layoutの中で展開してあげる必要があります。childrenがそれです。
また、ルーティングを動的に行う場合等を除き、layoutは他のパラメタを受け取ることが出来ません。

app/
│ layout.jsx
│ page.jsx
│
└─blog/
layout.jsx
page.jsx
ここで、/blogにアクセスした場合、実際には以下のようなイメージでコンポーネントが構築されます。

<app直下のlayout>
<blog直下のlayout>
<blog直下のpage />
</blog直下のlayout>
</app直下のlayout>
前述のとおり、下位階層のlayoutは、上位階層のlayoutにchildrenとして展開されます。

---

pages.jsxが実際に表示されるページです。従来のPages Routerではpagesフォルダ内の.jsxファイルは全てページとして解釈されましたが、App Routerではpage.jsxのみがページとして解釈されます。
記述内容は従来とほとんど変わりません。ページとして表示するコンポーネントをdefault exportすればOKです。

---

[【App Router】Next.js13でURLのクエリパラメーターを取得する方法](https://zenn.dev/igz0/articles/e5f6f08b6cbe1d)
server componentのpage.jsでクエリパラメータを取得するには、propsとしてsearch Paramsを受け取れば良い
https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional

client componentでクエリパラメータを取得するには、以下のようにuseSearchParams();を使用すれば良い

```ts
"use client";
import { useSearchParams } from "next/navigation";
export const Button = () => {
    const searchParams = useSearchParams();
    const myParams = searchParams.myParams
```

ただし、クエリパラメータの状態に応じてコンポーネントを更新することはできないっぽい？
その場合、以下のように親コンポーネントからpropsとして渡すと更新されるっぽい

```ts
type Props = {
    searchParams: {
        [key: string]: string;
    };
};

const Home = ({ searchParams }: Props) => {
    return (
        <Header searchParams={searchParams}/>
    )
```

---

Tailwind CSS でデフォルトで設定されている、幅、高さ、余白などの Spacing 単位は、1 = 0.25rem = 4px です

---

page.js以外でurlクエリパラメータを取得するにはpropsで受け取ればいいっぽい？

---

hoge
