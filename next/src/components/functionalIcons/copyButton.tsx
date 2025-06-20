"use client";

import { useState } from "react";
import { FaClipboard } from "react-icons/fa";

interface Props {
    text: string;
}

/**
 * コードブロック右上に表示する、クリップボードコピーボタン
 */
export const CopyButton = ({ text }: Props) => {
    const [isCopied, setIsCopied] = useState(false);

    /**
     * クリップボードにコードをコピーする関数
     */
    const handleCopy = async () => {
        if (isCopied) return;
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        } catch (error) {
            console.error("クリップボードへのコピーに失敗しました", error);
            setIsCopied(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center">
            {/* ツールチップ */}
            {isCopied && (
                <div
                    className="
                        absolute bottom-full mb-1 px-3 py-1.5
                        rounded-md text-sm font-semibold whitespace-nowrap
                        bg-gray-800 text-gray-200
                        dark:bg-gray-200 dark:text-gray-800
                    "
                >
                    copied❣
                </div>
            )}

            {/* ボタン */}
            <button //
                type="button"
                onClick={handleCopy}
                className="cursor-pointer"
                aria-label="クリップボードにコピー"
            >
                <FaClipboard className="h-5 w-5" />
            </button>
        </div>
    );
};
