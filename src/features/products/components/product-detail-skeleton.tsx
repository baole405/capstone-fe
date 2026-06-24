import type { CSSProperties } from "react";

const SKEL_BG = "#D5EDEB";

const T = {
  bg: "#F3FAFA",
  line2: "#E0F0EE",
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

export function ProductDetailSkeleton() {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 40px" }}>
      <div
        style={{
          background: T.bg,
          borderRadius: 18,
          overflow: "hidden",
          border: `1px solid ${T.line2}`,
        }}
      >
        {/* Back link */}
        <div style={{ padding: "32px 40px 16px" }}>
          <Skel w={140} h={13} br={4} />
        </div>

        {/* Two-column layout */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            padding: "8px 40px 44px",
          }}
        >
          {/* Image column */}
          <div>
            <Skel
              h={0}
              br={18}
              style={{ aspectRatio: "1 / 1", marginBottom: 14 }}
            />
            <div
              className="grid"
              style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <Skel key={i} h={0} br={12} style={{ aspectRatio: "1 / 1" }} />
              ))}
            </div>
          </div>

          {/* Info column */}
          <div>
            <Skel w={80} h={11} br={4} style={{ marginBottom: 12 }} />
            <Skel h={38} br={6} style={{ marginBottom: 8 }} />
            <Skel w="60%" h={38} br={6} style={{ marginBottom: 20 }} />
            <div
              className="flex items-center"
              style={{ gap: 12, marginBottom: 24 }}
            >
              <Skel w={110} h={28} br={6} />
              <Skel w={120} h={28} br={999} />
            </div>
            <Skel h={14} br={4} style={{ marginBottom: 6 }} />
            <Skel w="80%" h={14} br={4} style={{ marginBottom: 28 }} />
            <Skel w={90} h={11} br={4} style={{ marginBottom: 10 }} />
            <Skel h={14} br={4} style={{ marginBottom: 6 }} />
            <Skel h={14} br={4} style={{ marginBottom: 6 }} />
            <Skel w="75%" h={14} br={4} style={{ marginBottom: 24 }} />
            <Skel h={100} br={15} style={{ marginBottom: 16 }} />
            <Skel h={72} br={15} style={{ marginBottom: 16 }} />
            <Skel h={72} br={15} style={{ marginBottom: 28 }} />
            <div
              className="flex items-center"
              style={{ gap: 14, marginBottom: 14 }}
            >
              <Skel w={70} h={14} br={4} />
              <Skel w={120} h={40} br={11} />
              <Skel w={90} h={14} br={4} />
            </div>
            <div className="flex" style={{ gap: 12, marginBottom: 24 }}>
              <Skel h={52} br={13} style={{ flex: 1 }} />
              <Skel w={170} h={52} br={13} />
            </div>
            <Skel w={100} h={11} br={4} style={{ marginBottom: 14 }} />
            <div className="flex flex-col" style={{ gap: 10 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skel key={i} h={14} br={4} />
              ))}
            </div>
          </div>
        </div>

        {/* Similar products */}
        <div
          style={{
            borderTop: `1px solid ${T.line2}`,
            padding: "34px 40px 44px",
            background: "#fff",
          }}
        >
          <div
            className="flex items-baseline justify-between"
            style={{ marginBottom: 22 }}
          >
            <Skel w={180} h={24} br={6} />
            <Skel w={60} h={12} br={4} />
          </div>
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skel
                  h={0}
                  br={14}
                  style={{ aspectRatio: "1 / 1", marginBottom: 12 }}
                />
                <Skel w={60} h={10} br={4} style={{ marginBottom: 6 }} />
                <Skel h={16} br={4} style={{ marginBottom: 6 }} />
                <Skel w={80} h={14} br={4} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
