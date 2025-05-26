"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js"
import { Bar, Pie } from "react-chartjs-2"
import Link from "next/link"
import Header from "@/components/header"
import ScrollReveal from "@/components/scroll-reveal"
import PageTransition from "@/components/page-transition"
import ShareButtons from "@/components/share-buttons"

// ChartJSの登録
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement)

const CareerPathsPage = () => {
  // 現在のURLを取得（クライアントサイドでのみ実行）
  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin
    }
    return "https://example.com" // フォールバックURL
  }

  // タブの状態管理
  const [activeTab, setActiveTab] = useState("summary")

  // タブ切り替え関数
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // 進学・就職状況のデータ
  const careerStatusData = {
    labels: ["大学", "短大", "専修学校", "就職者", "予備校", "その他"],
    datasets: [
      {
        label: "男子",
        data: [78, 0, 5, 1, 6, 0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "女子",
        data: [113, 4, 8, 2, 6, 1],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  }

  // 進学率のデータ
  const progressionRateData = {
    labels: ["男子", "女子", "全体"],
    datasets: [
      {
        label: "60回生 進学率(%)",
        data: [86.7, 87.3, 87.1],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "59回生 進学率(%)",
        data: [92.7, 84.1, 87.6],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  }

  // 上級学校合格者実数のデータ
  const advancedSchoolData = {
    labels: ["国公立大", "私立大", "準大", "公立短大", "私立短大", "専修・各種"],
    datasets: [
      {
        label: "60回生 男子",
        data: [63, 53, 0, 0, 0, 6],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "60回生 女子",
        data: [57, 85, 1, 4, 0, 10],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "59回生 男子",
        data: [60, 58, 1, 0, 0, 2],
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderColor: "rgba(54, 162, 235, 0.7)",
        borderWidth: 1,
      },
      {
        label: "59回生 女子",
        data: [63, 77, 2, 9, 0, 17],
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderColor: "rgba(255, 99, 132, 0.7)",
        borderWidth: 1,
      },
    ],
  }

  // 国公立大学合格者数と割合の推移データ
  const nationalUniversityTrendData = {
    labels: [
      "50回生",
      "51回生",
      "52回生",
      "53回生",
      "54回生",
      "55回生",
      "56回生",
      "57回生",
      "58回生",
      "59回生",
      "60回生",
    ],
    datasets: [
      {
        label: "合格者数(人)",
        data: [108, 110, 127, 106, 104, 113, 120, 131, 116, 123, 120],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        type: "bar",
        yAxisID: "y",
      },
      {
        label: "割合(%)",
        data: [46.6, 46.8, 54.7, 44.9, 44.6, 47.7, 51.1, 56.7, 50.4, 52.6, 53.6],
        backgroundColor: "rgba(255, 99, 132, 0)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        type: "line",
        yAxisID: "y1",
      },
    ],
  }

  // 60回生の進路状況円グラフデータ
  const careerPieData = {
    labels: ["大学・短大", "専修学校", "就職者", "予備校", "その他"],
    datasets: [
      {
        data: [195, 13, 3, 12, 1],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
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
            進路状況
          </motion.h1>
          <motion.p
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            令和６年度卒業生（６０回生）進路状況集計結果
          </motion.p>
        </div>
      </motion.div>

      <main className="container mx-auto w-[90%] max-w-7xl py-10">
        {/* タブナビゲーション */}
        <div className="mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            <button
              className={`px-4 py-2 font-medium text-sm md:text-base rounded-t-lg transition-colors duration-300 ${
                activeTab === "summary" ? "bg-[#005bac] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange("summary")}
            >
              概要
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm md:text-base rounded-t-lg transition-colors duration-300 ${
                activeTab === "details" ? "bg-[#005bac] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange("details")}
            >
              詳細データ
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm md:text-base rounded-t-lg transition-colors duration-300 ${
                activeTab === "trends" ? "bg-[#005bac] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange("trends")}
            >
              推移
            </button>
          </div>
        </div>

        {/* 概要タブ */}
        {activeTab === "summary" && (
          <ScrollReveal>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">
                  令和６年度卒業生（６０回生）進路状況概要
                </h2>
                <ShareButtons
                  title="八戸北高校 令和６年度卒業生進路状況"
                  description="八戸北高校の令和６年度卒業生（６０回生）の進路状況をご覧ください。"
                  url={`${getBaseUrl()}/career-paths`}
                  hashtags={["八戸北高校", "進路状況", "60回生"]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-[#005bac] mb-4">進路状況分布</h3>
                  <div className="h-[300px] md:h-[400px]">
                    <Pie
                      data={careerPieData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                          tooltip: {
                            callbacks: {
                              label: (context) => {
                                const label = context.label || ""
                                const value = context.raw as number
                                const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0)
                                const percentage = Math.round((value / total) * 100)
                                return `${label}: ${value}人 (${percentage}%)`
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#005bac] mb-4">進学率比較</h3>
                  <div className="h-[300px] md:h-[400px]">
                    <Bar
                      data={progressionRateData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                              display: true,
                              text: "進学率(%)",
                            },
                          },
                        },
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-[#005bac] mb-2">進路状況サマリー</h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-semibold">卒業者数:</span> 224名（男子90名、女子134名）
                  </li>
                  <li>
                    <span className="font-semibold">大学・短大進学者:</span> 195名（87.1%）
                  </li>
                  <li>
                    <span className="font-semibold">国公立大学合格者:</span> 120名（卒業生の53.6%）
                  </li>
                  <li>
                    <span className="font-semibold">私立大学合格者:</span> 138名
                  </li>
                </ul>
              </div>

              <p className="text-gray-700">
                令和６年度卒業生（６０回生）の進路状況は、大学・短大への進学率が87.1%と高い水準を維持しています。国公立大学への合格者は120名で、卒業生の53.6%を占めています。詳細データタブでは男女別の詳細な進路状況を、推移タブでは過去11年間の国公立大学合格状況の推移をご覧いただけます。
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* 詳細データタブ */}
        {activeTab === "details" && (
          <ScrollReveal>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">
                  進学・就職状況の詳細データ
                </h2>
                <ShareButtons
                  title="八戸北高校 進学・就職状況の詳細データ"
                  description="八戸北高校の進学・就職状況の詳細データをご覧ください。"
                  url={`${getBaseUrl()}/career-paths?tab=details`}
                  hashtags={["八戸北高校", "進路状況", "進学", "就職"]}
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#005bac] mb-4">進学・就職状況（６０回生）</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 mb-4">
                    <thead>
                      <tr className="bg-[#005bac] text-white">
                        <th className="py-3 px-4 border text-left"></th>
                        <th className="py-3 px-4 border text-center" colSpan={3}>
                          進 学 者
                        </th>
                        <th className="py-3 px-4 border text-center">就職者</th>
                        <th className="py-3 px-4 border text-center">予備校</th>
                        <th className="py-3 px-4 border text-center">その他</th>
                        <th className="py-3 px-4 border text-center">卒業者数</th>
                      </tr>
                      <tr className="bg-[#005bac] text-white">
                        <th className="py-3 px-4 border text-left"></th>
                        <th className="py-3 px-4 border text-center">大学</th>
                        <th className="py-3 px-4 border text-center">短大</th>
                        <th className="py-3 px-4 border text-center">専修学校</th>
                        <th className="py-3 px-4 border text-center"></th>
                        <th className="py-3 px-4 border text-center"></th>
                        <th className="py-3 px-4 border text-center"></th>
                        <th className="py-3 px-4 border text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 border font-semibold">男 子</td>
                        <td className="py-3 px-4 border text-center">78 (89)</td>
                        <td className="py-3 px-4 border text-center">0 (0)</td>
                        <td className="py-3 px-4 border text-center">5 (2)</td>
                        <td className="py-3 px-4 border text-center">1 (2)</td>
                        <td className="py-3 px-4 border text-center">6 (3)</td>
                        <td className="py-3 px-4 border text-center">0 (0)</td>
                        <td className="py-3 px-4 border text-center">90 (96)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-4 border font-semibold">女 子</td>
                        <td className="py-3 px-4 border text-center">113 (113)</td>
                        <td className="py-3 px-4 border text-center">4 (3)</td>
                        <td className="py-3 px-4 border text-center">8 (16)</td>
                        <td className="py-3 px-4 border text-center">2 (1)</td>
                        <td className="py-3 px-4 border text-center">6 (3)</td>
                        <td className="py-3 px-4 border text-center">1 (2)</td>
                        <td className="py-3 px-4 border text-center">134 (138)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border font-semibold">合 計</td>
                        <td className="py-3 px-4 border text-center">191 (202)</td>
                        <td className="py-3 px-4 border text-center">4 (3)</td>
                        <td className="py-3 px-4 border text-center">13 (18)</td>
                        <td className="py-3 px-4 border text-center">3 (3)</td>
                        <td className="py-3 px-4 border text-center">12 (6)</td>
                        <td className="py-3 px-4 border text-center">1 (2)</td>
                        <td className="py-3 px-4 border text-center">224 (234)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-4 border font-semibold">進学率％</td>
                        <td className="py-3 px-4 border text-center" colSpan={2}>
                          87.1 (87.6)
                        </td>
                        <td className="py-3 px-4 border text-center" colSpan={5}></td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-sm text-gray-600 mb-6">注・・・（　）内は５９回生、準大学は大学に含めている。</p>
                </div>

                <div className="h-[400px] mb-8">
                  <Bar
                    data={careerStatusData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "人数",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "進学・就職状況（６０回生）",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#005bac] mb-4">上級学校合格者実数</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 mb-4">
                    <thead>
                      <tr className="bg-[#005bac] text-white">
                        <th className="py-3 px-4 border text-left" rowSpan={2}></th>
                        <th className="py-3 px-4 border text-center" colSpan={3}>
                          令和7年3月［60回生］
                        </th>
                        <th className="py-3 px-4 border text-center" colSpan={3}>
                          令和6年3月［59回生］
                        </th>
                        <th className="py-3 px-4 border text-center" colSpan={3}>
                          令和5年3月［58回生］
                        </th>
                      </tr>
                      <tr className="bg-[#005bac] text-white">
                        <th className="py-3 px-4 border text-center">男</th>
                        <th className="py-3 px-4 border text-center">女</th>
                        <th className="py-3 px-4 border text-center">計</th>
                        <th className="py-3 px-4 border text-center">男</th>
                        <th className="py-3 px-4 border text-center">女</th>
                        <th className="py-3 px-4 border text-center">計</th>
                        <th className="py-3 px-4 border text-center">男</th>
                        <th className="py-3 px-4 border text-center">女</th>
                        <th className="py-3 px-4 border text-center">計</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 border font-semibold">国公立大</td>
                        <td className="py-3 px-4 border text-center">63</td>
                        <td className="py-3 px-4 border text-center">57</td>
                        <td className="py-3 px-4 border text-center">120</td>
                        <td className="py-3 px-4 border text-center">60</td>
                        <td className="py-3 px-4 border text-center">63</td>
                        <td className="py-3 px-4 border text-center">123</td>
                        <td className="py-3 px-4 border text-center">62</td>
                        <td className="py-3 px-4 border text-center">54</td>
                        <td className="py-3 px-4 border text-center">116</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-4 border font-semibold">私立大</td>
                        <td className="py-3 px-4 border text-center">53</td>
                        <td className="py-3 px-4 border text-center">85</td>
                        <td className="py-3 px-4 border text-center">138</td>
                        <td className="py-3 px-4 border text-center">58</td>
                        <td className="py-3 px-4 border text-center">77</td>
                        <td className="py-3 px-4 border text-center">135</td>
                        <td className="py-3 px-4 border text-center">54</td>
                        <td className="py-3 px-4 border text-center">71</td>
                        <td className="py-3 px-4 border text-center">125</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border font-semibold">準大</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">1</td>
                        <td className="py-3 px-4 border text-center">1</td>
                        <td className="py-3 px-4 border text-center">1</td>
                        <td className="py-3 px-4 border text-center">2</td>
                        <td className="py-3 px-4 border text-center">3</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">0</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-4 border font-semibold">公立短大</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">4</td>
                        <td className="py-3 px-4 border text-center">4</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">9</td>
                        <td className="py-3 px-4 border text-center">9</td>
                        <td className="py-3 px-4 border text-center">1</td>
                        <td className="py-3 px-4 border text-center">3</td>
                        <td className="py-3 px-4 border text-center">4</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border font-semibold">私立短大</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">0</td>
                        <td className="py-3 px-4 border text-center">0</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-4 border font-semibold">専修・各種※</td>
                        <td className="py-3 px-4 border text-center">6</td>
                        <td className="py-3 px-4 border text-center">10</td>
                        <td className="py-3 px-4 border text-center">16</td>
                        <td className="py-3 px-4 border text-center">2</td>
                        <td className="py-3 px-4 border text-center">17</td>
                        <td className="py-3 px-4 border text-center">19</td>
                        <td className="py-3 px-4 border text-center">4</td>
                        <td className="py-3 px-4 border text-center">17</td>
                        <td className="py-3 px-4 border text-center">21</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-sm text-gray-600 mb-6">※予備校を含まない、外国の大学・短大を含む。</p>
                </div>

                <div className="h-[400px] mb-8">
                  <Bar
                    data={advancedSchoolData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "人数",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "上級学校合格者実数",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* 推移タブ */}
        {activeTab === "trends" && (
          <ScrollReveal>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">
                  国公立大学合格者数と卒業生に占める割合の推移
                </h2>
                <ShareButtons
                  title="八戸北高校 国公立大学合格者数と卒業生に占める割合の推移"
                  description="八戸北高校の国公立大学合格者数と卒業生に占める割合の推移をご覧ください。"
                  url={`${getBaseUrl()}/career-paths?tab=trends`}
                  hashtags={["八戸北高校", "進路状況", "国公立大学", "合格実績"]}
                />
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white border border-gray-200 mb-4">
                  <thead>
                    <tr className="bg-[#005bac] text-white">
                      <th className="py-3 px-4 border text-left">回生</th>
                      <th className="py-3 px-4 border text-center">合格者数(人)</th>
                      <th className="py-3 px-4 border text-center">割合(%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 border">５０回生</td>
                      <td className="py-3 px-4 border text-center">108</td>
                      <td className="py-3 px-4 border text-center">46.6</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border">５１回生</td>
                      <td className="py-3 px-4 border text-center">110</td>
                      <td className="py-3 px-4 border text-center">46.8</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border">５２回生</td>
                      <td className="py-3 px-4 border text-center">127</td>
                      <td className="py-3 px-4 border text-center">54.7</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border">５３回生</td>
                      <td className="py-3 px-4 border text-center">106</td>
                      <td className="py-3 px-4 border text-center">44.9</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border">５４回生</td>
                      <td className="py-3 px-4 border text-center">104</td>
                      <td className="py-3 px-4 border text-center">44.6</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border">５５回生</td>
                      <td className="py-3 px-4 border text-center">113</td>
                      <td className="py-3 px-4 border text-center">47.7</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border">５６回生</td>
                      <td className="py-3 px-4 border text-center">120</td>
                      <td className="py-3 px-4 border text-center">51.1</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border">５７回生</td>
                      <td className="py-3 px-4 border text-center">131</td>
                      <td className="py-3 px-4 border text-center">56.7</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border">５８回生</td>
                      <td className="py-3 px-4 border text-center">116</td>
                      <td className="py-3 px-4 border text-center">50.4</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border">５９回生</td>
                      <td className="py-3 px-4 border text-center">123</td>
                      <td className="py-3 px-4 border text-center">52.6</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border">６０回生</td>
                      <td className="py-3 px-4 border text-center">120</td>
                      <td className="py-3 px-4 border text-center">53.6</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="h-[500px] mb-8">
                <Bar
                  data={nationalUniversityTrendData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        position: "left",
                        title: {
                          display: true,
                          text: "合格者数(人)",
                        },
                      },
                      y1: {
                        beginAtZero: true,
                        position: "right",
                        grid: {
                          drawOnChartArea: false,
                        },
                        title: {
                          display: true,
                          text: "割合(%)",
                        },
                        min: 0,
                        max: 100,
                      },
                    },
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "国公立大学合格者数と卒業生に占める割合の推移",
                      },
                    },
                  }}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#005bac] mb-2">推移の分析</h3>
                <p className="text-gray-700">
                  過去11年間の国公立大学合格者数と卒業生に占める割合の推移を見ると、５７回生の時に最高値（131名、56.7%）を記録し、その後も50%以上の高い水準を維持しています。６０回生は120名（53.6%）と、前年の５９回生（123名、52.6%）と同程度の実績を残しています。
                </p>
                <p className="text-gray-700 mt-2">
                  全体的な傾向としては、５０回生から６０回生までの11年間で、国公立大学合格者数は平均約116名、卒業生に占める割合は平均約50%となっており、安定した進学実績を示しています。
                </p>
              </div>
            </div>
          </ScrollReveal>
        )}

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

export default CareerPathsPage
