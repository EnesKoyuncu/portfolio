import { Spin } from "antd";
import { useTheme } from "../../hooks/useTheme";

export default function LoadingSpin() {
  const { theme } = useTheme();
  return (
    <div
      className={`hero-main-${theme}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Spin size="large" />
    </div>
  );
}
