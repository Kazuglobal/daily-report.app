import { createClient } from "@supabase/supabase-js"

// 環境変数からSupabaseの設定を取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// 環境変数のチェック
if (!supabaseUrl) {
  console.error("NEXT_PUBLIC_SUPABASE_URL is not defined")
}

if (!supabaseAnonKey) {
  console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined")
}

// サーバーサイド用のクライアント（管理者権限）
export const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey ? createClient(supabaseUrl, supabaseServiceRoleKey) : null

// 通常のクライアント（匿名ユーザー権限）
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// クライアントサイド用のシングルトンパターン
let clientSideSupabase: ReturnType<typeof createClient> | null = null

export const getClientSupabase = () => {
  if (!clientSideSupabase && typeof window !== "undefined") {
    // クライアントサイドでのみ実行
    const clientUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const clientKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (clientUrl && clientKey) {
      clientSideSupabase = createClient(clientUrl, clientKey)
    } else {
      console.error("Supabase credentials are not available on the client side")
      return null
    }
  }
  return clientSideSupabase
}
