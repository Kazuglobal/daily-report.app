"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function TicketComplete() {
  const searchParams = useSearchParams()
  const applicationId = searchParams.get("id")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [application, setApplication] = useState<any>(null)

  useEffect(() => {
    if (!applicationId) {
      setError("申し込みIDが見つかりません。")
      setLoading(false)
      return
    }

    // 申し込み情報を取得
    const fetchApplication = async () => {
      try {
        const response = await fetch(`/api/tickets/${applicationId}`)
        const data = await response.json()

        if (response.ok) {
          setApplication(data.data)
        } else {
          setError(data.message || "申し込み情報の取得に失敗しました。")
        }
      } catch (error) {
        setError("通信エラーが発生しました。")
        console.error("データ取得エラー:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [applicationId])

  // 支払い方法の表示名を取得する関数
  const getPaymentMethodName = (method: string): string => {
    switch (method) {
      case "bank":
        return "銀行振込"
      case "convenience":
        return "コンビニ払い"
      case "venue":
        return "会場受付で支払い"
      default:
        return method
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">読み込み中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
        <Link href="/tickets/apply" className="text-blue-600 hover:underline">
          申し込みフォームに戻る
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">申し込みが完了しました</h1>
        <p className="text-gray-600 mt-2">ご入力いただいたメールアドレスに確認メールをお送りしました。</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-bold mb-4">申し込み内容</h2>
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">申し込みID:</span>
            <span>{application?.application_id}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">氏名:</span>
            <span>{application?.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">フリガナ:</span>
            <span>{application?.furigana}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">卒業回生:</span>
            <span>{application?.graduation_year === "teacher" ? "教職員" : `${application?.graduation_year}回生`}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">チケット枚数:</span>
            <span>{application?.ticket_count}枚</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">支払い方法:</span>
            <span>{application ? getPaymentMethodName(application.payment_method) : ""}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">合計金額:</span>
            <span>{application?.total_amount.toLocaleString()}円</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-blue-800">お支払いについて</h3>
        {application?.payment_method === "bank" && (
          <p className="text-blue-700 mt-2">
            銀行振込の詳細は確認メールに記載されています。お支払い期限までにお振込みください。
          </p>
        )}
        {application?.payment_method === "convenience" && (
          <p className="text-blue-700 mt-2">
            コンビニ払いの詳細は確認メールに記載されています。お支払い期限までにお手続きください。
          </p>
        )}
        {application?.payment_method === "venue" && (
          <p className="text-blue-700 mt-2">当日会場受付にてお支払いください。申し込みIDをお控えください。</p>
        )}
      </div>

      <div className="text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          トップページに戻る
        </Link>
      </div>
    </div>
  )
}
