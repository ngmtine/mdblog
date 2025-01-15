// FIXME: windowオブジェクトはuseEfect外では使用しない
// https://dev-k.hatenablog.com/entry/how-to-access-the-window-object-in-nextjs-dev-k
// ただしこのように関数化してる場合は大丈夫っぽい
// というのはv14の話、v15はそのうち検証する
export const checkIsWide = () => {
    const threshold = 1024; // Tailwind の `lg` に相当
    return window.innerWidth >= threshold;
};
