import { NextResponse } from "next/server";

// URL Google Apps Script Web App (kết thúc bằng /exec)
const APPS_SCRIPT_URL =
  process.env.APPS_SCRIPT_WISHLIST_URL ||
  "https://script.google.com/macros/s/AKfycbzAVcqcKztK_RPpcaA44Ox-gK65QEGiLjqgoigg9Sko2z8bX1W8qGhZHzHWVMP4Cm1e/exec";

export async function GET() {
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      cache: "no-store",
      redirect: "follow",
    });

    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      // Nếu Google Apps Script trả về HTML thay vì JSON (thường là trang báo lỗi cú pháp/runtime của Google)
      console.error("Apps Script returned non-JSON response:", text);

      // Thử bóc tách lỗi chi tiết từ HTML của Google Apps Script
      const match =
        text.match(/style=\"[^\"]*font-family:monospace[^\"]*\"[^>]*>([\s\S]*?)<\/div>/i) ||
        text.match(/class=\"errorMessage\"[^>]*>([\s\S]*?)<\/div>/i) ||
        text.match(/Lỗi\s+([^<]+)/i);
      const scriptError = match ? match[1].replace(/<[^>]+>/g, "").trim() : "Apps Script returned HTML error page";

      return NextResponse.json(
        { error: "Lỗi trong Google Apps Script", details: scriptError },
        { status: 502 }
      );
    }
  } catch (error: any) {
    console.error("Error fetching wishlist from Apps Script:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist", details: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (data.status === "error" || data.error) {
        return NextResponse.json(data, { status: 500 });
      }
      return NextResponse.json(data);
    } catch {
      console.error("Apps Script returned error HTML on POST:", text);
      const match =
        text.match(/style=\"[^\"]*font-family:monospace[^\"]*\"[^>]*>([\s\S]*?)<\/div>/i) ||
        text.match(/class=\"errorMessage\"[^>]*>([\s\S]*?)<\/div>/i) ||
        text.match(/Lỗi\s+([^<]+)/i);
      const scriptError = match ? match[1].replace(/<[^>]+>/g, "").trim() : "Apps Script error";

      return NextResponse.json(
        { error: "Lỗi trong Google Apps Script", details: scriptError },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error updating wishlist in Apps Script:", error);
    return NextResponse.json(
      { error: "Failed to update wishlist", details: error?.message },
      { status: 500 }
    );
  }
}
