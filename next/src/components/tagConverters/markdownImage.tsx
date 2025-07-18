import Image from "next/image";
import type { ImgHTMLAttributes } from "react";

type MarkdownImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const MarkdownImage = (props: MarkdownImageProps) => {
    return (
        <Image //
            src={props.src as string}
            alt={props.alt ?? ""}
            width={0}
            height={0}
            sizes="100vw"
            quality={90}
        />
    );
};

/*

next/imageは奇っ怪すぎ
https://stackoverflow.com/questions/65169431/how-to-set-the-next-image-component-to-100-height
許可ホストをnext.config.tsで指定する必要がある

*/
