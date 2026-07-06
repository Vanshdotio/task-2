import React from 'react'
import { FavoriteProvider } from './context/FavoriteContext'
import { ThemeProvider } from './context/ThemeContext'
import AppRoute from './routes/AppRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <ThemeProvider>
      <FavoriteProvider>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <AppRoute />
          </main>
          <Footer />
        </div>
      </FavoriteProvider>
    </ThemeProvider>
  )
}

export default App