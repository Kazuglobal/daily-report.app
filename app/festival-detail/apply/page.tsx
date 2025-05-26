"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, AlertCircle, Loader2, Mail } from "lucide-react"
import Header from "@/components/header"
import PageTransition from "@/components/page-transition"
import ScrollReveal from "@/components/scroll-reveal"
import { submitApplication, type FormData, type SubmissionResult } from "./actions"

// Client-side utility functions
const getPaymentMethodDescriptionClient = (method: string): string => {
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

const getPaymentMethodNameClient = (method: string): string => {
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

const calculateTotalClient = (count: string, method: string): number => {
  const price = method === "venue" ? 7000 : 6000 // 会場受付は7,000円、それ以外は6,000円
  return Number(count) * price
}

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

const TicketApplicationPage = () => {
  const [formStep, setFormStep] = useState<"form" | "confirm" | "complete">("form")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData | null>(null)
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })

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

  // フォーム送信時の処理
  const onSubmit = (data: FormData) => {
    setFormData(data)
    setFormStep("confirm")
  }

  // 確認画面から戻る
  const handleBack = () => {
    setFormStep("form")
  }

  // フォーム送信処理
  const handleConfirm = async () => {
    if (!formData) return

    setIsSubmitting(true)
    setServerError(null)

    try {
      // Server Actionを呼び出してデータを送信
      const result = await submitApplication(formData)

      setSubmissionResult(result)

      if (result.success) {
        // 送信成功
        setFormStep("complete")
        reset() // フォームをリセット
      } else {
        // サーバーサイドでのエラー
        setServerError(result.error || "申し込み処理中にエラーが発生しました。もう一度お試しください。")
        // 確認画面にとどまる
      }
    } catch (error) {
      // 通信エラーなど
      console.error("送信エラー:", error)
      setServerError("通信エラーが発生しました。インターネット接続を確認して再度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition>
      <Header />

      <motion.div
        className="bg-[#eef7ff] py-10 mt-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto w-[90%] max-w-7xl">
          <motion.h1
            className="text-4xl font-bold text-center text-[#005bac] mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            同窓祭チケット申し込み
          </motion.h1>
          <motion.p
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            八戸北高校同窓会創立60周年記念同窓祭「６０年だョ！全員集合」
          </motion.p>
        </div>
      </motion.div>

      <main className="container mx-auto w-[90%] max-w-3xl py-10">
        {/* 進行状況インジケーター */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  formStep === "form" ? "bg-[#005bac] text-white" : "bg-green-500 text-white"
                }`}
              >
                1
              </div>
              <span className="text-sm mt-1">入力</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div
                className={`h-full ${formStep === "form" ? "bg-gray-200" : "bg-green-500"} transition-all duration-300`}
                style={{ width: formStep === "form" ? "0%" : "100%" }}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  formStep === "confirm"
                    ? "bg-[#005bac] text-white"
                    : formStep === "complete"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <span className="text-sm mt-1">確認</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div
                className={`h-full ${
                  formStep === "complete" ? "bg-green-500" : "bg-gray-200"
                } transition-all duration-300`}
                style={{ width: formStep === "complete" ? "100%" : "0%" }}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  formStep === "complete" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span className="text-sm mt-1">完了</span>
            </div>
          </div>
        </div>

        <ScrollReveal>
          {/* 入力フォーム */}
          {formStep === "form" && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2 mb-6">
                チケット申し込みフォーム
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 氏名 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    氏名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#005bac] ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="例：北高 太郎"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>

                {/* フリガナ */}
                <div>
                  <label htmlFor="furigana" className="block text-sm font-medium text-gray-700 mb-1">
                    フリガナ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="furigana"
                    {...register("furigana")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#005bac] ${
                      errors.furigana ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="例：キタコウ タロウ"
                  />
                  {errors.furigana && <p className="mt-1 text-sm text-red-500">{errors.furigana.message}</p>}
                </div>

                {/* 卒業年度 */}
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                    卒業回生 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="graduationYear"
                    {...register("graduationYear")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#005bac] ${
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
                  {errors.graduationYear && (
                    <p className="mt-1 text-sm text-red-500">{errors.graduationYear.message}</p>
                  )}
                </div>

                {/* メールアドレス */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#005bac] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="例：example@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* 電話番号 */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#005bac] ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="例：090-1234-5678"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                </div>

                {/* チケット枚数 */}
                <div>
                  <label htmlFor="ticketCount" className="block text-sm font-medium text-gray-700 mb-1">
                    チケット枚数 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ticketCount"
                    {...register("ticketCount")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#005bac] ${
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
                  {errors.ticketCount && <p className="mt-1 text-sm text-red-500">{errors.ticketCount.message}</p>}
                </div>

                {/* 支払い方法 */}
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
                          value={method.value}
                          {...register("paymentMethod")}
                          className="mt-1 mr-2"
                        />
                        <label htmlFor={`payment-${method.value}`} className="text-sm">
                          <span className="font-medium">{method.label}</span>
                          <p className="text-gray-500 text-xs mt-1">
                            {getPaymentMethodDescriptionClient(method.value)}
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.paymentMethod && <p className="mt-1 text-sm text-red-500">{errors.paymentMethod.message}</p>}
                </div>

                {/* 備考欄 */}
                <div>
                  <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
                    備考欄
                  </label>
                  <textarea
                    id="remarks"
                    {...register("remarks")}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005bac]"
                    placeholder="ご要望やご質問などがあればご記入ください"
                  ></textarea>
                </div>

                {/* プライバシーポリシー */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <input type="checkbox" id="privacyPolicy" {...register("privacyPolicy")} className="mt-1 mr-2" />
                    <label htmlFor="privacyPolicy" className="text-sm">
                      <span className="font-medium">プライバシーポリシーに同意する</span>{" "}
                      <span className="text-red-500">*</span>
                      <p className="text-gray-500 text-xs mt-1">
                        ご提供いただいた個人情報は、同窓祭の運営およびそれに関連する目的にのみ使用し、第三者に提供することはありません。
                      </p>
                    </label>
                  </div>
                  {errors.privacyPolicy && <p className="mt-1 text-sm text-red-500">{errors.privacyPolicy.message}</p>}
                </div>

                {/* 送信ボタン */}
                <div className="flex justify-between items-center pt-4">
                  <Link href="/festival-detail" className="flex items-center text-[#005bac] hover:underline">
                    <ArrowLeft size={16} className="mr-1" />
                    同窓祭詳細に戻る
                  </Link>
                  <button
                    type="submit"
                    className="bg-[#005bac] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#004a8c] transition-colors"
                  >
                    確認画面へ進む
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 確認画面 */}
          {formStep === "confirm" && formData && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2 mb-6">
                入力内容の確認
              </h2>

              {/* サーバーエラーがある場合に表示 */}
              {serverError && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle size={20} className="text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{serverError}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                  <div className="font-medium text-gray-700">氏名</div>
                  <div className="md:col-span-2">{formData.name}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                  <div className="font-medium text-gray-700">フリガナ</div>
                  <div className="md:col-span-2">{formData.furigana}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                  <div className="font-medium text-gray-700">卒業回生</div>
                  <div className="md:col-span-2">
                    {formData.graduationYear === "teacher" ? "教職員" : `${formData.graduationYear}回生`}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                  <div className="font-medium text-gray-700">メールアドレス</div>
                  <div className="md:col-span-2">{formData.email}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                  <div className="font-medium text-gray-700">電話番号</div>
                  <div className="md:col-span-2">{formData.phone}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                  <div className="font-medium text-gray-700">チケット枚数</div>
                  <div className="md:col-span-2">{formData.ticketCount}枚</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                  <div className="font-medium text-gray-700">支払い方法</div>
                  <div className="md:col-span-2">{getPaymentMethodNameClient(formData.paymentMethod)}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                  <div className="font-medium text-gray-700">合計金額</div>
                  <div className="md:col-span-2 font-bold text-lg">
                    {calculateTotalClient(formData.ticketCount, formData.paymentMethod).toLocaleString()}円
                  </div>
                </div>

                {formData.remarks && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                    <div className="font-medium text-gray-700">備考</div>
                    <div className="md:col-span-2 whitespace-pre-wrap">{formData.remarks}</div>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle size={20} className="text-yellow-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">注意事項</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        申し込み完了後、確認メールをお送りします。メールが届かない場合は、お問い合わせください。
                        {formData.paymentMethod !== "venue" && "お支払い方法の詳細は確認メールに記載されています。"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center text-[#005bac] hover:underline"
                  disabled={isSubmitting}
                >
                  <ArrowLeft size={16} className="mr-1" />
                  入力画面に戻る
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="bg-[#005bac] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#004a8c] transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      送信中...
                    </>
                  ) : (
                    "申し込みを確定する"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* 完了画面 */}
          {formStep === "complete" && submissionResult && submissionResult.success && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#005bac] mb-6">申し込みが完了しました</h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 inline-block">
                <p className="font-bold text-[#005bac]">申し込み番号: {submissionResult.applicationId}</p>
              </div>

              <p className="mb-4">
                八戸北高校同窓会創立60周年記念同窓祭「６０年だョ！全員集合」のチケット申し込みを受け付けました。
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <div className="flex items-start">
                  <Mail size={20} className="text-[#005bac] mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">確認メールを送信しました</h3>
                    <p className="text-gray-600">
                      ご入力いただいたメールアドレス宛に確認メールをお送りしました。
                      メールが届かない場合は、お手数ですが同窓会事務局までお問い合わせください。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-8 text-left">
                <h3 className="font-bold text-lg text-[#005bac] mb-2">お問い合わせ先</h3>
                <p>八戸北高校同窓会事務局</p>
                <p>電話：080-7694-8113（ショートメールのみ）</p>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Link
                  href="/festival-detail"
                  className="bg-[#005bac] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#004a8c] transition-colors"
                >
                  同窓祭詳細に戻る
                </Link>
                <Link
                  href="/"
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
                >
                  トップページへ
                </Link>
              </div>
            </div>
          )}
        </ScrollReveal>
      </main>

      <footer className="bg-gray-800 text-white py-5 text-center mt-10">
        <div className="container mx-auto">
          <p className="mb-1">八戸北高校同窓会事務局</p>
          <p className="mb-1">お問い合わせ：080-7694-8113 (ショートメールのみ)</p>
          <p>© 2024 八戸北高校同窓会. All Rights Reserved.</p>
        </div>
      </footer>
    </PageTransition>
  )
}

export default TicketApplicationPage
