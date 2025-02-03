// 画像ロード中に代替表示するローディングアニメーション
export const Spinner = () => (
    <span className="block relative w-[200px] h-[200px]">
        {/* スピナー背景 */}
        <span className="absolute inset-0 bg-iceberg-dark dark:bg-iceberg-light opacity-5" />

        {/* スピナー本体 */}
        <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </span>
    </span>
);
