import { NextRequest, NextResponse } from 'next/server'

// Simple mock data function (inline to avoid import issues)
function generateSimpleMockReport(vcFirmName: string, companyName: string) {
  return {
    firmProfile: {
      name: vcFirmName,
      description: `${vcFirmName} is a leading venture capital firm.`,
      founded: "2010",
      location: "San Francisco, CA",
      website: `https://www.${vcFirmName.toLowerCase().replace(/\s+/g, '')}.com`,
      focusAreas: ["SaaS", "AI/ML", "Fintech"],
      typicalInvestmentSize: "$1M - $10M",
      stage: ["Seed", "Series A"],
      notableInvestments: [],
      keyPartners: []
    },
    recentNews: [],
    recentInvestments: [],
    competitiveAnalysis: [],
    alternativeVCs: [],
    generatedAt: new Date().toISOString()
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('API called')
    
    const body = await request.json()
    const { vcFirmName, companyName } = body
    
    console.log('Data:', { vcFirmName, companyName })

    if (!vcFirmName || !companyName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Always use simple mock data for now
    const report = generateSimpleMockReport(vcFirmName, companyName)
    
    console.log('Report generated successfully')
    return NextResponse.json(report)
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Server error', details: String(error) },
      { status: 500 }
    )
  }
}
