"use server"

import { z } from "zod"
import { supabaseAdmin } from "@/lib/supabase"

// フォームのバリデーションスキーマ
const formSchema = z.object({
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
  privacyPolicy: z.literal(true, {
    errorMap: () => ({ message: "プライバシーポリシーに同意する必要があります" }),
  }),
})

export type FormData = z.infer<typeof formSchema>

// 申し込み結果の型定義
export type SubmissionResult = {
  success: boolean
  message: string
  applicationId?: string
  error?: string
}

/**
 * チケット申し込みデータを処理するServer Action
 */
export async function submitApplication(data: FormData): Promise<SubmissionResult> {
  try {
    // バリデーション
    const validatedData = formSchema.parse(data)

    // 申し込み日時を生成
    const applicationDate = new Date().toISOString()

    // 申し込みIDを生成（実際のシステムでは連番やUUIDなどを使用）
    const applicationId = `TICKET-${Date.now().toString().slice(-6)}`

    // チケット合計金額を計算
    const totalAmount = await calculateTotal(data.ticketCount, data.paymentMethod)

    // Supabaseクライアントの確認
    if (!supabaseAdmin) {
      console.error("Supabase client is not initialized")
      return {
        success: false,
        message: "データベース接続エラーが発生しました。管理者にお問い合わせください。",
      }
    }

    const { data: insertedData, error } = await supabaseAdmin
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

    // エラーチェック
    if (error) {
      console.error("Supabase保存エラー:", error)
      throw new Error(`データベース保存エラー: ${error.message}`)
    }

    // 確認メールを送信（ここではモック）
    await sendConfirmationEmail(validatedData, applicationId)

    return {
      success: true,
      message: "チケット申し込みが完了しました",
      applicationId,
    }
  } catch (error) {
    console.error("申し込み処理エラー:", error)

    // Zodのバリデーションエラーの場合
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "入力内容に問題があります",
        error: error.errors.map((e) => e.message).join(", "),
      }
    }

    return {
      success: false,
      message: "申し込み処理中にエラーが発生しました",
      error: error instanceof Error ? error.message : "不明なエラー",
    }
  }
}

/**
 * 確認メールを送信する関数（モック）
 */
async function sendConfirmationEmail(data: FormData, applicationId: string): Promise<void> {
  // 実際のメール送信処理はここに実装
  // 例: await sendGrid.send({ to: data.email, subject: '申し込み確認', ... })

  console.log("確認メールを送信:", {
    to: data.email,
    subject: "【八戸北高校同窓会】チケット申し込み確認",
    applicationId,
    name: data.name,
    ticketCount: data.ticketCount,
    paymentMethod: data.paymentMethod,
  })

  // メール送信に少し時間がかかることをシミュレート
  await new Promise((resolve) => setTimeout(resolve, 500))
}

/**
 * 支払い方法の説明を取得する関数
 */
export async function getPaymentMethodDescription(method: string): Promise<string> {
  switch (method) {
    case "bank":
      return "銀行振込の詳細は申し込み完了後にメールでお送りします。"
    case "convenience":
      return "コンビニ払いの詳細は申し込み完了後にメールでお送りします。"
    case "venue":
      return "当日会場受付にてお支払いください。（当日料金7,000円となります）"
    default:
      return ""
  }
}

/**
 * チケット合計金額を計算する関数
 */
export async function calculateTotal(count: string, method: string): Promise<number> {
  const price = method === "venue" ? 7000 : 6000 // 会場受付は7,000円、それ以外は6,000円
  return Number(count) * price
}

/**
 * 支払い方法の表示名を取得する関数
 */
export async function getPaymentMethodName(method: string): Promise<string> {
  switch (method) {
    case "bank":
      return "銀行振込"
    case "convenience":
      return "コンビニ払い"
    case "venue":
      return "会場受付で支払い"
    default:
      return ""
  }
}
