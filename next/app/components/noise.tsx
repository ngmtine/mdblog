const filterDefId = "noise-filter-definition";

export const Noise = () => (
    <>
        <svg //
            aria-hidden="true" // svg自体は非表示
            focusable="false"
        >
            <filter id={filterDefId}>
                {/* フィルター定義 */}
                <feTurbulence //
                    type="fractalNoise"
                    baseFrequency="0.55" // ノイズの基本周波数 値を小さくすると粒子が粗くなる
                    numOctaves="3" // ノイズの複雑さ（何層にも重ねるか）
                    stitchTiles="stitch" // ノイズのパターンをタイル状に繰り返す際に、継ぎ目を滑らかにする
                />
                {/* 彩度調整 */}
                <feColorMatrix //
                    type="saturate"
                    values="0" // 彩度0（グレースケール）
                />
                {/* コントラスト, 明るさ調整 */}
                <feComponentTransfer>
                    <feFuncR type="linear" slope="2" intercept="-1" />
                    <feFuncG type="linear" slope="2" intercept="-1" />
                    <feFuncB type="linear" slope="2" intercept="-1" />
                    <feFuncA type="identity" />
                </feComponentTransfer>
            </filter>
        </svg>
        {/* ノイズ要素 */}
        <div //
            id="noise-filter"
            className="absolute inset-0 z-50 w-full h-full pointer-events-none opacity-10"
            style={{ filter: `url(#${filterDefId})` }}
        />
    </>
);

/*
FIXME: ノイズ要素のダークモード対応
ノイズ要素のdivのclassNameに、dark:opaciti-20 みたいなダークモード対応しても、ダークモード切り替えしてもブラウザ更新するまで反映されない
おそらくNoiseコンポーネントはサーバーコンポーネントなのでクライアント側の更新を知る手段が無いため？
*/
