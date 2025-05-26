"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import StatusUpdate from "./status-update"

// チケット申し込みデータの型定義
type TicketApplication = {
  id: number
  application_id: string
  name: string
  furigana: string
  graduation_year: string
  email: string
  phone: string
  ticket_count: number
  payment_method: string
  remarks: string | null
  total_amount: number
  status: string
  created_at: string
}

export default function AdminTicketsPage() {
  const [applications, setApplications] = useState<TicketApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // 支払い方法の表示名を取得する関数
  const getPaymentMethodName = (method: string): string => {
    switch (method) {
      case "bank":
        return "銀行振込"
      case "convenience":
        return "コンビニ払い"
      case "venue":
        return "会場受付"
      default:
        return method
    }
  }

  // ステータスの表示名と色を取得する関数
  const getStatusInfo = (status: string): { name: string; color: string } => {
    switch (status) {
      case "pending":
        return { name: "保留中", color: "bg-yellow-100 text-yellow-800" }
      case "confirmed":
        return { name: "確認済", color: "bg-green-100 text-green-800" }
      case "paid":
        return { name: "入金済", color: "bg-blue-100 text-blue-800" }
      case "cancelled":
        return { name: "キャンセル", color: "bg-red-100 text-red-800" }
      default:
        return { name: status, color: "bg-gray-100 text-gray-800" }
    }
  }

  // データを取得する関数
  const fetchApplications = async () => {
    setLoading(true)
    setError(null)

    try {
      // 検索パラメータを構築
      const params = new URLSearchParams()
      if (statusFilter !== "all") {
        params.append("status", statusFilter)
      }
      if (searchTerm) {
        params.append("search", searchTerm)
      }

      const response = await fetch(`/api/tickets?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "データの取得に失敗しました")
      }

      setApplications(data.data)
    } catch (err) {
      console.error("データ取得エラー:", err)
      setError(err instanceof Error ? err.message : "データの取得中にエラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  // 初回レンダリング時とフィルター変更時にデータを取得
  useEffect(() => {
    fetchApplications()
  }, [searchTerm, statusFilter, refreshTrigger])

  const handleStatusUpdated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  // CSVダウンロード用の関数
  const downloadCSV = () => {
    // ヘッダー行
    const headers = [
      "申し込みID",
      "氏名",
      "フリガナ",
      "卒業回生",
      "メールアドレス",
      "電話番号",
      "チケット枚数",
      "支払い方法",
      "合計金額",
      "ステータス",
      "申し込み日時",
      "備考",
    ]

    // データ行
    const rows = applications.map((app) => [
      app.application_id,
      app.name,
      app.furigana,
      app.graduation_year === "teacher" ? "教職員" : `${app.graduation_year}回生`,
      app.email,
      app.phone,
      app.ticket_count.toString(),
      getPaymentMethodName(app.payment_method),
      `${app.total_amount.toLocaleString()}円`,
      getStatusInfo(app.status).name,
      new Date(app.created_at).toLocaleString("ja-JP"),
      app.remarks || "",
    ])

    // CSVデータを作成
    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    // BOMを追加してUTF-8でエンコード
    const bom = new Uint8Array([0xef, 0xbb, 0xbf])
    const blob = new Blob([bom, csvContent], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    // ダウンロードリンクを作成して自動クリック
    const link = document.createElement("a")
    link.href = url
    link.download = `ticket_applications_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">チケット申し込み管理</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="名前、メール、申し込みIDで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-80"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="all">全てのステータス</option>
                <option value="pending">保留中</option>
                <option value="confirmed">確認済</option>
                <option value="paid">入金済</option>
                <option value="cancelled">キャンセル</option>
              </select>
            </div>

            <button
              onClick={fetchApplications}
              className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              更新
            </button>

            <button
              onClick={downloadCSV}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              CSVダウンロード
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "検索条件に一致する申し込みがありません"
                : "申し込みデータがありません"}
            </div>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 border text-left">申し込みID</th>
                  <th className="py-3 px-4 border text-left">氏名</th>
                  <th className="py-3 px-4 border text-left">卒業回生</th>
                  <th className="py-3 px-4 border text-left">チケット枚数</th>
                  <th className="py-3 px-4 border text-left">支払い方法</th>
                  <th className="py-3 px-4 border text-left">合計金額</th>
                  <th className="py-3 px-4 border text-left">ステータス</th>
                  <th className="py-3 px-4 border text-left">申し込み日時</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => {
                  const statusInfo = getStatusInfo(application.status)
                  return (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border">{application.application_id}</td>
                      <td className="py-3 px-4 border">
                        <div>{application.name}</div>
                        <div className="text-xs text-gray-500">{application.furigana}</div>
                      </td>
                      <td className="py-3 px-4 border">
                        {application.graduation_year === "teacher" ? "教職員" : `${application.graduation_year}回生`}
                      </td>
                      <td className="py-3 px-4 border">{application.ticket_count}枚</td>
                      <td className="py-3 px-4 border">{getPaymentMethodName(application.payment_method)}</td>
                      <td className="py-3 px-4 border">{application.total_amount.toLocaleString()}円</td>
                      <td className="py-3 px-4 border">
                        <div className="flex flex-col">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${statusInfo.color} mb-2 inline-block w-fit`}
                          >
                            {statusInfo.name}
                          </span>
                          <StatusUpdate
                            ticketId={application.id}
                            currentStatus={application.status}
                            onStatusUpdated={handleStatusUpdated}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 border">{new Date(application.created_at).toLocaleString("ja-JP")}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          トップページに戻る
        </Link>
      </div>
    </div>
  )
}
