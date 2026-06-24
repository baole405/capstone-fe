import type { CSSProperties } from "react";

const SKEL_BG = "#D5EDEB";

const T = {
  line2: "#E0F0EE",
  panel: "#F3FAFA",
};

function Skel({
  w,
  h,
  br = 8,
  style,
}: {
  w?: string | number;
  h?: number;
  br?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      className="animate-pulse"
      style={{
        width: w ?? "100%",
        height: h,
        borderRadius: br,
        background: SKEL_BG,
        ...style,
      }}
    />
  );
}

export function ProductListSkeleton() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${T.line2}`,
      }}
    >
      <div className="flex">
        {/* Filter rail */}
        <aside
          style={{
            width: 236,
            flexShrink: 0,
            borderRight: `1px solid ${T.line2}`,
            padding: "26px 24px",
            background: T.panel,
          }}
        >
          {/* Search */}
          <Skel h={36} br={10} style={{ marginBottom: 24 }} />
          {/* Category label */}
          <Skel w={70} h={11} br={4} style={{ marginBottom: 14 }} />
          <div className="flex flex-col" style={{ gap: 6, marginBottom: 28 }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <Skel key={i} h={34} br={9} />
            ))}
          </div>
          {/* Concern label */}
          <Skel w={90} h={11} br={4} style={{ marginBottom: 14 }} />
          <div className="flex flex-wrap" style={{ gap: 7 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skel key={i} w={72} h={30} br={999} />
            ))}
          </div>
        </aside>

        {/* Main grid */}
        <main style={{ flex: 1, padding: "26px 30px 36px" }}>
          <Skel w={200} h={26} br={6} style={{ marginBottom: 8 }} />
          <Skel w={130} h={13} br={4} style={{ marginBottom: 22 }} />

          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${T.line2}`,
                  borderRadius: 13,
                  overflow: "hidden",
                }}
              >
                <Skel h={0} br={0} style={{ aspectRatio: "1 / 1" }} />
                <div style={{ padding: "10px 12px 12px" }}>
                  <Skel w={50} h={9} br={4} style={{ marginBottom: 7 }} />
                  <Skel h={14} br={4} style={{ marginBottom: 5 }} />
                  <Skel w="65%" h={12} br={4} style={{ marginBottom: 10 }} />
                  <Skel w={64} h={13} br={4} />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
