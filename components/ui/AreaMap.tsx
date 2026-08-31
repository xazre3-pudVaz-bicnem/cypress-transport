import { areas } from "@/data/areas";

/**
 * 採用エリアの視覚化。
 *
 * 地名を単に列挙するのではなく、拠点（葛飾区）を中心に
 * 「主要エリア」「周辺エリア」の同心構造で見せる。
 * 外部の地図サービスは読み込まない（表示速度と依存を増やさないため）。
 *
 * ⚠️ ここに出しているのは「応募を受け付けているエリア」であって、
 *    勤務地ではない。勤務地は求人ごとに決まるため、その旨を必ず併記すること。
 */
const PRIMARY = ["三郷市", "松戸市", "江東区"];

export function AreaMap() {
  const nearby = areas
    .filter((a) => a.name !== "葛飾区" && !PRIMARY.includes(a.name))
    .map((a) => a.name);

  return (
    <div className="border border-ink-900/15 bg-white">
      {/* 拠点 */}
      <div className="border-b border-ink-900/15 bg-ink-900 px-6 py-7 text-center text-white md:px-10">
        <p className="stat-label text-accent">拠点</p>
        <p className="mt-2 text-2xl font-bold tracking-tight md:text-[2rem]">
          東京都葛飾区
        </p>
      </div>

      {/* 主要エリア */}
      <div className="border-b border-ink-900/15 px-6 py-7 md:px-10">
        <p className="stat-label text-ink-400">主要エリア</p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {PRIMARY.map((name) => (
            <li
              key={name}
              className="text-lg font-bold tracking-tight text-ink-900 md:text-xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* 周辺エリア */}
      <div className="px-6 py-7 md:px-10">
        <p className="stat-label text-ink-400">周辺エリア</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
          {nearby.map((name) => (
            <li key={name} className="text-sm text-ink-500">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
