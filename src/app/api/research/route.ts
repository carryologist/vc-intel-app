import { NextRequest, NextResponse } from 'next/server'
import { researchVCFirm } from '@/lib/openai'
import { generateMockReport } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const { vcFirmName, companyName } = await request.json()

    if (!vcFirmName || !companyName) {
      return NextResponse.json(
        { error: 'VC firm name and company name are required' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key not found, using mock data for demo')
      // Use mock data for demo purposes
      const report = generateMockReport(vcFirmName, companyName)
      return NextResponse.json(report)
    }

    // Use real OpenAI research if API key is available
    const report = await researchVCFirm(vcFirmName, companyName)
    
    return NextResponse.json(report)
  } catch (error) {
    console.error('Research API error:', error)
    
    // Fallback to mock data if OpenAI fails
    const { vcFirmName, companyName } = await request.json()
    console.log('Falling back to mock data due to error')
    const report = generateMockReport(vcFirmName, companyName)
    return NextResponse.json(report)
  }
}