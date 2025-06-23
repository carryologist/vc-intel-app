import OpenAI from 'openai'

// Initialize OpenAI client only when API key is available
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }
  return new OpenAI({ apiKey })
}

export async function researchVCFirm(vcFirmName: string, companyName: string) {
  const openai = getOpenAIClient()
  
  const prompt = `
You are a professional venture capital research analyst. Research the VC firm "${vcFirmName}" and provide a comprehensive analysis for "${companyName}" who is preparing for investor meetings.

Please provide a detailed JSON response with the following structure:

{
  "firmProfile": {
    "name": "Exact firm name (properly capitalized)",
    "description": "Detailed description of the firm",
    "founded": "Year founded",
    "location": "Primary location",
    "website": "Official website URL",
    "focusAreas": ["Array of focus areas/sectors"],
    "typicalInvestmentSize": "Investment range",
    "stage": ["Investment stages they focus on"],
    "notableInvestments": [
      {
        "companyName": "Notable portfolio company",
        "amount": "Investment amount",
        "date": "YYYY-MM-DD",
        "round": "Series A/B/Seed etc",
        "description": "Brief company description",
        "exitStatus": "Public/Acquired/Private",
        "exitValue": "Exit valuation or acquisition price if known"
      }
    ],
    "keyPartners": [
      {
        "name": "Partner name",
        "title": "Partner title",
        "focusArea": "Technology focus area",
        "experience": "Brief background",
        "relevanceReason": "Why this partner is relevant to ${companyName}"
      }
    ]
  },
  "recentNews": [
    {
      "title": "News headline",
      "source": "News source",
      "date": "YYYY-MM-DD",
      "url": "Article URL if available",
      "summary": "Brief summary of the news"
    }
  ],
  "recentInvestments": [
    {
      "companyName": "Portfolio company name",
      "amount": "Investment amount",
      "date": "YYYY-MM-DD",
      "round": "Series A/B/Seed etc",
      "description": "Brief description of the company"
    }
  ],
  "competitiveAnalysis": [
    {
      "companyName": "Portfolio company name",
      "similarity": "High/Medium/Low",
      "reasoning": "Why this company might compete with ${companyName}",
      "potentialConcerns": ["Array of potential concerns for ${companyName}"]
    }
  ],
  "alternativeVCs": [
    {
      "name": "Alternative VC firm name",
      "reasoning": "Why they might be a good alternative",
      "focusAlignment": "How their focus aligns with ${companyName}",
      "contactInfo": "Key contact information if publicly available"
    }
  ]
}

Focus on accuracy and provide real, verifiable information. If you cannot find specific information, indicate that clearly rather than making up details.
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional VC research analyst. Provide accurate, well-researched information in the requested JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Try to parse the JSON response
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      
      const parsedData = JSON.parse(jsonMatch[0])
      return {
        ...parsedData,
        generatedAt: new Date().toISOString()
      }
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError)
      throw new Error('Failed to parse research results')
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to research VC firm')
  }
}