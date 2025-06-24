import OpenAI from 'openai'

// Initialize OpenAI client only when API key is available
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }
  return new OpenAI({ apiKey })
}

// Function to determine the best available model
async function getBestAvailableModel(openai: OpenAI): Promise<string> {
  const modelsToTry = ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo']
  
  for (const model of modelsToTry) {
    try {
      // Test the model with a simple request
      await openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1
      })
      console.log(`✅ Using model: ${model}`)
      return model
    } catch (error: any) {
      if (error?.status === 404 || error?.code === 'model_not_found') {
        console.log(`❌ Model ${model} not available, trying next...`)
        continue
      }
      // If it's not a model availability error, use this model anyway
      console.log(`⚠️ Model ${model} test failed but will try to use it:`, error?.message)
      return model
    }
  }
  
  // Fallback to gpt-3.5-turbo if all else fails
  console.log('🔄 Falling back to gpt-3.5-turbo')
  return 'gpt-3.5-turbo'
}

export async function researchVCFirm(vcFirmName: string, companyName: string) {
  const openai = getOpenAIClient()
  
  // Determine the best available model
  const model = await getBestAvailableModel(openai)
  
  const prompt = `
You are a senior venture capital research analyst with 15+ years of experience in Silicon Valley. You have deep knowledge of VC firms, their investment patterns, portfolio companies, and market positioning. You specialize in preparing comprehensive due diligence reports for startup CEOs seeking funding.

RESEARCH GUIDELINES:
- Focus on factual, verifiable information from the last 12 months for news and investments
- Prioritize recent investments and news from the past 12 months (2024)
- For competitive analysis, consider market overlap, customer base, and technology stack
- Provide specific dollar amounts and dates when available
- Include partner names and their specific expertise areas

CRITICAL QUALITY REQUIREMENTS:
- NEVER make up or fabricate information - if you don't know something, explicitly state "Information not publicly available"
- DO NOT create fake names like "Jane Doe" or "John Smith" - use real partner names or state "Partner information not publicly available"
- DO NOT invent portfolio companies or investment amounts - only include verifiable investments
- If you cannot find recent data, state "No recent [news/investments] found in public sources" rather than creating fake entries
- When uncertain about data accuracy, prefix with "According to public sources" or "Reported as"
- Ensure all dates are in YYYY-MM-DD format
- Keep descriptions concise but informative (2-3 sentences max)
- Empty arrays are acceptable if no real data is available

Research the VC firm "${vcFirmName}" and provide a comprehensive analysis for "${companyName}" who is preparing for investor meetings.

Please provide a detailed JSON response with the following structure:

{
  "firmProfile": {
    "name": "Exact firm name (properly capitalized)",
    "description": "Detailed description of the firm's investment philosophy and approach",
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
        "focusArea": "Technology focus area most relevant to ${companyName}",
        "experience": "Brief background and expertise",
        "relevanceReason": "Why this partner is specifically relevant to ${companyName}'s sector and stage"
      }
    ]
  },
  "recentNews": [
    {
      "title": "News headline from the last 12 months",
      "source": "News source",
      "date": "YYYY-MM-DD",
      "url": "Article URL if available",
      "summary": "Brief summary focusing on relevance to current investment strategy"
    }
  ],
  "recentInvestments": [
    {
      "companyName": "Portfolio company name (last 12 months)",
      "amount": "Investment amount",
      "date": "YYYY-MM-DD",
      "round": "Series A/B/Seed etc",
      "description": "Brief description focusing on why this investment is relevant to ${companyName}"
    }
  ],
  "competitiveAnalysis": [
    {
      "companyName": "Portfolio company name",
      "similarity": "High/Medium/Low",
      "reasoning": "Detailed analysis of market overlap, customer base similarity, technology stack, and potential conflicts of interest with ${companyName}",
      "potentialConcerns": ["Specific concerns about competition, market positioning conflicts, or partnership risks"]
    }
  ],
  "alternativeVCs": [
    {
      "name": "Alternative VC firm name",
      "reasoning": "Why they might be a better fit - focus on recent investments in similar companies, lack of competing portfolio companies, and active interest in ${companyName}'s sector",
      "focusAlignment": "How their investment thesis and portfolio strategy aligns with ${companyName}'s business model and growth stage",
      "contactInfo": "Key partner name and contact information if publicly available"
    }
  ]
}

COMPETITIVE ANALYSIS CRITERIA:
Evaluate portfolio companies based on:
- Direct product/service overlap (High/Medium/Low)
- Target customer similarity
- Technology stack overlap
- Market positioning conflicts
- Potential partnership opportunities vs. competition risks

ALTERNATIVE VC CRITERIA:
Prioritize firms that:
- Have invested in similar stage companies in the last 18 months
- Show active interest in ${companyName}'s sector
- Have complementary (not competing) portfolio companies
- Are currently raising or have recently closed new funds
- Have partners with relevant industry expertise

ABSOLUTE PRIORITY: Accuracy over completeness. It is better to return empty arrays or "Information not publicly available" than to fabricate data. Do not create placeholder names, fake companies, or invented investment amounts. Only include information you are confident is accurate and verifiable.
`

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are a senior venture capital research analyst with deep expertise in Silicon Valley investment patterns, portfolio analysis, and startup-VC fit assessment. CRITICAL: You must NEVER fabricate or make up information. If you don't have accurate data, explicitly state 'Information not publicly available' or return empty arrays. Accuracy is more important than completeness. Do not create fake names, companies, or investment amounts."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 4500,
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