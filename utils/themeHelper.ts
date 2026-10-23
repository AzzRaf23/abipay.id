export const applyActiveTheme = (themeData?: any) => {
  if (typeof window === "undefined") return null;

  let theme = themeData;
  if (!theme) {
    const saved = localStorage.getItem("revo_active_theme");
    if (saved) {
      try {
        theme = JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing theme", e);
      }
    }
  }

  if (theme) {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", theme.primaryColor || theme.colorPrimary || "#00A3FF");
    root.style.setProperty("--color-bg-main", theme.bgMain || theme.colorBgMain || "#0B0F17");
    root.style.setProperty("--color-bg-card", theme.bgCard || theme.colorBgCard || "#1E293B");
    root.style.setProperty("--color-accent", theme.accentColor || theme.colorAccent || "#38BDF8");
    root.style.setProperty("--color-text-main", theme.textColor || theme.colorTextMain || "#FFFFFF");
    root.style.setProperty("--color-text-muted", theme.textMuted || theme.colorTextMuted || "#94A3B8");
    root.style.setProperty("--color-border", theme.borderColor || theme.colorBorder || "#334155");
    root.style.setProperty("--color-input-bg", theme.inputBgColor || theme.colorInputBg || "#0B0F17");
  }

  return theme;
};