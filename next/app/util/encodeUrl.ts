/**
 * 文字列内のスペースをアンダースコアに置換してutf8エンコード
 */
export const encodeUrl = (str: string): string => {
    return encodeURIComponent(str.replace(/\s/g, "_"));
};

/**
 * 文字列内のアンダースコアをスペースに置換してutf8デコード
 */
export const decodeUrl = (str: string): string => {
    return decodeURIComponent(str.replace(/_/g, " "));
};

/*

db上のtitleカラムにスペースが入っていた場合にアンダースコアで代替する
これは単に視認性を良くするため 半角スペースをそのままencodeURIComponentに渡すと %20 になってちょっと見づらい
encodeURIComponent(' ') // '%20'
seo的にはアンダースコアよりハイフンの方がいいらしいけど知らん

ただし、デコードする場合も全てのアンダースコアをスペースに置換するため、
titleカラムにアンダースコアを使用しない事が必要

*/
