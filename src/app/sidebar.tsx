"use client";

import { useState, useEffect } from "react";

const Sidebar = ({ children }) => {
    if (typeof window === "undefined") throw new Error();

    // useStateを用いて、windowSizeという状態を管理しています。このwindowSizeはブラウザのウィンドウのサイズを格納します。初期値は現在のウィンドウサイズ（window.innerWidthとwindow.innerHeight）です。
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // useEffectを使用して、ウィンドウサイズが変更されたときにその値を更新するイベントリスナーを設定しています。具体的には、window.addEventListener("resize", handleResize);によって、resizeイベントが発生したとき（つまりウィンドウがリサイズされたとき）にhandleResize関数を呼び出すようにしています。このhandleResize関数はウィンドウの新しいサイズを取得し、それをwindowSize状態にセットします。

    // useEffectが受け取る第一引数の関数は、Reactコンポーネントが初めてレンダリングされた後、または依存配列に含まれる状態/プロップスが変更された後に呼ばれます。この関数は"副作用関数"とも呼ばれます。
    // 副作用関数内でhandleResize関数を定義しています。この関数はウィンドウの現在のサイズを取得し、setWindowSizeを使ってwindowSize状態を更新します。
    // window.addEventListener("resize", handleResize);は、ウィンドウサイズが変更されたときにhandleResize関数が呼ばれるように設定しています。
    // useEffectの第二引数にあたる配列は、"依存配列"と呼ばれます。ここに指定した値が変更されたときだけ、副作用関数が再実行されます。この配列が空（[]）の場合、副作用関数はコンポーネントの初回レンダリング時にのみ実行されます。上記のコードでは、ウィンドウサイズが変更されるたびにウィンドウサイズを取得する必要があるので、依存配列は空にしています。

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        // コンポーネントのアンマウント時にイベントリスナーをクリーンアップします
        // useEffectのクリーンアップ関数（return文で指定した関数）では、コンポーネントがアンマウントされる際（つまり画面から消える際）にイベントリスナーを削除しています。これは、不要になったイベントリスナーがメモリを消費し続けることを防ぐためです。
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const displayClass = windowSize.width < 768 ? "hidden" : "block";

    return (
        <div className={`w-64 p-4 h-screen overflow-y-scroll overflow-x-hidden pt-20 block ${displayClass}`}>
            <p>ウィンドウの幅: {windowSize.width}px</p>
            <p>ウィンドウの高さ: {windowSize.height}px</p>
            {children}
        </div>
    );
};

export default Sidebar;
