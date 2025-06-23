import { VCResearchReport } from '@/types'

// Helper function to properly capitalize names
function capitalizeCompanyName(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function generateMockReport(vcFirmName: string, companyName: string): VCResearchReport {
  const properVCName = capitalizeCompanyName(vcFirmName)
  const properCompanyName = capitalizeCompanyName(companyName)
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
        },
        {
          companyName: "Slack",
          amount: "$5.1M",
          date: "2014-04-01",
          round: "Series B",
          description: "Team communication and collaboration platform",
          exitStatus: "Acquired",
          exitValue: "Salesforce acquisition - $27.7B (2021)"
        },
        {
          companyName: "Notion",
          amount: "$10M",
          date: "2019-06-01",
          round: "Series A",
          description: "All-in-one workspace for notes, docs, and collaboration",
          exitStatus: "Private",
          exitValue: "$10B valuation (2021)"
        },
        {
          companyName: "Figma",
          amount: "$3.2M",
          date: "2016-12-01",
          round: "Series A",
          description: "Collaborative design and prototyping platform",
          exitStatus: "Acquired",
          exitValue: "Adobe acquisition - $20B (2022)"
        },
        {
          companyName: "Discord",
          amount: "$6.5M",
          date: "2016-01-01",
          round: "Series A",
          description: "Voice, video and text communication platform for communities",
          exitStatus: "Private",
          exitValue: "$15B valuation (2021)"
        },
        {
          companyName: "Coinbase",
          amount: "$5M",
          date: "2013-12-01",
          round: "Series B",
          description: "Cryptocurrency exchange and wallet platform",
          exitStatus: "Public",
          exitValue: "IPO 2021 - $68B market cap"
        },
        {
          companyName: "Canva",
          amount: "$3M",
          date: "2013-07-01",
          round: "Series A",
          description: "Online graphic design and visual communication platform",
          exitStatus: "Private",
          exitValue: "$40B valuation (2021)"
        },
        {
          companyName: "Zoom",
          amount: "$6M",
          date: "2013-05-01",
          round: "Series B",
          description: "Video conferencing and communication platform",
          exitStatus: "Public",
          exitValue: "IPO 2019 - Peak $160B market cap (2020)"
        },
        {
          companyName: "Shopify",
          amount: "$7M",
          date: "2010-12-01",
          round: "Series A",
          description: "E-commerce platform for online stores",
          exitStatus: "Public",
          exitValue: "IPO 2015 - $200B+ peak market cap (2021)"
        }
      ],
      keyPartners: [
        {
          name: "Marc Andreessen",
          title: "Co-Founder & General Partner",
          focusArea: "Enterprise Software & Developer Tools",
          experience: "Co-founded Netscape, experienced in scaling tech companies",
          relevanceReason: `Strong alignment with ${properCompanyName}'s technology focus and growth stage`
        },
        {
          name: "Ben Horowitz",
          title: "Co-Founder & General Partner",
          focusArea: "Enterprise Software & SaaS",
          experience: "Former CEO of Opsware, expert in enterprise software scaling",
          relevanceReason: "Deep experience in enterprise software go-to-market strategies"
        },
        {
          name: "Sarah Wang",
          title: "General Partner",
          focusArea: "AI/ML & Data Infrastructure",
          experience: "Former Google executive, AI/ML specialist",
          relevanceReason: "Perfect match for AI-driven or data-intensive companies"
        }
      ]
    },
    recentNews: [
      {
        title: `${properVCName} Announces New $200M Fund for AI Startups`,
        source: "TechCrunch",
        date: "2024-12-15",
        url: "https://techcrunch.com/example",
        summary: `${properVCName} has launched a new fund specifically targeting artificial intelligence and machine learning startups, signaling their commitment to the AI revolution.`
      },
      {
        title: `${properVCName} Partner Speaks at Web Summit 2024`,
        source: "VentureBeat",
        date: "2024-11-20",
        url: "https://venturebeat.com/example",
        summary: "Key insights on the future of enterprise software and the importance of product-market fit in today's competitive landscape."
      },
      {
        title: `${properVCName} Leads Series A in Climate Tech Startup`,
        source: "Forbes",
        date: "2024-10-30",
        url: "https://forbes.com/example",
        summary: "The firm continues to diversify its portfolio with strategic investments in sustainable technology solutions."
      }
    ],
    recentInvestments: [
      {
        companyName: "DataFlow AI",
        amount: "$5.2M",
        date: "2024-12-01",
        round: "Series A",
        description: "AI-powered data analytics platform for enterprise customers"
      },
      {
        companyName: "SecureAuth Pro",
        amount: "$3.1M",
        date: "2024-11-15",
        round: "Seed",
        description: "Next-generation authentication and security solutions for developers"
      },
      {
        companyName: "CloudOps Suite",
        amount: "$7.8M",
        date: "2024-10-20",
        round: "Series A",
        description: "DevOps automation platform for cloud-native applications"
      },
      {
        companyName: "FinanceFlow",
        amount: "$2.5M",
        date: "2024-09-10",
        round: "Seed",
        description: "B2B financial management and invoicing software"
      }
    ],
    competitiveAnalysis: [
      {
        companyName: "DataFlow AI",
        similarity: "High",
        reasoning: `Both ${properCompanyName} and DataFlow AI operate in the data/analytics space, potentially targeting similar enterprise customers.`,
        potentialConcerns: [
          "Direct competition for enterprise clients",
          "Similar technology stack and approach",
          "Potential IP conflicts in data processing methods"
        ]
      },
      {
        companyName: "SecureAuth Pro",
        similarity: "Medium",
        reasoning: `If ${properCompanyName} has any security components, there could be overlap with SecureAuth Pro's authentication solutions.`,
        potentialConcerns: [
          "Overlapping security features",
          "Competition for developer mindshare",
          "Similar go-to-market strategies"
        ]
      }
    ],
    alternativeVCs: [
      {
        name: "Innovation Ventures",
        reasoning: "Strong track record in similar stage companies with complementary portfolio",
        focusAlignment: `Excellent alignment with ${properCompanyName}'s sector and growth stage`,
        contactInfo: "partners@innovationvc.com"
      },
      {
        name: "TechForward Capital",
        reasoning: "Known for hands-on support and extensive network in enterprise software",
        focusAlignment: "Perfect fit for B2B software companies seeking strategic guidance",
        contactInfo: "hello@techforward.vc"
      },
      {
        name: "NextGen Partners",
        reasoning: "Specializes in early-stage tech companies with strong technical teams",
        focusAlignment: "Ideal for technical founders looking for product development support",
        contactInfo: "team@nextgenpartners.com"
      },
      {
        name: "Growth Catalyst VC",
        reasoning: "Focus on scalable business models with proven market traction",
        focusAlignment: "Great for companies ready to scale their go-to-market efforts",
        contactInfo: "invest@growthcatalyst.vc"
      }
    ],
    generatedAt: new Date().toISOString()
  }
}