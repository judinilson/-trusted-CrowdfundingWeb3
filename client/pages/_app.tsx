import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CustomProvider } from "../contexts/context";

function MyApp({ Component, pageProps }: AppProps) {
  const { theme, setTheme } = useTheme();
  setTheme("dark");
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <CustomProvider>
        <Component {...pageProps} />
      </CustomProvider>
    </ThemeProvider>
  );
}

export default MyApp;
