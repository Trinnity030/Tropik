import { useState } from 'react'
import { LoginForm } from './components/login-form.jsx'
import './App.css'

function App() {

  return (
    <>
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      <LoginForm />
      </div>
    </>
  )
}

export default App
