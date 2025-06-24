import { NextRequest, NextResponse } from 'next/server'
import { researchVCFirm } from '@/lib/openai'
import { generateMockReport } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    console.log('=== API Route Called ===')
    
    const body = await request.json()
    const { vcFirmName, companyName } = body
    
    console.log('Request data:', { vcFirmName, companyName })

    if (!vcFirmName || !companyName) {
      console.log('❌ Missing required fields')
      return NextResponse.json(
        { error: 'VC firm name and company name are required' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is available
    const hasApiKey = !!process.env.OPENAI_API_KEY
    console.log('🔑 OpenAI API key present:', hasApiKey)
    
    if (!process.env.OPENAI_API_KEY) {
      console.log('📝 Using mock data (no API key)')
      const report = generateMockReport(vcFirmName, companyName)
      console.log('✅ Mock report generated successfully')
      return NextResponse.json(report, { status: 200 })
    }

    // Use real OpenAI research if API key is available
    console.log('🤖 Using OpenAI for real research')
    try {
      const report = await researchVCFirm(vcFirmName, companyName)
      console.log('✅ OpenAI report generated successfully')
      return NextResponse.json(report, { status: 200 })
    } catch (openaiError) {
      console.error('❌ OpenAI research failed:', openaiError)
      
      // Fallback to mock data if OpenAI fails
      console.log('🔄 Falling back to mock data due to OpenAI error')
      const report = generateMockReport(vcFirmName, companyName)
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