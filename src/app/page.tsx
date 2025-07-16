'use client'

import { useState } from 'react'
import { ResearchForm } from '@/components/ResearchForm'
import { ResearchResults } from '@/components/ResearchResults'
import { PrintButton } from '@/components/PrintButton'
import { VCResearchReport } from '@/types'

export default function Home() {
  const [report, setReport] = useState<VCResearchReport | null>(null)
  const [loading, setLoading] = useState(false)

  const handleResearch = async (vcFirmName: string, companyName: string, contactName?: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vcFirmName, companyName, contactName }),
      })

      if (!response.ok) {
        throw new Error('Research failed')
      }

      const data = await response.json()
      setReport(data)
    } catch (error) {
      console.error('Research error:', error)
      alert('Failed to research VC firm. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 print-container">
        <div className="text-center mb-16 no-print">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            VC Intel App
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Research venture capital firms with AI-powered insights before your investor meetings
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="no-print">
            <ResearchForm onSubmit={handleResearch} loading={loading} />
          </div>
          
          {report && (
            <div className="mt-16">
              <div className="flex justify-between items-center mb-8 no-print">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Research Complete
                  </h2>
                </div>
                <PrintButton disabled={loading} />
              </div>
              <ResearchResults report={report} />
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16 no-print">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            Imagined by{' '}
            <a 
              href="https://github.com/carryologist" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              carryologist
            </a>
            . Built by{' '}
            <a 
              href="https://blink.so" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Blink
            </a>
            .
          </p>
        </div>
      </footer>
    </main>
  )
}