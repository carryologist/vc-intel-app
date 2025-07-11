'use client'

import { useState } from 'react'
import { ResearchForm } from '@/components/ResearchForm'
import { ResearchResults } from '@/components/ResearchResults'
import { PrintButton } from '@/components/PrintButton'
import { VCResearchReport } from '@/types'

export default function Home() {
  const [report, setReport] = useState<VCResearchReport | null>(null)
  const [loading, setLoading] = useState(false)

  const handleResearch = async (vcFirmName: string, companyName: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vcFirmName, companyName }),
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 print-container">
        <div className="text-center mb-12 no-print">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VC Intel App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Research venture capital firms with AI-powered insights before your investor meetings
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="no-print">
            <ResearchForm onSubmit={handleResearch} loading={loading} />
          </div>
          
          {report && (
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6 no-print">
                <h2 className="text-2xl font-bold text-gray-900">
                  Research Report
                </h2>
                <PrintButton disabled={loading} />
              </div>
              <ResearchResults report={report} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}