import React from "react";

import { Sidebar } from "@/app/component/Sidebar";

import { ToggleSidebarButton } from "./component/ToggleSidebarButton";
import { Header } from "./Header";
import { MainContents } from "./MainContents";

const Home = () => {
    return (
        <>
            <Header />
            <Sidebar />
            <ToggleSidebarButton />
            <div className="container mx-auto px-5 lg:pl-80">
                <div className="pt-16">
                    <MainContents />
                </div>
            </div>
        </>
    );
};

export default Home;

/*

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

*/
