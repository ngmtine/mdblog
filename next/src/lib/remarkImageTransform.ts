import type { Root } from "mdast";
import { visit } from "unist-util-visit";

// markdown内の画像パスをsupabaseのurlに変換
export const remarkImageTransform = () => {
    return (tree: Root) => {
        visit(tree, "image", (node) => {
            if (node.url.startsWith("/images/")) {
                node.url = `${process.env.STORAGE_URL}/${node.url.replace("/images/", "")}`;
            }
        });
    };
};
