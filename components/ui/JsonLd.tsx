/**
 * JSON-LD を安全に埋め込む共通コンポーネント。
 * `<` をエスケープして script 内容からのXSSを防ぐ。
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
