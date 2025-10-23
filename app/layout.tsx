import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WealthEase - 个人博客',
  description: '分享财富管理、投资理财和个人成长的知识与经验',
  keywords: ['财富管理', '投资理财', '个人成长', '博客'],
  authors: [{ name: 'WealthEase' }],
  openGraph: {
    title: 'WealthEase - 个人博客',
    description: '分享财富管理、投资理财和个人成长的知识与经验',
    url: 'https://wealthease.top',
    siteName: 'WealthEase',
    locale: 'zh_CN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}