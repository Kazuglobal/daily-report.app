"use client"

import { useState } from "react"

interface StatusUpdateProps {
  ticketId: number
  currentStatus: string
  onStatusUpdated: () => void
}

export default function StatusUpdate({ ticketId, currentStatus, onStatusUpdated }: StatusUpdateProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const updateStatus = async () => {
    if (status === currentStatus) return

    setIsUpdating(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ type: "success", text: "ステータスを更新しました" })
        onStatusUpdated()
      } else {
        setMessage({ type: "error", text: data.message || "更新に失敗しました" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "エラーが発生しました" })
      console.error("Status update error:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          disabled={isUpdating}
        >
          <option value="pending">保留中</option>
          <option value="confirmed">確認済</option>
          <option value="paid">入金済</option>
          <option value="cancelled">キャンセル</option>
        </select>
        <button
          onClick={updateStatus}
          disabled={isUpdating || status === currentStatus}
          className={`px-2 py-1 rounded-md text-xs ${
            status === currentStatus
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isUpdating ? (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "更新"
          )}
        </button>
      </div>
      {message && (
        <div className={`text-xs flex items-center ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.type === "success" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {message.text}
        </div>
      )}
    </div>
  )
}
