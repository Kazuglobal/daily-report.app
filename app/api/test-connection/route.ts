import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    // チケット申し込みテーブルの件数を取得してテスト
    const { count, error } = await supabaseAdmin.from("ticket_applications").select("*", { count: "exact", head: true })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "Supabaseに正常に接続しました",
      count,
    })
  } catch (error) {
    console.error("Supabase接続エラー:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Supabaseへの接続に失敗しました",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
