import { NextRequest, NextResponse } from 'next/server'
import { researchVCFirm } from '@/lib/perplexity'
import { generateMockReport } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    console.log('=== API Route Called ===')
    
    const body = await request.json()
    const { vcFirmName, companyName, contactName } = body
    
    console.log('Request data:', { vcFirmName, companyName, contactName })

    if (!vcFirmName || !companyName) {
      console.log('❌ Missing required fields')
      return NextResponse.json(
        { error: 'VC firm name and company name are required' },
        { status: 400 }
      )
    }

    // Check if Perplexity API key is available
    const hasApiKey = !!process.env.PERPLEXITY_API_KEY
    console.log('🔑 Perplexity API key present:', hasApiKey)
    
    if (!process.env.PERPLEXITY_API_KEY) {
      console.log('📝 Using mock data (no API key)')
      const report = generateMockReport(vcFirmName, companyName, contactName)
      console.log('✅ Mock report generated successfully')
      return NextResponse.json(report, { status: 200 })
    }

    // Use real Perplexity research if API key is available
    console.log('🔍 Using Perplexity for real web-based research')
    try {
      const report = await researchVCFirm(vcFirmName, companyName, contactName)
      console.log('✅ Perplexity report generated successfully')
      return NextResponse.json(report, { status: 200 })
    } catch (perplexityError) {
      console.error('❌ Perplexity research failed:', perplexityError)
      
      // Fallback to mock data if Perplexity fails
      console.log('🔄 Falling back to mock data due to Perplexity error')
      const report = generateMockReport(vcFirmName, companyName, contactName)
      console.log('✅ Fallback mock report generated')
      return NextResponse.json(report, { status: 200 })
    }
    
  } catch (error) {
    console.error('❌ API Error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}