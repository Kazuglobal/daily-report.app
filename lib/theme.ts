// アプリケーション全体で使用するテーマカラーとスタイル
export const theme = {
  colors: {
    primary: {
      main: "#1E40AF", // より深みのあるブルー
      light: "#3B82F6",
      dark: "#1E3A8A",
      contrast: "#ffffff",
    },
    secondary: {
      main: "#F59E0B", // ゴールド→より鮮やかなアンバー
      light: "#FBBF24",
      dark: "#D97706",
      contrast: "#000000",
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
      accent: "#EFF6FF",
    },
    text: {
      primary: "#111827",
      secondary: "#4B5563",
      disabled: "#9CA3AF",
    },
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
  borderRadius: {
    small: "0.375rem",
    medium: "0.5rem",
    large: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  shadows: {
    small: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    large: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  typography: {
    fontFamily: "'Noto Sans JP', 'Helvetica Neue', Arial, sans-serif",
  },
  spacing: (value: number) => `${value * 0.25}rem`,
}
