import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // IDが数値かどうかを確認
    const ticketId = Number.parseInt(id)
    if (isNaN(ticketId)) {
      // application_idとして検索
      const { data, error } = await supabaseAdmin
        .from("ticket_applications")
        .select("*")
        .eq("application_id", id)
        .single()

      if (error) {
        throw error
      }

      return NextResponse.json({
        success: true,
        data,
      })
    } else {
      // idとして検索
      const { data, error } = await supabaseAdmin.from("ticket_applications").select("*").eq("id", ticketId).single()

      if (error) {
        throw error
      }

      return NextResponse.json({
        success: true,
        data,
      })
    }
  } catch (error) {
    console.error("データ取得エラー:", error)
    return NextResponse.json(
      {
        success: false,
        message: "データの取得中にエラーが発生しました",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    // バリデーション
    if (body.status && !["pending", "confirmed", "paid", "cancelled"].includes(body.status)) {
      return NextResponse.json({ success: false, message: "無効なステータスです" }, { status: 400 })
    }

    // 更新データを準備
    const updateData = {
      ...(body.status && { status: body.status }),
      updated_at: new Date().toISOString(),
    }

    // IDが数値かどうかを確認
    const ticketId = Number.parseInt(id)
    let query = supabaseAdmin.from("ticket_applications").update(updateData)

    if (isNaN(ticketId)) {
      // application_idとして更新
      query = query.eq("application_id", id)
    } else {
      // idとして更新
      query = query.eq("id", ticketId)
    }

    const { data, error } = await query.select()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "チケット情報が更新されました",
      data,
    })
  } catch (error) {
    console.error("更新エラー:", error)
    return NextResponse.json(
      {
        success: false,
        message: "データの更新中にエラーが発生しました",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
