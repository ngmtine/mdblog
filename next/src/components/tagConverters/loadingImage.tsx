"use client";

import { useEffect, useRef, useState } from "react";
import { Spinner } from "~/components/spinner";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

// markdown内の画像読み込み中にローディングアニメーションを表示するコンポーネント
export const LoadingImage = ({ src, alt }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const imgRef = useRef<HTMLImageElement>(null);

    // ブラウザのキャッシュから画像が読み込まれた場合はonLoadが発火しないので、代わりにcomplete属性を見る
    useEffect(() => {
        if (imgRef.current?.complete) setIsLoading(false);
    }, []);

    return (
        <>
            {isLoading && <Spinner />}
            <img //
                src={src}
                alt={alt}
                ref={imgRef}
                onLoad={() => setIsLoading(false)}
            />
        </>
    );
};
