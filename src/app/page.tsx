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
    console.log('🚀 [CLIENT] Starting research request...')
    console.log('🚀 [CLIENT] Parameters:', { vcFirmName, companyName, contactName })
    console.log('🚀 [CLIENT] Timestamp:', new Date().toISOString())
    
    setLoading(true)
    const startTime = Date.now()
    
    try {
      console.log('📤 [CLIENT] Making fetch request to /api/research')
      
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vcFirmName, companyName, contactName }),
      })
      
      const endTime = Date.now()
      const duration = endTime - startTime
      
      console.log('📥 [CLIENT] Response received:')
      console.log('📥 [CLIENT] Status:', response.status)
      console.log('📥 [CLIENT] Status Text:', response.statusText)
      console.log('📥 [CLIENT] Headers:', Object.fromEntries(response.headers.entries()))
      console.log('📥 [CLIENT] Duration:', duration, 'ms')
      console.log('📥 [CLIENT] OK:', response.ok)

      if (!response.ok) {
        console.error('❌ [CLIENT] Response not OK')
        
        let errorData
        try {
          errorData = await response.json()
          console.error('❌ [CLIENT] Error response data:', errorData)
        } catch (parseError) {
          console.error('❌ [CLIENT] Failed to parse error response:', parseError)
          errorData = { error: 'Unknown server error' }
        }
        
        const errorMessage = errorData?.error || errorData?.details || `HTTP ${response.status}: ${response.statusText}`
        console.error('❌ [CLIENT] Throwing error:', errorMessage)
        throw new Error(errorMessage)
      }

      console.log('📦 [CLIENT] Parsing response data...')
      const data = await response.json()
      console.log('✅ [CLIENT] Data received successfully')
      console.log('📦 [CLIENT] Data keys:', Object.keys(data))
      console.log('📦 [CLIENT] Firm name in response:', data?.firmProfile?.name)
      
      setReport(data)
      console.log('✅ [CLIENT] Research completed successfully')
      
    } catch (error) {
      const endTime = Date.now()
      const duration = endTime - startTime
      
      console.error('❌ [CLIENT] Research error occurred:')
      console.error('❌ [CLIENT] Error type:', error instanceof Error ? error.constructor.name : typeof error)
      console.error('❌ [CLIENT] Error message:', error instanceof Error ? error.message : 'Unknown error')
      console.error('❌ [CLIENT] Error stack:', error instanceof Error ? error.stack : 'No stack trace')
      console.error('❌ [CLIENT] Duration before error:', duration, 'ms')
      console.error('❌ [CLIENT] Full error object:', error)
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('🌐 [CLIENT] Network error detected')
        alert('Network error: Unable to connect to the server. Please check your internet connection and try again.')
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        console.error('❌ [CLIENT] Showing error to user:', errorMessage)
        alert(`Failed to research VC firm: ${errorMessage}. Please try again.`)
      }
    } finally {
      setLoading(false)
      console.log('🏁 [CLIENT] Research request completed (loading set to false)')
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