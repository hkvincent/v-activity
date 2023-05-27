import { Inter } from 'next/font/google'
import MainHeader from './main-header'
import { Fragment } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'V activitiy',
  description: 'find your activity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title> vincent website</title>
      </head>
      <body className={inter.className}>
        <Fragment>
          <MainHeader />
          <div id='overlay' />
          <main> {children}</main>
        </Fragment>
      </body>
    </html>
  )
}
