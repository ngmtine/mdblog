/**
 * 文字列内のスペースをアンダースコアに置換してutf8エンコード
 * @param str - エンコード対象の文字列
 * @param replaceUnderscore - スペースをアンダースコアに置換するかどうか
 * @returns エンコードされ、必要に応じてスペースがアンダースコアに置換された文字列
 */
export const encodeUrl = (str: string, replaceUnderscore = true): string => {
    const replacee = replaceUnderscore ? str.replace(/\s/g, "_") : str;
    return encodeURIComponent(replacee);
};

/**
 * 文字列内のアンダースコアをスペースに置換してutf8デコード
 * @param str - デコード対象のurlエンコードされた文字列
 * @param replaceUnderscore - アンダースコアをスペースに置換するかどうか
 * @returns デコードされ、必要に応じてアンダースコアがスペースに置換された文字列
 */
export const decodeUrl = (str: string, replaceUnderscore = true): string => {
    const replacee = replaceUnderscore ? str.replace(/_/g, " ") : str;
    return decodeURIComponent(replacee);
};

/*

db上のtitleカラムにスペースが入っていた場合にアンダースコアで代替する

これは単に視認性を良くするための対応
（半角スペースをそのままencodeURIComponentに渡すと %20 になってちょっと見づらい）
encodeURIComponent(' ') // '%20'

seo的にはアンダースコアよりハイフンの方がいいらしいけど知らん

ただし、デコードする場合も全てのアンダースコアをスペースに置換するため、
titleカラムにアンダースコアを使用しない事が必要

*/
