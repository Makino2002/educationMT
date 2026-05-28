import "./globals.scss";
import StoreProvider from "../providers/StoreProvider";
import AuthProvider from "../providers/AuthProvider";
import Toaster from "../components/Toast";

export const metadata = {
  title: "Education MT | Lộ trình cá nhân hóa bởi AI",
  description: "Hệ điều hành học tập cá nhân hóa bởi AI. Bắt đầu với bài test đầu vào để AI phân tích năng lực của bạn.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <StoreProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" theme="dark" />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
