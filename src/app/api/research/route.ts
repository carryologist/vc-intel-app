import { NextRequest, NextResponse } from 'next/server'

// Complete mock data function that matches the frontend expectations
function generateCompleteMockReport(vcFirmName: string, companyName: string) {
  // Capitalize names properly
  const properVCName = vcFirmName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
  
  const properCompanyName = companyName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return {
    firmProfile: {
      name: properVCName,
      description: `${properVCName} is a leading venture capital firm focused on early-stage technology investments. Known for their hands-on approach and extensive network, they have a strong track record of supporting innovative startups across various sectors.`,
      founded: "2010",
      location: "San Francisco, CA",
      website: `https://www.${properVCName.toLowerCase().replace(/\s+/g, '')}.com`,
      focusAreas: ["SaaS", "AI/ML", "Fintech", "Enterprise Software", "Developer Tools"],
      typicalInvestmentSize: "$1M - $10M",
      stage: ["Seed", "Series A", "Series B"],
      notableInvestments: [
        {
          companyName: "Stripe",
          amount: "$2M",
          date: "2011-02-01",
          round: "Series A",
          description: "Online payment processing platform",
          exitStatus: "Public",
          exitValue: "$95B valuation (2021)"
        },
        {
          companyName: "Airbnb",
          amount: "$7.2M",
          date: "2009-11-01",
          round: "Series A",
          description: "Home-sharing marketplace platform",
          exitStatus: "Public",
          exitValue: "IPO 2020 - $47B market cap"
        }
      ],
      keyPartners: [
        {
          name: "Marc Andreessen",
          title: "Co-Founder & General Partner",
          focusArea: "Enterprise Software & Developer Tools",
          experience: "Co-founded Netscape, experienced in scaling tech companies",
          relevanceReason: `Strong alignment with ${properCompanyName}'s technology focus and growth stage`
        }
      ]
    },
    recentNews: [
      {
        title: `${properVCName} Announces New $200M Fund for AI Startups`,
        source: "TechCrunch",
        date: "2024-12-15",
        url: "https://techcrunch.com/example",
        summary: `${properVCName} has launched a new fund specifically targeting artificial intelligence and machine learning startups.`
      }
    ],
    recentInvestments: [
      {
        companyName: "DataFlow AI",
        amount: "$5.2M",
        date: "2024-12-01",
        round: "Series A",
        description: "AI-powered data analytics platform for enterprise customers"
      }
    ],
    competitiveAnalysis: [
      {
        companyName: "DataFlow AI",
        similarity: "High",
        reasoning: `Both ${properCompanyName} and DataFlow AI operate in the data/analytics space, potentially targeting similar enterprise customers.`,
        potentialConcerns: [
          "Direct competition for enterprise clients",
          "Similar technology stack and approach"
        ]
      }
    ],
    alternativeVCs: [
      {
        name: "Innovation Ventures",
        reasoning: "Strong track record in similar stage companies with complementary portfolio",
        focusAlignment: `Excellent alignment with ${properCompanyName}'s sector and growth stage`,
        contactInfo: "partners@innovationvc.com"
      }
    ],
    generatedAt: new Date().toISOString()
  }
}

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

    // Generate complete mock data
    console.log('📝 Generating complete mock report...')
    const report = generateCompleteMockReport(vcFirmName, companyName)
    
    console.log('✅ Report generated successfully')
    console.log('Report structure:', Object.keys(report))
    
    // Explicitly return with 200 status
    return NextResponse.json(report, { status: 200 })
    
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