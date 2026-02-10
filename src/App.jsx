import React, { useState, useEffect } from 'react'
import PasswordForm from './components/PasswordForm'
import PasswordList from './components/PasswordList'
import './App.css'

export default function App() {
  const [passwords, setPasswords] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editingData, setEditingData] = useState(null)
  const [saveStatus, setSaveStatus] = useState('')

  // Load passwords from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cyber_vault_passwords')
    if (stored) {
      setPasswords(JSON.parse(stored))
    }
  }, [])

  // Save passwords to localStorage
  const saveToStorage = (updatedPasswords) => {
    localStorage.setItem('cyber_vault_passwords', JSON.stringify(updatedPasswords))
    setSaveStatus('Saved')
    setTimeout(() => setSaveStatus(''), 2000)
  }

  const handleAddPassword = (data) => {
    const newPassword = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toLocaleString()
    }
    const updated = [...passwords, newPassword]
    setPasswords(updated)
    saveToStorage(updated)
  }

  const handleEditPassword = (id) => {
    const password = passwords.find(p => p.id === id)
    setEditingId(id)
    setEditingData(password)
  }

  const handleSaveEdit = (data) => {
    const updated = passwords.map(p =>
      p.id === editingId ? { ...p, ...data } : p
    )
    setPasswords(updated)
    saveToStorage(updated)
    setEditingId(null)
    setEditingData(null)
  }

  const handleDeletePassword = (id) => {
    const updated = passwords.filter(p => p.id !== id)
    setPasswords(updated)
    saveToStorage(updated)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 relative overflow-hidden">
      {/* Sci-fi background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,200,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,200,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                CYBER VAULT
              </h1>
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
            <p className="text-cyan-300/60 tracking-widest text-sm font-mono">Encrypted Password Repository v1.0</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div>
              <div className="border border-cyan-500/20 rounded-lg backdrop-blur-sm bg-slate-800/30 p-6 shadow-2xl shadow-cyan-500/10 relative group">
                <div className="absolute inset-0 border border-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative z-20">
                  <h2 className="text-xl font-bold text-cyan-300 mb-6 flex items-center gap-2">
                    <span className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500"></span>
                    {editingId ? 'EDIT ENTRY' : 'NEW ENTRY'}
                  </h2>
                  {editingId ? (
                    <PasswordForm
                      onSubmit={handleSaveEdit}
                      initialData={editingData}
                      isEditing={true}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    <PasswordForm onSubmit={handleAddPassword} />
                  )}
                </div>
              </div>
            </div>

            {/* Passwords List Section */}
            <div>
              <div className="border border-purple-500/20 rounded-lg backdrop-blur-sm bg-slate-800/30 p-6 shadow-2xl shadow-purple-500/10 relative group h-full">
                <div className="absolute inset-0 border border-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative z-20">
                  <h2 className="text-xl font-bold text-purple-300 mb-6 flex items-center gap-2">
                    <span className="w-1 h-4 bg-gradient-to-b from-purple-400 to-pink-500"></span>
                    VAULT ENTRIES ({passwords.length})
                  </h2>
                  <PasswordList
                    passwords={passwords}
                    onEdit={handleEditPassword}
                    onDelete={handleDeletePassword}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Status Indicator */}
          {saveStatus && (
            <div className="fixed bottom-8 right-8 bg-green-500/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-green-500/50 animate-pulse">
              ✓ {saveStatus}
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-12 text-center text-cyan-400/40 text-xs font-mono tracking-wider">
            <p>All data is stored locally in your browser. No external connections.</p>
          </div>
        </div>
      </div>
    </div>
  )
}