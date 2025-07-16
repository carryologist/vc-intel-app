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
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Research a VC Firm
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="vcFirm" className="block text-sm font-medium text-gray-700 mb-2">
            Venture Capital Firm Name
          </label>
          <input
            type="text"
            id="vcFirm"
            value={vcFirmName}
            onChange={(e) => setVcFirmName(e.target.value)}
            placeholder="e.g., Andreessen Horowitz, Sequoia Capital"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Your Company Name
          </label>
          <input
            type="text"
            id="company"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g., Your Startup Inc."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
            Contact Person (Optional)
          </label>
          <input
            type="text"
            id="contact"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="e.g., John Smith, Partner"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter the name and title of the person you're meeting with for personalized insights
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !vcFirmName.trim() || !companyName.trim()}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Researching...
            </div>
          ) : (
            'Start Research'
          )}
        </button>
      </form>
    </div>
  )
}