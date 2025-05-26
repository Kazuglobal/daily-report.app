"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import ScrollReveal from "@/components/scroll-reveal"
import PageTransition from "@/components/page-transition"
import Header from "@/components/header"
import { ArrowRight, Calendar, MapPin, Users, Clock } from "lucide-react"
import { theme } from "@/lib/theme"

export default function Home() {
  // Add padding to account for fixed header
  useEffect(() => {
    document.body.style.paddingTop = "80px"
    return () => {
      document.body.style.paddingTop = "0"
    }
  }, [])

  return (
    <PageTransition>
      <Header />

      {/* Hero Section - Updated with new school building image */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="/hachinohe-kita-school-building.png"
          alt="八戸北高校の校舎"
          fill
          priority
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            八戸北高校同窓会
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            創立60周年記念デジタル会報へようこそ
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/festival-detail">
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center">
                60周年記念同窓祭の詳細を見る
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <main className="container mx-auto w-[90%] max-w-7xl px-4 py-12 bg-gray-50">
        {/* 60周年記念同窓祭 ハイライト */}
        <ScrollReveal>
          <section className="mb-16 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-6 px-8">
              <h2 className="text-3xl font-bold">60周年記念同窓祭</h2>
              <p className="text-blue-100">令和7年8月10日開催</p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Calendar className="text-blue-700 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">日時</h3>
                      <p className="text-gray-600">令和7年8月10日(日)</p>
                      <div className="flex items-center mt-1">
                        <Clock className="text-gray-500 mr-1 h-4 w-4" />
                        <p className="text-gray-600">
                          午後5時～ <span className="text-sm text-gray-500">（受付開始：午後4時～）</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="text-blue-700 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">会場</h3>
                      <p className="text-gray-600">八戸プラザアーバンホール</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Users className="text-blue-700 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">参加対象</h3>
                      <p className="text-gray-600">八戸北高校の卒業生、教職員（現役・OB/OG）</p>
                    </div>
                  </div>

                  <Link href="/festival-detail">
                    <motion.button
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      詳細・チケット情報はこちら
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.button>
                  </Link>
                </div>

                <div className="flex justify-center items-center">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden shadow-lg"
                  >
                    <Image
                      src="/60th-anniversary-poster.png"
                      alt="60周年記念同窓祭ポスター"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* コンテンツセクション - 既存の画像を使用 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ScrollReveal delay={0.1}>
            <ContentCard
              title="ご挨拶"
              image="/presidential-portrait.png"
              alt="会長写真"
              excerpt="一同窓会創立六十周年を迎えて一言御挨拶申し上げます。会員の皆様、お元気でお過ごしでしょうか..."
              link="/greetings"
              linkText="全てのご挨拶を見る"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <ContentCard
              title="回生だより"
              image="/high-school-reunion.png"
              alt="11回生同窓会の様子"
              excerpt="昨年10月の一期会（41名参加）から今回の「喜寿を祝う会」の間に、幹事二名を含む7名が鬼籍に入り..."
              link="/class-reports"
              linkText="全ての回生だよりを見る"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <ContentCard
              title="部活動戦績"
              image="/school-building.png"
              alt="スポーツアイコン"
              excerpt="藤田一清選手が100mバタフライで県大会1位となり、東北大会に出場しました。また、中村綾花選手が..."
              link="/sports-achievements"
              linkText="全ての部活動戦績を見る"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <ContentCard
              title="進路状況"
              image="/school-principal-portrait.png"
              alt="卒業生のシルエット"
              excerpt="令和６年度卒業生の進学率は87.1%、国公立大学合格者は120名（卒業生の53.6%）となりました..."
              link="/career-paths"
              linkText="詳細な進路状況を見る"
            />
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.5}>
          <section id="contact" className="mt-16 py-10 bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">お問い合わせ</h2>
            <div className="text-center max-w-lg mx-auto px-6">
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-lg text-gray-800 mb-2">八戸北高校同窓会事務局</h3>
                <p className="text-gray-600 mb-2">お問い合わせ：080-7694-8113</p>
                <p className="text-sm text-gray-500">※ショートメールのみ対応</p>
              </div>

              <p className="text-gray-600">
                同窓会に関するご質問やお問い合わせは、上記の連絡先までお気軽にご連絡ください。
              </p>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto w-[90%] max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">八戸北高校同窓会</h3>
              <p className="text-gray-400 mb-4">
                創立60周年を迎えた八戸北高校同窓会の公式デジタル会報です。 同窓生の皆様に最新の情報をお届けします。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">リンク</h3>
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
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

// コンテンツカードコンポーネント
function ContentCard({
  title,
  image,
  alt,
  excerpt,
  link,
  linkText,
}: {
  title: string
  image: string
  alt: string
  excerpt: string
  link: string
  linkText: string
}) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
      whileHover={{ y: -5, boxShadow: theme.shadows.xl }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <Image
          src={image || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          unoptimized
          onError={(e) => {
            // エラー時のフォールバック処理
            console.error(`Image load error for: ${image}`)
            // エラーが発生した場合、プレースホルダー画像を表示
            ;(e.target as HTMLImageElement).src = "/placeholder.svg"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-0 left-0 text-white text-xl font-bold p-4">{title}</h3>
      </div>

      <div className="p-4 flex-grow">
        <p className="text-gray-600 mb-4">{excerpt}</p>
      </div>

      <div className="p-4 pt-0">
        <Link href={link}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            {linkText}
          </button>
        </Link>
      </div>
    </motion.div>
  )
}

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/greetings", label: "ご挨拶" },
  { href: "/class-reports", label: "回生だより" },
  { href: "/sports-achievements", label: "部活動戦績" },
  { href: "/career-paths", label: "進路状況" },
  { href: "/festival-detail", label: "60周年記念同窓祭" },
  { href: "#contact", label: "お問い合わせ" },
]
