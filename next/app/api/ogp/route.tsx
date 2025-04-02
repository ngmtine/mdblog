import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";
import { decodeUrl } from "~/app/util/encodeUrl";

const username = process.env.AUTHOR;

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    let title = searchParams.get("title") || "ナイスなタイトルが無いっす";
    title = decodeUrl(title);

    // 各種リソースのurlを取得
    const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
    const fontUrl = new URL("/notosans_subset.ttf", baseUrl).href;
    const bgImageUrl = new URL("/ogp_background.png", baseUrl).href;
    const iconUrl = new URL("/twitter_icon.png", baseUrl).href;

    const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                color: "#e8e9ec",
                textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: "cover",
            }}
        >
            {/* 記事タイトル */}
            <h1
                style={{
                    fontSize: 80,
                    textAlign: "center",
                    maxWidth: "85%",
                }}
            >
                {title}
            </h1>

            {/* アイコンとユーザー名 */}
            <div
                style={{
                    position: "absolute",
                    bottom: 50,
                    left: 900,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <img //
                    src={iconUrl}
                    alt="user"
                    width="80"
                    height="80"
                    style={{ borderRadius: "50%", marginRight: 15 }}
                />
                <div style={{ display: "flex" }}>
                    <p style={{ fontSize: 30, display: "flex" }}>{username}</p>
                </div>
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "WebSubsetFont",
                    data: fontData,
                    style: "normal",
                },
            ],
        },
    );
};

export const runtime = "edge";
