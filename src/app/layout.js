import '@/app/global.css'

export const metadata = {
  title: 'Laravel',
}
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-100">{children}</body>
    </html>
  )
}

export default RootLayout
