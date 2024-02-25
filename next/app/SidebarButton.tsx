"use client";

import { useRouter } from "next/navigation";

type Props = {
    isOpen?: boolean;
};

// サイドバー開閉トグルボタン
export const SidebarButton = ({ isOpen }: Props) => {
    console.log(`SidebarButton: {isOpen: ${isOpen}}`);

    const router = useRouter();

    const handleSidebarToggle = () => {
        console.log("SidebarButton: handleSidebarToggle");
        router.push("?sidebar", { scroll: false });
    };

    return (
        <>
            <input //
                id="sidebarButton"
                type="checkbox"
                checked={isOpen}
                className="drawer-toggle"
                onChange={() => {}}
            />
            <div className="drawer-content">
                <label //
                    htmlFor="sidebarButton"
                    onClick={handleSidebarToggle}
                    className="btn btn-primary drawer-button"
                >
                    Open drawer
                </label>
            </div>
        </>
    );
};

/*

inputのonChangeについて

まず基本の話で、クリックハンドラをlabel要素に対して付与しているのでinput要素には本来onChange不要
ただし、onChangeを渡さない場合はreactが警告を発生させる（onChange渡さないならばreadonlyにしろって怒られる）
そのため応急処置的に無をする関数を渡している

これに追加で、属性の並び順でonChangeを最後にしないと何故かサイドバー開閉が動作しない
これに関しては完全に謎

*/
