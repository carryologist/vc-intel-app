import { NextRequest, NextResponse } from 'next/server'
import { researchVCFirm } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { vcFirmName, companyName } = await request.json()

    if (!vcFirmName || !companyName) {
      return NextResponse.json(
        { error: 'VC firm name and company name are required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const report = await researchVCFirm(vcFirmName, companyName)
    
    return NextResponse.json(report)
  } catch (error) {
    console.error('Research API error:', error)
    return NextResponse.json(
      { error: 'Failed to research VC firm' },
      { status: 500 }
    )
  }
}