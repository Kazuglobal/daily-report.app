"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CreditCard,
  Phone,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react"
import Header from "@/components/header"
import ScrollReveal from "@/components/scroll-reveal"
import PageTransition from "@/components/page-transition"
import ShareButtons from "@/components/share-buttons"

const FestivalDetailPage = () => {
  const [showQRModal, setShowQRModal] = useState(false)

  // Add padding to account for fixed header
  useEffect(() => {
    document.body.style.paddingTop = "80px"
    return () => {
      document.body.style.paddingTop = "0"
    }
  }, [])

  // 現在のURLを取得（クライアントサイドでのみ実行）
  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin
    }
    return "https://example.com" // フォールバックURL
  }

  return (
    <PageTransition>
      <Header />

      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/school-reunion-ceremony.png" alt="同窓会の様子" fill className="object-cover" />
        </div>

        <div className="container mx-auto w-[90%] max-w-7xl relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              八戸北高校同窓会創立60周年記念同窓祭
            </motion.h1>

            <motion.div
              className="inline-block bg-amber-500 text-white px-6 py-2 rounded-full text-xl font-bold mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              ６０年だョ！全員集合
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="mr-2 h-5 w-5" />
                <span>令和7年8月10日(日)</span>
              </div>

              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="mr-2 h-5 w-5" />
                <span>午後5時～</span>
              </div>

              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="mr-2 h-5 w-5" />
                <span>八戸プラザアーバンホール</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link href="/festival-detail/apply">
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center">
                  チケットを申し込む
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <main className="container mx-auto w-[90%] max-w-7xl py-12 bg-gray-50">
        {/* オンライン申し込みバナー */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl shadow-xl mb-12 overflow-hidden">
            <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 text-white">
                <h2 className="text-2xl font-bold mb-2">オンラインでチケット申し込み受付中！</h2>
                <p className="text-blue-100">申込締切：令和7年7月25日(金)</p>
              </div>
              <Link href="/festival-detail/apply">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold shadow-md hover:bg-blue-50 transition-colors flex items-center"
                >
                  チケットを申し込む
                  <ArrowRight size={18} className="ml-2" />
                </motion.button>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側：ポスターと基本情報 */}
          <div className="lg:col-span-1">
            <ScrollReveal>
              <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
                <div className="p-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md mb-6"
                  >
                    <Image
                      src="/60th-anniversary-poster.png"
                      alt="60周年記念同窓祭ポスター"
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowQRModal(true)}
                      className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md"
                    >
                      <ExternalLink size={18} className="mr-2" />
                      QRコードを表示
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
                <div className="bg-blue-600 text-white py-4 px-6">
                  <h2 className="text-xl font-bold">お問い合わせ</h2>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Phone size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">080-7694-8113</p>
                      <p className="text-sm text-gray-500">同窓会事務局</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">※ショートメールのみ対応</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 右側：詳細情報 */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
                <div className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold">イベント概要</h2>
                  <ShareButtons
                    title="八戸北高校同窓会創立60周年記念同窓祭"
                    description="６０年だョ！全員集合 - 令和7年8月10日(日) 八戸プラザアーバンホールにて開催"
                    url={`${getBaseUrl()}/festival-detail`}
                    hashtags={["八戸北高校", "同窓会", "60周年", "同窓祭"]}
                  />
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <Calendar size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">日時</h3>
                      <p className="text-gray-600">令和7年8月10日(日)</p>
                      <div className="flex items-center mt-1">
                        <Clock size={16} className="text-gray-500 mr-1" />
                        <p className="text-gray-600">
                          午後5時～ <span className="text-sm text-gray-500">（受付開始：午後4時～）</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <MapPin size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">会場</h3>
                      <p className="text-gray-600">八戸プラザアーバンホール</p>
                      <p className="text-sm text-gray-500 mt-1">〒031-0071 青森県八戸市沼館4丁目7-98</p>
                      <a
                        href="https://maps.google.com/?q=八戸プラザアーバンホール"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm inline-flex items-center mt-2"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        Google マップで見る
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <CreditCard size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">会費</h3>
                      <p className="text-gray-600">
                        6,000円 <span className="text-sm text-gray-500">（当日は7,000円）</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <Users size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">参加対象</h3>
                      <p className="text-gray-600">八戸北高校の卒業生、教職員（現役・OB/OG）</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
                <div className="bg-blue-600 text-white py-4 px-6">
                  <h2 className="text-xl font-bold">ゲスト・出演者</h2>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-lg font-bold text-blue-700 mb-4 border-b border-gray-200 pb-2">
                        オープニング
                      </h3>
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-700 font-bold text-xl">
                          泉
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">泉 彰英 さん</p>
                          <p className="text-sm text-gray-600">日本舞踊（藤間流）</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-lg font-bold text-blue-700 mb-4 border-b border-gray-200 pb-2">ゲスト</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-700 font-bold text-xl">
                            十
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">十日市 秀悦 さん</p>
                            <p className="text-sm text-gray-600">12回生</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-700 font-bold text-xl">
                            中
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">中島 美華 さん</p>
                            <p className="text-sm text-gray-600">25回生</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-5 rounded-xl border-l-4 border-amber-400">
                    <h3 className="text-lg font-bold text-amber-700 mb-4 border-b border-amber-100 pb-2">特別ゲスト</h3>
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mr-4 text-amber-700 font-bold text-xl">
                        S
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">シンジャー姉妹</p>
                        <p className="text-sm text-gray-600">渡山ひろみ・渡山まる</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
                <div className="bg-blue-600 text-white py-4 px-6">
                  <h2 className="text-xl font-bold">チケット購入方法</h2>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                        <CheckCircle size={20} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">同窓会役員又は各期代議員</p>
                        <p className="text-gray-600">お近くの同窓会役員または各期代議員にお申し込みください。</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                        <CheckCircle size={20} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">八戸プラザホテルフロント</p>
                        <p className="text-gray-600">八戸プラザホテルのフロントでもチケットをお求めいただけます。</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                        <CheckCircle size={20} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">オンライン申し込み</p>
                        <p className="text-gray-600 mb-3">
                          下記のボタンからオンラインでチケットをお申し込みいただけます。
                        </p>
                        <Link href="/festival-detail/apply">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center shadow-md"
                          >
                            オンラインでチケットを申し込む
                            <ArrowRight size={16} className="ml-2" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Calendar size={20} className="text-amber-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-amber-800">申込締切</h3>
                          <div className="mt-2 text-sm text-amber-700">
                            <p>令和7年7月25日(金)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
                <div className="bg-blue-600 text-white py-4 px-6">
                  <h2 className="text-xl font-bold">イベント内容（予定）</h2>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-600">
                      <h3 className="font-bold text-lg text-blue-800 mb-2">第一部：式典</h3>
                      <p className="text-gray-600">開会の挨拶、来賓紹介、同窓会長挨拶、校長挨拶、来賓祝辞など</p>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-amber-500">
                      <h3 className="font-bold text-lg text-amber-800 mb-2">第二部：アトラクション</h3>
                      <p className="text-gray-600">
                        オープニング（泉彰英さんによる日本舞踊）、ゲストパフォーマンス、シンジャー姉妹ライブなど
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-600">
                      <h3 className="font-bold text-lg text-blue-800 mb-2">第三部：懇親会</h3>
                      <p className="text-gray-600">歓談、各期生紹介、思い出トーク、校歌斉唱など</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mt-6">
                    <p className="text-sm text-gray-600">
                      ※イベント内容は変更になる場合があります。最新情報は同窓会ホームページでご確認ください。
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/">
            <motion.button
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChevronRight size={20} className="mr-2 rotate-180" />
              トップページに戻る
            </motion.button>
          </Link>
        </div>
      </main>

      {/* QRコードモーダル */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-4">QRコードでアクセス</h3>
            <div className="flex justify-center mb-4">
              <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-xl border-2 border-gray-200">
                <p className="text-gray-500 text-sm text-center">
                  QRコード
                  <br />
                  （実際のQRコードに置き換えてください）
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6 text-center">
              このQRコードを読み取ると、同窓会ホームページのチケット申し込みページにアクセスできます。
            </p>
            <div className="flex justify-center">
              <motion.button
                onClick={() => setShowQRModal(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                閉じる
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto w-[90%] max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">八戸北高校同窓会</h3>
              <p className="text-gray-400 mb-4">
                創立60周年を迎えた八戸北高校同窓会の公式デジタル会報です。 同窓生の皆様に最新の情報をお届けします。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">お問い合わせ</h3>
              <p className="text-gray-400 mb-2">八戸北高校同窓会事務局</p>
              <p className="text-gray-400 mb-2">080-7694-8113 (ショートメールのみ)</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
            <p>© 2024 八戸北高校同窓会. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </PageTransition>
  )
}

export default FestivalDetailPage
