// src/app/og-image.png/route.tsx
// 使用 Next.js ImageResponse 動態產生 OG 圖片（Edge Runtime）
import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "1200px",
                    height: "630px",
                    background: "#09090b",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "sans-serif",
                    gap: "24px",
                }}
            >
                {/* 背景裝飾 */}
                <div
                    style={{
                        position: "absolute",
                        top: "-100px",
                        left: "-100px",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "-100px",
                        right: "-100px",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)",
                    }}
                />

                {/* 主標題 */}
                <div
                    style={{
                        fontSize: "80px",
                        fontWeight: 700,
                        background: "linear-gradient(90deg, #60a5fa, #c084fc, #f472b6)",
                        backgroundClip: "text",
                        color: "transparent",
                        letterSpacing: "-2px",
                    }}
                >
                    Dev Notes
                </div>

                {/* 副標題 */}
                <div
                    style={{
                        fontSize: "28px",
                        color: "#a3a3a3",
                        textAlign: "center",
                        maxWidth: "700px",
                    }}
                >
                    前端技術筆記 · LeetCode 解題 · TypeScript · React · Three.js
                </div>

                {/* 作者 */}
                <div
                    style={{
                        fontSize: "22px",
                        color: "#525252",
                        marginTop: "12px",
                    }}
                >
                    by Wilson Chen
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}
