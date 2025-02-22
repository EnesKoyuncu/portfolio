import { Spin } from "antd";
import { useTheme } from "../../hooks/useTheme";
interface LoadingSpinProps {
  mainContainerName: string; // bulunduğu componentteki ana container'ın adını veriyoruz garip şekilde tanstack query kullanımında renk bozulması olabiliyor.
}
const LoadingSpin: React.FC<LoadingSpinProps> = ({ mainContainerName }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`${mainContainerName}-${theme}`}
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
};

export default LoadingSpin;
