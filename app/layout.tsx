import type React from "react"
import type {Metadata} from "next"
import ClientLayout from "./client-layout"
import "./globals.css"

export const metadata: Metadata = {
    title: "sjl473",
    description: "sjl473's blog",
    generator: 'v0.dev'
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN">
        <body>
        <ClientLayout>{children}</ClientLayout>
        </body>
        </html>
    )
}
