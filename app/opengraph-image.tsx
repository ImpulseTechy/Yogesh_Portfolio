import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yogesh Bawane — Robotics Engineer & Hardware Educator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0A0C10 0%, #0F1218 60%, #13171F 100%)",
          color: "#F2F0E8",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#85B7EB",
            fontSize: "22px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              background: "#378ADD",
            }}
          />
          yogeshbawane.in
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Yogesh Bawane
          </div>
          <div
            style={{
              fontSize: "44px",
              fontWeight: 500,
              lineHeight: 1.15,
              color: "#F2F0E8",
            }}
          >
            Robotics Engineer
          </div>
          <div
            style={{
              fontSize: "44px",
              fontWeight: 500,
              lineHeight: 1.15,
              color: "#378ADD",
            }}
          >
            &amp; Hardware Educator
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "14px",
            fontSize: "20px",
            color: "#888780",
          }}
        >
          <div
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "1px solid rgba(55,138,221,0.35)",
              background: "rgba(55,138,221,0.12)",
              color: "#85B7EB",
            }}
          >
            VLSI · BITS Pilani
          </div>
          <div
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "1px solid rgba(29,158,117,0.35)",
              background: "rgba(29,158,117,0.12)",
              color: "#5DCAA5",
            }}
          >
            Robotics · NST Pune
          </div>
          <div
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "1px solid rgba(186,117,23,0.35)",
              background: "rgba(186,117,23,0.12)",
              color: "#FAC775",
            }}
          >
            ImpulseTech · 5.1K subs
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
