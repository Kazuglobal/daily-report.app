"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import Header from "@/components/header"
import ScrollReveal from "@/components/scroll-reveal"
import PageTransition from "@/components/page-transition"
import ShareButtons from "@/components/share-buttons"

// 競技結果の型定義
type SportResult = {
  sport: string
  category?: string
  event?: string
  result: string
  student?: string
  note?: string
}

// 各大会の結果データ
const springResults: SportResult[] = [
  { sport: "水泳", category: "【男子】", event: "100mバタフライ", result: "4位", student: "藤田 一清" },
  { sport: "水泳", category: "【男子】", event: "200mバタフライ", result: "1位", student: "藤田 一清" },
  { sport: "水泳", category: "【男子】", event: "1500m自由形", result: "1位", student: "矢吹 博太朗" },
  { sport: "水泳", category: "【男子】", event: "400m自由形", result: "2位", student: "矢吹 博太朗" },
  { sport: "水泳", category: "【男子】", event: "50mバタフライ", result: "7位", student: "慶長 峻輔" },
  { sport: "水泳", category: "【男子】", event: "100m自由形", result: "8位", student: "慶長 峻輔" },
  { sport: "水泳", category: "【女子】", event: "50m背泳ぎ", result: "3位", student: "伊藤 愛実" },
  { sport: "水泳", category: "【女子】", event: "100m背泳ぎ", result: "7位", student: "伊藤 愛実" },
  { sport: "水泳", category: "【女子】", event: "50m自由形", result: "6位", student: "中村 綾花" },
  { sport: "水泳", category: "【女子】", event: "200m自由形", result: "3位", student: "中村 綾花" },
  { sport: "水泳", category: "【女子】", event: "100m背泳ぎ", result: "6位", student: "中村 綾花" },
  { sport: "サッカー", event: "対戦結果", result: "八戸北 0-1 八戸東" },
  { sport: "サッカー", event: "対戦結果", result: "八戸北 0-1 八戸西" },
  { sport: "サッカー", event: "対戦結果", result: "八戸北 3-0 八戸工業" },
  { sport: "サッカー", event: "対戦結果", result: "八戸北 1-4 工大一" },
  { sport: "サッカー", event: "対戦結果", result: "八戸北 6-1 ウルスラ" },
  { sport: "サッカー", event: "対戦結果", result: "八戸北 0-5 向陵" },
  { sport: "ソフトボール", event: "1回戦", result: "八戸・八戸東・八戸北 5-15 八戸西・工大二" },
  { sport: "バドミントン", category: "【男子】", event: "学校対抗戦", result: "1回戦 八戸北 1-3 柴田学園" },
  {
    sport: "バドミントン",
    category: "【男子】",
    event: "個人ダブルス",
    result: "ベスト32",
    student: "成田・村井組",
    note: "高総体進出",
  },
  {
    sport: "バドミントン",
    category: "【男子】",
    event: "個人ダブルス",
    result: "ベスト64",
    student: "豊巻・恩田組",
    note: "高総体進出",
  },
  { sport: "バドミントン", category: "【女子】", event: "学校対抗戦", result: "1回戦 八戸北 2-3 青森工業" },
  {
    sport: "バドミントン",
    category: "【女子】",
    event: "個人ダブルス",
    result: "ベスト64",
    student: "尾﨑・伊藤組",
    note: "高総体進出",
  },
  // 他の競技結果も同様に追加...
]

const prefecturalResults: SportResult[] = [
  { sport: "水泳", event: "学校対抗", result: "6位" },
  {
    sport: "水泳",
    category: "【男子】",
    event: "100mバタフライ",
    result: "1位",
    student: "藤田 一清",
    note: "東北大会出場",
  },
  { sport: "水泳", category: "【男子】", event: "200mバタフライ", result: "1位", student: "藤田 一清" },
  { sport: "水泳", category: "【男子】", event: "200m自由形", result: "6位", student: "矢吹 博太朗" },
  { sport: "水泳", category: "【男子】", event: "400m自由形", result: "3位", student: "矢吹 博太朗" },
  { sport: "水泳", category: "【男子】", event: "100m自由形", result: "8位", student: "慶長 峻輔" },
  { sport: "水泳", category: "【女子】", event: "100m背泳ぎ", result: "6位", student: "伊藤 愛実" },
  { sport: "水泳", category: "【女子】", event: "200m背泳ぎ", result: "5位", student: "伊藤 愛実" },
  { sport: "水泳", category: "【女子】", event: "200m自由形", result: "4位", student: "中村 綾花" },
  { sport: "水泳", category: "【女子】", event: "400m自由形", result: "4位", student: "中村 綾花" },
  // 他の競技結果も同様に追加...
]

const autumnResults: SportResult[] = [
  { sport: "陸上競技", category: "【女子】", event: "800m", result: "8位", student: "田代 亜子" },
  { sport: "陸上競技", category: "【女子】", event: "3000m", result: "7位", student: "大澤 咲空" },
  { sport: "硬式野球", event: "1回戦", result: "八戸北 0-7 木造（7回コールド）" },
  {
    sport: "水泳",
    category: "【男子】",
    event: "400m個人メドレー",
    result: "2位",
    student: "矢吹 博太朗",
    note: "東北大会出場",
  },
  {
    sport: "水泳",
    category: "【女子】",
    event: "400m自由形",
    result: "1位",
    student: "中村 綾花",
    note: "東北大会出場",
  },
  {
    sport: "水泳",
    category: "【女子】",
    event: "200m個人メドレー",
    result: "2位",
    student: "中村 綾花",
    note: "東北大会出場",
  },
  // 他の競技結果も同様に追加...
]

const culturalResults: SportResult[] = [
  {
    sport: "地学・科学",
    event: "自然科学部門 研究発表部門",
    result: "奨励賞",
    student: "江刺家璃々杏・西虹樹・岩舘昊平",
    note: "「濡れにくい傘の差し方についての研究」",
  },
  {
    sport: "美術",
    event: "第45回青森県高等学校総合文化祭美術部門",
    result: "優良賞",
    student: "藤田 茉那",
    note: "「うるおい」",
  },
  {
    sport: "囲碁・将棋",
    event: "第48回全国高等学校総合文化祭囲碁部門",
    result: "男女混合団体戦 三将（3勝3敗）",
    student: "荒屋敷 采",
  },
  {
    sport: "囲碁・将棋",
    event: "第45回青森県高等学校総合文化祭囲碁部門",
    result: "男子個人戦Aクラス 第3位",
    student: "野澤 慶一郎",
    note: "東北大会出場（男子団体青森県チーム三将）",
  },
  // 他の競技結果も同様に追加...
]

const tohokuResults: SportResult[] = [
  { sport: "水泳", event: "第79回東北水泳大会" },
  { sport: "水泳", event: "第72回東北高等学校選手権水泳競技大会" },
  { sport: "水泳", category: "【男子】", event: "200mバタフライ", result: "予選敗退" },
  { sport: "水泳", category: "【男子】", event: "100mバタフライ", result: "予選敗退" },
  { sport: "水泳", category: "【女子】", event: "200m背泳ぎ", result: "予選敗退" },
  { sport: "水泳", category: "【女子】", event: "100m背泳ぎ", result: "予選敗退" },
  { sport: "水泳", category: "【女子】", event: "400m自由形", result: "予選敗退" },
  { sport: "水泳", category: "【女子】", event: "200m自由形", result: "予選敗退" },
  // 他の競技結果も同様に追加...
]

const nationalResults: SportResult[] = [
  { sport: "囲碁将棋", event: "第48回文部科学大臣杯全国高等学校囲碁選手権大会" },
  {
    sport: "囲碁将棋",
    event: "女子団体戦",
    result: "予選リーグ敗退（1勝2敗）",
    student: "荒屋敷采・磯嶋絢心・井筒妃由",
  },
  {
    sport: "囲碁将棋",
    event: "女子個人戦",
    result: "予選リーグ敗退",
    student: "磯嶋絢心（0勝3敗）、荒屋敷采（1勝2敗）",
  },
  { sport: "ビーチバレーボール", student: "木村 朱璃　　工藤 蒼太" },
  {
    sport: "ビーチバレーボール",
    category: "青森県大会",
    event: "第35回青森県ビーチバレーボール選手権大会",
    result: "第1位",
  },
  {
    sport: "ビーチバレーボール",
    category: "東北大会",
    event: "第51回東北総合スポーツ大会バレーボール競技",
    result: "第1位",
  },
  {
    sport: "ビーチバレーボール",
    category: "全国大会",
    event: "第23回全日本ビーチバレーボール高校男子選手権大会",
    result: "ベスト16",
  },
  {
    sport: "ビーチバレーボール",
    category: "全国大会",
    event: "第78回国民スポーツ大会ビーチバレーボール競技",
    result: "第5位",
  },
  // 他の競技結果も同様に追加...
]

// 結果データを大会タイプごとにマッピング
const resultsMap = {
  spring: springResults,
  prefectural: prefecturalResults,
  autumn: autumnResults,
  cultural: culturalResults,
  tohoku: tohokuResults,
  national: nationalResults,
}

// 大会タイプごとのタイトル
const tabTitles = {
  spring: "令和6年度 県高校春季大会 結果一覧",
  prefectural: "令和6年度 県高校総体大会 結果一覧",
  autumn: "令和6年度 県高校秋季大会（新人大会） 結果一覧",
  cultural: "令和6年度 県高総文 結果一覧",
  tohoku: "令和6年度 東北大会 結果一覧",
  national: "令和6年度 全国大会 結果一覧",
}

// 結果カードコンポーネント
const ResultCard = ({ result }: { result: SportResult }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md mb-3 overflow-hidden">
      <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex-1">
          <h3 className="font-bold text-[#005bac]">{result.sport}</h3>
          {result.category && <span className="text-sm text-gray-600 ml-2">{result.category}</span>}
        </div>
        <div className="flex items-center">
          {result.result && (
            <span className="mr-3 px-2 py-1 bg-gray-100 rounded-full text-sm font-medium">{result.result}</span>
          )}
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="mt-2 grid grid-cols-1 gap-2">
            {result.event && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">種目・競技</span>
                <span className="font-medium">{result.event}</span>
              </div>
            )}
            {result.student && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">生徒氏名</span>
                <span>{result.student}</span>
              </div>
            )}
            {result.note && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">備考</span>
                <span className="text-sm">{result.note}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// 競技ごとにグループ化する関数
const groupBySport = (results: SportResult[]) => {
  const grouped: { [key: string]: SportResult[] } = {}

  results.forEach((result) => {
    if (!grouped[result.sport]) {
      grouped[result.sport] = []
    }
    grouped[result.sport].push(result)
  })

  return grouped
}

const SportsAchievementsPage = () => {
  // 現在のURLを取得（クライアントサイドでのみ実行）
  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin
    }
    return "https://example.com" // フォールバックURL
  }

  // タブの状態管理
  const [activeTab, setActiveTab] = useState("spring")
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedSports, setExpandedSports] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"card" | "table">("card")

  // タブ切り替え関数
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setSearchTerm("")
    setExpandedSports([])
  }

  // 検索フィルター関数
  const filterResults = (results: SportResult[]) => {
    if (!searchTerm) return results

    return results.filter(
      (result) =>
        result.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (result.event && result.event.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (result.student && result.student.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (result.result && result.result.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  // 競技の展開/折りたたみを切り替える関数
  const toggleSportExpansion = (sport: string) => {
    if (expandedSports.includes(sport)) {
      setExpandedSports(expandedSports.filter((s) => s !== sport))
    } else {
      setExpandedSports([...expandedSports, sport])
    }
  }

  // 現在のタブの結果を取得
  const currentResults = resultsMap[activeTab as keyof typeof resultsMap] || []
  const filteredResults = filterResults(currentResults)
  const groupedResults = groupBySport(filteredResults)

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
            部活動戦績
          </motion.h1>
          <motion.p
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            各部活動の大会結果
          </motion.p>
        </div>
      </motion.div>

      <main className="container mx-auto w-[90%] max-w-7xl py-10">
        {/* タブナビゲーション */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex flex-nowrap border-b border-gray-200 min-w-max md:min-w-0">
            <button
              className={`px-4 py-2 font-medium text-sm md:text-base rounded-t-lg transition-colors duration-300 ${
                activeTab === "spring" ? "bg-[#005bac] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange("spring")}
            >
              春季大会
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm md:text-base rounded-t-lg transition-colors duration-300 ${
                activeTab === "prefectural" ? "bg-[#005bac] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange("prefectural")}
            >
              高総体
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm md:text-base rounded-t-lg transition-colors duration-300 ${
                activeTab === "autumn" ? "bg-[#005bac] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange("autumn")}
            >
              秋季（新人）大会
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm md:text-base rounded-t-lg transition-colors duration-300 ${
                activeTab === "cultural" ? "bg-[#005bac] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange("cultural")}
            >
              高総文
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm md:text-base rounded-t-lg transition-colors duration-300 ${
                activeTab === "tohoku" ? "bg-[#005bac] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange("tohoku")}
            >
              東北大会
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm md:text-base rounded-t-lg transition-colors duration-300 ${
                activeTab === "national" ? "bg-[#005bac] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange("national")}
            >
              全国大会
            </button>
          </div>
        </div>

        <ScrollReveal>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">
                {tabTitles[activeTab as keyof typeof tabTitles]}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("card")}
                  className={`px-3 py-1 text-sm rounded ${viewMode === "card" ? "bg-[#005bac] text-white" : "bg-gray-100"}`}
                >
                  カード表示
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1 text-sm rounded ${viewMode === "table" ? "bg-[#005bac] text-white" : "bg-gray-100"}`}
                >
                  テーブル表示
                </button>
                <ShareButtons
                  title={`八戸北高校 ${tabTitles[activeTab as keyof typeof tabTitles]}`}
                  description={`八戸北高校の${activeTab === "spring" ? "春季大会" : activeTab === "prefectural" ? "高総体大会" : activeTab === "autumn" ? "秋季（新人）大会" : activeTab === "cultural" ? "高総文" : activeTab === "tohoku" ? "東北大会" : "全国大会"}の結果をご覧ください。`}
                  url={`${getBaseUrl()}/sports-achievements`}
                  hashtags={[
                    "八戸北高校",
                    "部活動",
                    activeTab === "spring"
                      ? "春季大会"
                      : activeTab === "prefectural"
                        ? "高総体"
                        : activeTab === "autumn"
                          ? "秋季大会"
                          : activeTab === "cultural"
                            ? "高総文"
                            : activeTab === "tohoku"
                              ? "東北大会"
                              : "全国大会",
                  ]}
                />
              </div>
            </div>

            {/* 検索フィルター */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="部活動名、種目、生徒名などで検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005bac]"
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            {/* カード表示モード */}
            {viewMode === "card" && (
              <div className="space-y-6">
                {Object.keys(groupedResults).length > 0 ? (
                  Object.entries(groupedResults).map(([sport, results]) => (
                    <div key={sport} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div
                        className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSportExpansion(sport)}
                      >
                        <h3 className="text-lg font-bold text-[#005bac]">{sport}</h3>
                        {expandedSports.includes(sport) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>

                      {expandedSports.includes(sport) && (
                        <div className="p-4">
                          {results.map((result, index) => (
                            <ResultCard key={index} result={result} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    検索結果がありません。別のキーワードで検索してください。
                  </div>
                )}
              </div>
            )}

            {/* テーブル表示モード */}
            {viewMode === "table" && (
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-[#005bac] text-white">
                      <th className="py-3 px-4 border text-left whitespace-nowrap">部活動名</th>
                      <th className="py-3 px-4 border text-left whitespace-nowrap">競技名（種目等がある場合）</th>
                      <th className="py-3 px-4 border text-left whitespace-nowrap">順位・結果</th>
                      <th className="py-3 px-4 border text-left whitespace-nowrap">生徒氏名</th>
                      <th className="py-3 px-4 border text-left whitespace-nowrap">備考</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((result, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                          <td className="py-3 px-4 border whitespace-nowrap">{result.sport}</td>
                          <td className="py-3 px-4 border whitespace-nowrap">
                            {result.category && <span className="font-semibold mr-2">{result.category}</span>}
                            {result.event}
                          </td>
                          <td className="py-3 px-4 border whitespace-nowrap">{result.result}</td>
                          <td className="py-3 px-4 border whitespace-nowrap">{result.student || ""}</td>
                          <td className="py-3 px-4 border whitespace-nowrap">{result.note || ""}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-gray-500">
                          検索結果がありません。別のキーワードで検索してください。
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </ScrollReveal>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-block bg-[#005bac] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#004a8c] hover:scale-105 transition-all duration-300"
          >
            トップページに戻る
          </Link>
        </motion.div>
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

export default SportsAchievementsPage
