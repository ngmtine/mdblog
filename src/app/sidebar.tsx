"use client";

import { useState, useEffect, ReactNode } from "react";
import SvgHamburgerButton from "@/util/svgHamburgerButton";

interface Props {
    children: ReactNode;
}

const Sidebar = ({ children }: Props) => {
    if (typeof window === "undefined") throw new Error();

    // 現在のウィンドウサイズ
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // 直前のウィンドウサイズ
    const [prevWindowSize, setPrevWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // サイドバーの表示状態を表すブール値
    const [isSidebarHidden, setIsSidebarHidden] = useState(true);

    // サイドバーに付与するtailwindクラス
    const [displayClass, setDisplayClass] = useState("block");

    // リサイズ時に呼ばれるコールバック関数 条件に応じてsetDisplayClassを呼ぶ
    const toggleSidebarStateWithResize = () => {
        setPrevWindowSize({
            width: windowSize.width,
            height: windowSize.height,
        });

        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        const threshold = 768;
        const isWindowExpanding = prevWindowSize.width < threshold && threshold <= windowSize.width;
        const isWindowShrinking = prevWindowSize.width > threshold && threshold >= windowSize.width;

        if (isWindowExpanding) setDisplayClass("block");
        if (isWindowShrinking) setDisplayClass("hidden");

        setIsSidebarHidden(true);
    };

    // クリック時に呼ばれるコールバック関数 条件に応じてsetDisplayClassを呼ぶ
    const toggleSidebarStateWithClick = () => {
        const isNarrow = window.innerWidth < 768;

        if (isNarrow && isSidebarHidden) setDisplayClass("block");
        if (isNarrow && !isSidebarHidden) setDisplayClass("hidden");
        if (!isNarrow && isSidebarHidden) setDisplayClass("hidden");
        if (!isNarrow && !isSidebarHidden) setDisplayClass("block");

        setIsSidebarHidden(!isSidebarHidden);
    };

    // windowSizeを監視し、コンポーネントが再レンダリングされる度にイベントリスナーを再登録する
    useEffect(() => {
        window.addEventListener("resize", toggleSidebarStateWithResize);

        // useEffectのクリーンアップ関数（return文で指定した関数）は、コンポーネントがアンマウントされる際（つまり画面から消える際）にイベントリスナーを削除する
        return () => {
            window.removeEventListener("resize", toggleSidebarStateWithResize);
        };

        // prevWindowSizeが変更されるとき、windowSizeも必ず変更されているため、prevWindowSizeは監視する必要はなく、その警告の抑制
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowSize]);

    return (
        <>
            <div className="absolute ml-3 bottom-3">
                <SvgHamburgerButton callback={toggleSidebarStateWithClick} />
            </div>
            <div className={`w-64 p-4 h-screen overflow-y-scroll overflow-x-hidden pt-20 block ${displayClass}`}>{children}</div>
        </>
    );
};

export default Sidebar;

// useEffect は以下のような引数を持ちます。
// useEffect(callback[, dependencies]);
// 第一引数には副作用の処理を記述するためのコールバック関数を持ち、これはレンダーの結果が画面に反映された後に動作します。
// 第二引数には依存先の変数が格納される配列が渡されます。これによって副作用の処理をどのタイミングで実行するか決めることができます。
// この配列が空（[]）の場合、副作用関数はコンポーネントの初回レンダリング時にのみ実行されます。
// 注）useEffectを使用せず、コンポーネントに直書きすると、レンダリングが発生するたびに直書きした処理が実行される

// useEffectを使用して、ウィンドウサイズが変更されたときにその値を更新するイベントリスナーを設定しています。具体的には、window.addEventListener("resize", toggleSidebarStateWithResize);によって、resizeイベントが発生したとき（つまりウィンドウがリサイズされたとき）にtoggleSidebarStateWithResize関数を呼び出すようにしています。このtoggleSidebarStateWithResize関数はウィンドウの新しいサイズを取得し、それをwindowSize状態にセットします。
