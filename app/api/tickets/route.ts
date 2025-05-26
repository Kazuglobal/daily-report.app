import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { z } from "zod"

// フォームのバリデーションスキーマ
const ticketFormSchema = z.object({
  name: z.string().min(2, { message: "氏名は2文字以上で入力してください" }),
  furigana: z.string().min(2, { message: "フリガナは2文字以上で入力してください" }),
  graduationYear: z.string().min(1, { message: "卒業年度を選択してください" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  phone: z
    .string()
    .min(10, { message: "電話番号は10桁以上で入力してください" })
    .regex(/^[0-9-]+$/, { message: "電話番号は数字とハイフンのみ使用できます" }),
  ticketCount: z.string().min(1, { message: "チケット枚数を選択してください" }),
  paymentMethod: z.string().min(1, { message: "支払い方法を選択してください" }),
  remarks: z.string().optional(),
})

// チケット合計金額を計算する関数
function calculateTotal(count: string, method: string): number {
  const price = method === "venue" ? 7000 : 6000 // 会場受付は7,000円、それ以外は6,000円
  return Number(count) * price
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // バリデーション
    const validatedData = ticketFormSchema.parse(formData)

    // 申し込みIDを生成
    const applicationId = `TICKET-${Date.now().toString().slice(-6)}`

    // チケット合計金額を計算
    const totalAmount = calculateTotal(validatedData.ticketCount, validatedData.paymentMethod)

    // Supabaseにデータを保存
    const { data, error } = await supabaseAdmin
      .from("ticket_applications")
      .insert({
        application_id: applicationId,
        name: validatedData.name,
        furigana: validatedData.furigana,
        graduation_year: validatedData.graduationYear,
        email: validatedData.email,
        phone: validatedData.phone,
        ticket_count: Number.parseInt(validatedData.ticketCount),
        payment_method: validatedData.paymentMethod,
        remarks: validatedData.remarks || null,
        total_amount: totalAmount,
        status: "pending", // 初期ステータスは「保留中」
      })
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "チケット申し込みが完了しました",
      applicationId,
      data,
    })
  } catch (error) {
    console.error("申し込み処理エラー:", error)

    // Zodのバリデーションエラーの場合
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "入力内容に問題があります",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "申し込み処理中にエラーが発生しました",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let query = supabaseAdmin.from("ticket_applications").select("*")

    // ステータスフィルター
    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    // 検索
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,furigana.ilike.%${search}%,email.ilike.%${search}%,application_id.ilike.%${search}%`,
      )
    }

    // 最新順に並べ替え
    query = query.order("created_at", { ascending: false })

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data,
    })
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
