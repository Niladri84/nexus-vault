import React, { useState } from 'react'

export default function PasswordList({ passwords, onEdit, onDelete }) {
  const [copiedId, setCopiedId] = useState(null)
  const [revealedId, setRevealedId] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (passwords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <p className="text-slate-400 font-mono text-sm">
          No passwords stored yet
        </p>
        <p className="text-slate-500 font-mono text-xs mt-2">
          Add your first password to begin
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
      {passwords.map(pwd => (
        <div
          key={pwd.id}
          className="bg-slate-800/40 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-all hover:bg-slate-800/60 group"
        >
          {/* Website & Controls */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <p className="text-purple-300 font-bold text-sm font-mono">
                {pwd.website}
              </p>
              <p className="text-slate-400 text-xs font-mono mt-1">
                {pwd.createdAt}
              </p>
            </div>
            <div className="flex gap-2 ml-2">
              <button
                onClick={() => onEdit(pwd.id)}
                className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded hover:bg-cyan-500/20 hover:border-cyan-500/60 transition-all text-cyan-400 hover:text-cyan-300 text-sm"
                title="Edit"
              >
                ✎
              </button>
              <button
                onClick={() => onDelete(pwd.id)}
                className="p-2 bg-red-500/10 border border-red-500/30 rounded hover:bg-red-500/20 hover:border-red-500/60 transition-all text-red-400 hover:text-red-300 text-sm"
                title="Delete"
              >
                🗑
              </button>
            </div>
          </div>

          {/* Username */}
          <div className="mb-3">
            <p className="text-slate-500 text-xs font-mono mb-1">Username:</p>
            <div className="flex items-center justify-between bg-slate-900/50 rounded px-3 py-2 border border-slate-700/50">
              <p className="text-slate-300 text-sm font-mono truncate">
                {pwd.username}
              </p>
              <button
                onClick={() => copyToClipboard(pwd.username, `user-${pwd.id}`)}
                className="ml-2 text-slate-400 hover:text-slate-300 transition-colors text-xs"
                title="Copy"
              >
                {copiedId === `user-${pwd.id}` ? '✓' : '📋'}
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <p className="text-slate-500 text-xs font-mono mb-1">Password:</p>
            <div className="flex items-center justify-between bg-slate-900/50 rounded px-3 py-2 border border-slate-700/50">
              <p className="text-slate-300 text-sm font-mono truncate">
                {revealedId === pwd.id ? pwd.password : '•'.repeat(pwd.password.length)}
              </p>
              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => setRevealedId(revealedId === pwd.id ? null : pwd.id)}
                  className="text-slate-400 hover:text-slate-300 transition-colors text-xs"
                  title="Show/Hide"
                >
                  {revealedId === pwd.id ? '👁️' : '👁️‍🗨️'}
                </button>
                <button
                  onClick={() => copyToClipboard(pwd.password, `pass-${pwd.id}`)}
                  className="text-slate-400 hover:text-slate-300 transition-colors text-xs"
                  title="Copy"
                >
                  {copiedId === `pass-${pwd.id}` ? '✓' : '📋'}
                </button>
              </div>
            </div>
          </div>

          {/* Notes */}
          {pwd.notes && (
            <div className="mb-2">
              <p className="text-slate-500 text-xs font-mono mb-1">Notes:</p>
              <p className="text-slate-400 text-xs bg-slate-900/50 rounded px-3 py-2 border border-slate-700/50 max-h-16 overflow-y-auto">
                {pwd.notes}
              </p>
            </div>
          )}
        </div>
      ))}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </div>
  )
}