"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Users, Brain, Lightbulb, Target, BarChart2, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { ErrorBoundary } from "./error-boundary"

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index,
}: { icon: any; title: string; description: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: index * 0.1,
      ease: "easeOut",
    }}
  >
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
)

const testimonials = [
  {
    quote: "これから野球に取り入れることで今までよりいい練習などができると思った",
    grade: "1年生",
  },
  {
    quote: "ひとつ聞いたことに対して何個もアドバイスが出てきて細かく書かれていたためとても分かりやすかった。",
    grade: "2年生",
  },
  {
    quote: "AIを活用して自分たちに活かすことが思ったよりも簡単な方法でできると知れたこと。",
    grade: "3年生",
  },
  {
    quote: "野球とAIを繋げて考えたけど、野球以外で考え方などに新たな発見があった。",
    grade: "2年生",
  },
  {
    quote: "質問の仕方を工夫することで、より具体的で役立つアドバイスがもらえることがわかった。",
    grade: "1年生",
  },
  {
    quote:
      "チームメイトとの協力がより重要になると感じた。AIを使いこなすには、みんなで意見を出し合うことが大切だと学んだ。",
    grade: "3年生",
  },
  {
    quote: "時間管理の重要性を再認識した。AIを使うことで、より効率的に練習計画が立てられそうだ。",
    grade: "2年生",
  },
  {
    quote: "自分の得意不得意を客観的に分析できるようになり、効果的な練習方法を見つけられた。",
    grade: "1年生",
  },
]

const FloatingIcon = ({ icon: Icon, delay }: { icon: any; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, y: 50 }}
    animate={{ opacity: [0.4, 0.8, 0.4], scale: 1, y: 0 }}
    transition={{
      duration: 3,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    }}
    className="absolute text-white/50"
    style={{
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 80 + 10}%`,
    }}
  >
    <Icon className="w-8 h-8 md:w-12 md:h-12" />
  </motion.div>
)

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextTestimonial]) // Added nextTestimonial to dependencies

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20 md:py-32">
          <div className="container mx-auto text-center relative z-10 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.25, 0.4, 0.3, 1.1],
              }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                AI×スポーツ
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.6,
                ease: "easeOut",
              }}
            >
              <motion.p
                className="text-2xl md:text-4xl mb-4 font-semibold"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                スポーツを通じて学ぶ時間管理術
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: "easeOut",
              }}
            >
              <motion.p
                className="text-xl md:text-2xl mb-8"
                animate={{
                  scale: [1, 1.01, 1],
                  opacity: [1, 0.9, 1],
                }}
                transition={{
                  duration: 4,
                  delay: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                「AI時代に必要な質問力を学ぶ」
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <motion.a
                href="#features"
                className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:bg-blue-100 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                詳細を見る
              </motion.a>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-20">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDUwIDAgTCAwIDAgMCA1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"
            />
          </div>
          <FloatingIcon icon={Brain} delay={0.5} />
          <FloatingIcon icon={Clock} delay={1} />
          <FloatingIcon icon={Target} delay={1.5} />
          <FloatingIcon icon={Lightbulb} delay={2} />
          <FloatingIcon icon={Users} delay={2.5} />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-600 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          />
        </section>

        {/* Features */}
        <section id="features" className="py-16 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-800">主な特徴と機能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  icon: Users,
                  title: "チームワークで課題解決",
                  description:
                    "ポジション別のチームに分かれ、練習メニュー改善やマネジメントなど、具体的なテーマに取り組みます。協力して問題を解決する力を養います。",
                },
                {
                  icon: Brain,
                  title: "AIを使った実践的な学び",
                  description:
                    "実際にAI（Microsoft Copilotなど）を使用し、スポーツにおける課題解決に挑戦します。最新技術を活用する能力を身につけます。",
                },
                {
                  icon: Lightbulb,
                  title: "講師によるサポート",
                  description:
                    "経験豊富な講師が、AIの使い方から課題解決の進め方まで丁寧にサポートします。疑問点をすぐに解決できる環境を提供します。",
                },
                {
                  icon: Target,
                  title: "質問力の向上",
                  description:
                    "AI時代に必要不可欠な「質問力」を重点的に鍛えます。的確な質問をすることで、より良い回答や解決策を導き出す力を養成します。",
                },
                {
                  icon: BarChart2,
                  title: "パフォーマンス分析",
                  description:
                    "AIを活用して自身やチームのパフォーマンスを分析します。データに基づいた改善点の発見と、効果的なトレーニング方法の立案を学びます。",
                },
                {
                  icon: Clock,
                  title: "時間管理スキルの習得",
                  description:
                    "スポーツを通じて効率的な時間管理術を学びます。練習、休息、戦略立案などのバランスを取る方法を身につけ、日常生活にも活かせるスキルを獲得します。",
                },
              ].map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section id="case-study" className="py-16 md:py-32 bg-gradient-to-b from-gray-100 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-800">
              導入事例：八戸西野球部（青森県）
            </h2>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9562-EjImntJufmyCtEC1MDNq7yN7G1M8rp.jpg"
                alt="八戸西高校野球部のAIワークショップ新聞記事"
                width={1200}
                height={900}
                className="w-full h-auto object-contain"
              />
              <div className="p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-blue-600">野球の練習にAI活用</h3>
                <p className="mb-4 md:mb-6 text-base md:text-lg">
                  八戸西高生がワークショップに参加し、AIを活用した野球練習の可能性を探究しました。
                </p>
                <ul className="space-y-2 md:space-y-4 text-base md:text-lg">
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-5 w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>
                      AIを活用し練習メニューを見直す。新たな練習メニューの発見と、質問力を上げることで回答の精度が上がる事を実感。
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-5 w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>実際のワークショップで学んだ内容を練習に取り入れる事で、自主性のある練習内容に変化。</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-5 w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>監督は、「生徒の練習メニューにおける本音が聞けて良かった」と高評価。</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="py-16 md:py-32 bg-gradient-to-b from-white to-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-800">導入メリット</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold mb-4 break-words hyphens-auto">
                    AI時代の必須スキル「質問力」を習得
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base md:text-lg">
                    AIを使いこなすための重要なスキルである「質問力」を、スポーツを通して楽しく効果的に身につけられます。
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold mb-4 break-words hyphens-auto">
                    スポーツにおける
                    <br className="hidden sm:inline" />
                    パフォーマンス向上
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base md:text-lg">
                    戦略的思考力や課題解決能力を高め、チーム全体のレベルアップに貢献できます。
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold mb-4 break-words hyphens-auto">
                    主体的な思考と行動力を育成
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base md:text-lg">
                    自分自身の課題を見つけ、解決策を自ら考え、実行する力を養います。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 md:py-32 bg-gradient-to-b from-gray-100 to-white overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-800">参加者の声</h2>

            {/* Mobile view: Stacked testimonials */}
            <div className="md:hidden space-y-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <p className="text-base italic text-gray-600 mb-4">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mr-4"></div>
                      <div>
                        <p className="font-semibold text-sm">野球部員</p>
                        <p className="text-gray-500 text-xs">{testimonial.grade}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop view: Carousel */}
            <div className="hidden md:block relative max-w-4xl mx-auto">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: 300 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 * direction }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute w-full"
                >
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <p className="text-lg md:text-xl italic text-gray-600 mb-6">{testimonials[currentIndex].quote}</p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mr-4"></div>
                        <div>
                          <p className="font-semibold text-base md:text-lg">野球部員</p>
                          <p className="text-gray-500 text-sm md:text-base">{testimonials[currentIndex].grade}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white text-gray-800 hover:bg-gray-100 rounded-full p-2 shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white text-gray-800 hover:bg-gray-100 rounded-full p-2 shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Desktop view: Carousel indicators */}
            <div className="hidden md:flex mt-8 justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-blue-600" : "bg-gray-300"}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Instructor Introduction */}
        <section className="py-16 md:py-32 bg-gradient-to-b from-white to-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-800">講師紹介</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zp1YqEBLvVDdxKkNwwkJVvNCWELrH1.png"
                    alt="金子晋輔"
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-6 border-4 border-blue-500 size-48 object-cover"
                  />
                  <CardTitle className="text-xl md:text-2xl font-bold text-center text-blue-600">
                    金子晋輔（かねこしんすけ）
                  </CardTitle>
                  <CardDescription className="text-center text-base md:text-lg">
                    弁護士（日本＆ニューヨーク州）/ 法律事務所Verse代表
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 text-blue-600">専門分野</h4>
                    <p className="text-base md:text-lg">ICT、DX、UX、AIなどテクノロジーに関する企業法務</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 text-blue-600">経歴</h4>
                    <ul className="list-disc list-inside text-base md:text-lg space-y-1 md:space-y-2">
                      <li>外資系法律事務所、外資系コンサルティング、スタートアップ、独立と多様な経験</li>
                      <li>弁護士、会社員（法務部）、コーポレート役員（スタートアップ）を経験</li>
                      <li>多様な視点からAI活用の可能性を検証</li>
                      <li>テクノロジー企業の法務支援から新規事業の立ち上げまで幅広くサポート</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 text-blue-600">実績</h4>
                    <ul className="list-disc list-inside text-base md:text-lg space-y-1 md:space-y-2">
                      <li>AI時代における法的課題の解決や、AIを活用した業務効率化の実現に貢献</li>
                      <li>多くの個人や企業のAIリテラシー向上に寄与</li>
                      <li>テクノロジー企業の法務戦略立案と実行をサポート</li>
                      <li>スタートアップの新規事業立ち上げにおける法的支援と経営参画</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 text-blue-600">AI普及活動</h4>
                    <ul className="list-disc list-inside text-base md:text-lg space-y-1 md:space-y-2">
                      <li>ウェビナー登壇</li>
                      <li>企業での勉強会</li>
                      <li>個人への1on1指導</li>
                      <li>小学生向けワークショップ</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 text-blue-600">教育経験</h4>
                    <ul className="list-disc list-inside text-base md:text-lg space-y-1 md:space-y-2">
                      <li>予備校講師（英語）</li>
                      <li>企業内研修会・ワークショップ主催</li>
                      <li>大学でのキャリアワークショップ</li>
                      <li>人事担当者向けワークショップ</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0166-d7UpaJcqVvY3Zvgm3svEy06GJlKJfE.jpg"
                    alt="大舘 和史"
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-6 border-4 border-blue-500 size-48 object-cover"
                  />
                  <CardTitle className="text-xl md:text-2xl font-bold text-center text-purple-600">
                    大舘 和史（おおだて かずし）
                  </CardTitle>
                  <CardDescription className="text-center text-base md:text-lg">Globalbunny 代表</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 text-purple-600">経歴</h4>
                    <p className="text-base md:text-lg">八戸西高校（スポーツ科学科30期）卒業</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 text-purple-600">現在の主な活動</h4>
                    <ul className="list-disc list-inside text-base md:text-lg space-y-1 md:space-y-2">
                      <li>グローバルプログラム（企画・運営）</li>
                      <li>AIとグローバルな視点での人材育成</li>
                      <li>地域再生プロジェクト（東北地方の活性化）</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 text-purple-600">活動詳細</h4>
                    <ul className="list-disc list-inside text-base md:text-lg space-y-1 md:space-y-2">
                      <li>東京大学大学院の研究者や留学生と地域住民・子供たちを結ぶプログラム</li>
                      <li>AIとグローバルな視点を活用した次世代人材の育成</li>
                      <li>地域再生を通じた東北地方の活性化プロジェクト</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 text-purple-600">主な実績</h4>
                    <ul className="list-disc list-inside text-base md:text-lg space-y-1 md:space-y-2">
                      <li>2022年 テレビ東京主催「ハツメイノハ」ファイナリスト</li>
                      <li>シリコンバレーのAIスタートアップを招聘したイノベーションイベントの企画・実施</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 text-purple-600">スキル・強み</h4>
                    <ul className="list-disc list-inside text-base md:text-lg space-y-1 md:space-y-2">
                      <li>グローバルネットワーキング</li>
                      <li>イベント企画・運営</li>
                      <li>地域活性化プロジェクトマネジメント</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 md:py-16">
          <div className="container mx-auto text-center px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">GlobalBunny</h3>
            <p className="text-lg md:text-xl mb-2 md:mb-4">KazushiOdate</p>
            <p className="text-lg md:text-xl mb-2 md:mb-4">info@globalbunny.jp</p>
            <p className="text-lg md:text-xl">
              HP：
              <a
                href="https://globalbunny.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-100 transition-colors duration-300"
              >
                globalbunny.jp
              </a>
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}
