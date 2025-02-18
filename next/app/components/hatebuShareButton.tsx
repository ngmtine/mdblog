"use client";

import type { MouseEvent } from "react";
import { encodeUrl } from "../util/encodeUrl";
import { Hatebu } from "./svg/hatebu";

interface Props {
    url: string;
}

export const HatebuShareButton = ({ url }: Props) => {
    const shareUrl = `https://b.hatena.ne.jp/entry/${encodeUrl(url)}`;

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        window.open(shareUrl, "hatena-share", "noopener,noreferrer");
    };

    return (
        <a //
            href={shareUrl.toString()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hatena Bookmark"
            className="inline-flex w-fit items-center"
            onClick={handleClick}
        >
            <Hatebu />
        </a>
    );
};

/*

公式の案内
https://b.hatena.ne.jp/guide/bbutton
の通りに実装すると、ボタンデザインが強制される
そのため、クライアントコンポーネントに変更して、
onClickで共有リンクに直接遷移する方針

*/
