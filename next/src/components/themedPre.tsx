import type { AnchorHTMLAttributes } from "react";

type ThemedPreProps = AnchorHTMLAttributes<HTMLPreElement>;

/**
 * Pre要素（コードブロック）を装飾するためのコンポーネント
 * FIXME: ダサい
 */
export const ThemedPre = ({ children, ...props }: ThemedPreProps) => {
    return (
        <pre
            className="
                border
                text-iceberg-dark dark:text-iceberg-light
                bg-base-100 dark:bg-iceberg-dark"
            {...props}
        >
            {children}
        </pre>
    );
};
