"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"

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
})

type FormData = z.infer<typeof formSchema>

export default function TicketApplicationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    furigana: "",
    graduationYear: "",
    email: "",
    phone: "",
    ticketCount: "",
    paymentMethod: "",
    remarks: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // 卒業年度の選択肢を生成（1回生〜60回生）
  const graduationYears = Array.from({ length: 60 }, (_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}回生`,
  }))

  // チケット枚数の選択肢
  const ticketOptions = [
    { value: "1", label: "1枚" },
    { value: "2", label: "2枚" },
    { value: "3", label: "3枚" },
    { value: "4", label: "4枚" },
    { value: "5", label: "5枚" },
  ]

  // 支払い方法の選択肢
  const paymentMethods = [
    { value: "bank", label: "銀行振込" },
    { value: "convenience", label: "コンビニ払い" },
    { value: "venue", label: "会場受付で支払い" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // 入力時にエラーをクリア
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    try {
      formSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // 成功時は完了ページに遷移
        router.push(`/tickets/complete?id=${data.applicationId}`)
      } else {
        // エラーメッセージを表示
        setSubmitError(data.message || "申し込み処理中にエラーが発生しました。")
      }
    } catch (error) {
      setSubmitError("通信エラーが発生しました。インターネット接続を確認して再度お試しください。")
      console.error("送信エラー:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">チケット申し込みフォーム</h1>

      {submitError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            氏名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`}
            placeholder="例：北高 太郎"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="furigana" className="block text-sm font-medium text-gray-700 mb-1">
            フリガナ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="furigana"
            name="furigana"
            value={formData.furigana}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${errors.furigana ? "border-red-500" : "border-gray-300"}`}
            placeholder="例：キタコウ タロウ"
          />
          {errors.furigana && <p className="mt-1 text-sm text-red-500">{errors.furigana}</p>}
        </div>

        <div>
          <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
            卒業回生 <span className="text-red-500">*</span>
          </label>
          <select
            id="graduationYear"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.graduationYear ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">選択してください</option>
            {graduationYears.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
            <option value="teacher">教職員</option>
          </select>
          {errors.graduationYear && <p className="mt-1 text-sm text-red-500">{errors.graduationYear}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
            placeholder="例：example@email.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            placeholder="例：090-1234-5678"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="ticketCount" className="block text-sm font-medium text-gray-700 mb-1">
            チケット枚数 <span className="text-red-500">*</span>
          </label>
          <select
            id="ticketCount"
            name="ticketCount"
            value={formData.ticketCount}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.ticketCount ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">選択してください</option>
            {ticketOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.ticketCount && <p className="mt-1 text-sm text-red-500">{errors.ticketCount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            支払い方法 <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <div key={method.value} className="flex items-start">
                <input
                  type="radio"
                  id={`payment-${method.value}`}
                  name="paymentMethod"
                  value={method.value}
                  checked={formData.paymentMethod === method.value}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                />
                <label htmlFor={`payment-${method.value}`} className="text-sm">
                  <span className="font-medium">{method.label}</span>
                  <p className="text-gray-500 text-xs mt-1">
                    {method.value === "bank" && "銀行振込の詳細は申し込み完了後にメールでお送りします。"}
                    {method.value === "convenience" && "コンビニ払いの詳細は申し込み完了後にメールでお送りします。"}
                    {method.value === "venue" && "当日会場受付にてお支払いください。（当日料金7,000円となります）"}
                  </p>
                </label>
              </div>
            ))}
          </div>
          {errors.paymentMethod && <p className="mt-1 text-sm text-red-500">{errors.paymentMethod}</p>}
        </div>

        <div>
          <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
            備考欄
          </label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="ご要望やご質問などがあればご記入ください"
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "送信中..." : "申し込む"}
          </button>
        </div>
      </form>
    </div>
  )
}
