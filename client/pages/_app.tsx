import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const { theme, setTheme } = useTheme();
  setTheme("dark");
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
