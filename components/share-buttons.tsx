"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Twitter, Facebook, Share2, Copy, CheckCircle2 } from "lucide-react"

interface ShareButtonsProps {
  title: string
  description: string
  url: string
  hashtags?: string[]
}

export default function ShareButtons({ title, description, url, hashtags = [] }: ShareButtonsProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [copied, setCopied] = useState(false)

  // エンコードされたパラメータを準備
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const encodedUrl = encodeURIComponent(url)
  const encodedHashtags = hashtags.join(",")

  // Twitter共有URL
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=${encodedHashtags}`

  // Facebook共有URL
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`

  // LINE共有URL
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`

  // URLをクリップボードにコピー
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      (err) => {
        console.error("クリップボードへのコピーに失敗しました: ", err)
      },
    )
  }

  // シェアボタンを表示/非表示
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip)
  }

  return (
    <div className="relative">
      <motion.button
        onClick={toggleTooltip}
        className="flex items-center justify-center bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="シェアする"
      >
        <Share2 size={20} />
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl p-3 z-10 flex space-x-2 border border-gray-100"
          >
            {/* Twitter */}
            <motion.a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#1DA1F2] text-white p-2 rounded-full hover:bg-[#0c85d0] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Twitterでシェア"
            >
              <Twitter size={18} />
            </motion.a>

            {/* Facebook */}
            <motion.a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#4267B2] text-white p-2 rounded-full hover:bg-[#365899] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Facebookでシェア"
            >
              <Facebook size={18} />
            </motion.a>

            {/* LINE */}
            <motion.a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#06C755] text-white p-2 rounded-full hover:bg-[#05a847] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LINEでシェア"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988-2.595c.129 0 .234.105.234.234v4.153h2.287c.129 0 .233.104.233.233v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.119-.025-.161-.065-.043-.041-.072-.098-.072-.161v-5.235c0-.129.104-.233.233-.233h.842zm14.992 0c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.883h2.287c.129 0 .233.105.233.234v.842c0 .129-.104.233-.233.233h-2.287v.884h2.287c.129 0 .233.105.233.233v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.12-.025-.162-.065-.042-.041-.07-.098-.07-.161v-5.235c0-.062.028-.121.072-.162.042-.04.099-.065.16-.065h3.363zm-10.026.001c.129 0 .233.104.233.233v5.236c0 .129-.104.233-.233.233h-.842c-.129 0-.233-.104-.233-.233v-5.236c0-.129.104-.233.233-.233h.842zm2.055 0c.129 0 .234.104.234.233v5.236c0 .129-.105.233-.234.233h-.841c-.13 0-.234-.104-.234-.233v-3.373l-1.12 1.539c-.022.031-.058.052-.1.061-.041.009-.082.004-.117-.016l-.479-.335c-.063-.046-.094-.127-.075-.208l1.12-5.243c.02-.085.088-.148.173-.156l.868-.043c.103-.005.194.072.194.176v2.263l.027-.038c.027-.037.069-.06.115-.06h.234z" />
              </svg>
            </motion.a>

            {/* URLコピー */}
            <motion.button
              onClick={copyToClipboard}
              className={`flex items-center justify-center ${
                copied ? "bg-green-500" : "bg-gray-600"
              } text-white p-2 rounded-full hover:bg-gray-700 transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="URLをコピー"
            >
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
