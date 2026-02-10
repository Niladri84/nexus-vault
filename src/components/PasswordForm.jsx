import React, { useState } from 'react'

export default function PasswordForm({ onSubmit, initialData, isEditing, onCancel }) {
  const [formData, setFormData] = useState(initialData || {
    website: '',
    username: '',
    password: '',
    notes: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.website.trim()) newErrors.website = 'Website is required'
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (!formData.password.trim()) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData)
      setFormData({
        website: '',
        username: '',
        password: '',
        notes: ''
      })
      setErrors({})
    } else {
      setErrors(newErrors)
    }
  }

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let pwd = ''
    for (let i = 0; i < 16; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData(prev => ({
      ...prev,
      password: pwd
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Website */}
      <div>
        <label className="block text-sm font-mono text-cyan-300 mb-2">
          WEBSITE/SERVICE
        </label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="e.g., Gmail, Twitter, Bank"
          className={`w-full bg-slate-900/50 border rounded-lg px-4 py-3 text-white placeholder-slate-500 font-mono text-sm transition-all ${
            errors.website
              ? 'border-red-500/50 focus:border-red-500'
              : 'border-cyan-500/30 focus:border-cyan-400'
          } focus:bg-slate-800/80 focus:shadow-lg focus:shadow-cyan-500/20`}
        />
        {errors.website && <p className="text-red-400 text-xs mt-1">{errors.website}</p>}
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-mono text-cyan-300 mb-2">
          USERNAME/EMAIL
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Your username or email"
          className={`w-full bg-slate-900/50 border rounded-lg px-4 py-3 text-white placeholder-slate-500 font-mono text-sm transition-all ${
            errors.username
              ? 'border-red-500/50 focus:border-red-500'
              : 'border-cyan-500/30 focus:border-cyan-400'
          } focus:bg-slate-800/80 focus:shadow-lg focus:shadow-cyan-500/20`}
        />
        {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-mono text-cyan-300">
            PASSWORD
          </label>
          <button
            type="button"
            onClick={generatePassword}
            className="text-xs px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-purple-300 hover:bg-purple-500/30 transition-all font-mono"
          >
            Generate
          </button>
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter strong password"
            className={`w-full bg-slate-900/50 border rounded-lg px-4 py-3 text-white placeholder-slate-500 font-mono text-sm transition-all pr-10 ${
              errors.password
                ? 'border-red-500/50 focus:border-red-500'
                : 'border-cyan-500/30 focus:border-cyan-400'
            } focus:bg-slate-800/80 focus:shadow-lg focus:shadow-cyan-500/20`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-mono text-cyan-300 mb-2">
          NOTES (OPTIONAL)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Security questions, recovery codes, etc."
          rows="3"
          className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-500 font-mono text-sm transition-all focus:border-cyan-400 focus:bg-slate-800/80 focus:shadow-lg focus:shadow-cyan-500/20"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-bold py-3 rounded-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 text-center"
        >
          {isEditing ? '💾 UPDATE' : '💾 ADD PASSWORD'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-3 rounded-lg transition-all border border-slate-600 hover:border-slate-500"
          >
            CANCEL
          </button>
        )}
      </div>
    </form>
  )
}