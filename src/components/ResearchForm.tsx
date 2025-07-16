'use client'

import { useState } from 'react'

interface ResearchFormProps {
  onSubmit: (vcFirmName: string, companyName: string, contactName?: string) => void
  loading: boolean
}

export function ResearchForm({ onSubmit, loading }: ResearchFormProps) {
  const [vcFirmName, setVcFirmName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (vcFirmName.trim() && companyName.trim()) {
      onSubmit(vcFirmName.trim(), companyName.trim(), contactName.trim() || undefined)
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Research a VC Firm
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label htmlFor="vcFirm" className="block text-sm font-semibold text-gray-700 mb-3">
            💼 Venture Capital Firm Name
          </label>
          <input
            type="text"
            id="vcFirm"
            value={vcFirmName}
            onChange={(e) => setVcFirmName(e.target.value)}
            placeholder="e.g., Andreessen Horowitz, Sequoia Capital"
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-300"
            required
            disabled={loading}
          />
        </div>

        <div className="group">
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-3">
            🏢 Your Company Name
          </label>
          <input
            type="text"
            id="company"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g., Your Startup Inc."
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-300"
            required
            disabled={loading}
          />
        </div>

        <div className="group">
          <label htmlFor="contact" className="block text-sm font-semibold text-gray-700 mb-3">
            👤 Contact Person (Optional)
          </label>
          <input
            type="text"
            id="contact"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="e.g., John Smith, Partner"
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-300"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Enter the name and title of the person you're meeting with for personalized insights
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !vcFirmName.trim() || !companyName.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              <span>Researching...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Start Research</span>
            </div>
          )}
        </button>
      </form>
    </div>
  )
}