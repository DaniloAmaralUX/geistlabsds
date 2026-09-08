import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Pesquisa · LAB / DESIGN",
  description:
    "A trajetória da pesquisa do LAB / DESIGN, do problema inicial ao Geist Labs DS, como uma única linha do tempo.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} h-full font-sans antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
