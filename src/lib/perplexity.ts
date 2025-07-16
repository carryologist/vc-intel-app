import axios from 'axios'

// Initialize Perplexity client only when API key is available
const getPerplexityClient = () => {
  const apiKey = process.env.PERPLEXITY_API_KEY
  if (!apiKey) {
    throw new Error('Perplexity API key not configured')
  }
  
  return axios.create({
    baseURL: 'https://api.perplexity.ai',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  })
}

export async function researchVCFirm(vcFirmName: string, companyName: string, contactName?: string) {
  const client = getPerplexityClient()
  
  // Debug logging
  console.log('🔍 Research request:', { vcFirmName, companyName, contactName })
  
  const prompt = `
You are a senior venture capital research analyst with 15+ years of experience in Silicon Valley. You have deep knowledge of VC firms, their investment patterns, portfolio companies, and market positioning. You specialize in preparing comprehensive due diligence reports for startup CEOs seeking funding.

RESEARCH GUIDELINES:
- Focus on factual, verifiable information from the last 12 months for news and investments
- Prioritize recent investments and news from the past 12 months (2024)
- For focus areas, be highly specific and granular (e.g., "Developer Tools", "DevOps Platforms", "AI Coding Assistants", "Cloud Infrastructure", "API Management", "Database Tools", "Monitoring & Observability" rather than broad terms like "Enterprise Software", "SaaS", or "B2B")
- For competitive analysis, focus on direct product/service overlap with ${companyName}'s specific business model and technology stack
- Provide specific dollar amounts and dates when available
- Include partner names and their specific expertise areas
- ONLY use information that can be verified through web search and citations

🚨 CRITICAL ANTI-HALLUCINATION REQUIREMENTS 🚨

You are STRICTLY FORBIDDEN from fabricating, inventing, or making up ANY information. This is a professional tool used for real investor meetings.

❌ NEVER FABRICATE:
- News articles or headlines that don't exist
- Investment amounts or dates you're not certain about
- Partner names or titles
- Company valuations or exit information
- URLs or web links
- Portfolio companies or investment details
- Recent news or press releases

✅ REQUIRED BEHAVIOR:
- ONLY use information found through web search with proper citations
- If you don't have verified information, explicitly state "Information not publicly available"
- Use ONLY information that you can cite with real sources
- When uncertain, use phrases like "According to [source]" or "Reported by [publication]"
- Empty arrays/sections are BETTER than fabricated information
- If no recent news exists, return empty news array rather than inventing articles
- Only include URLs if they are from your search results
- Dates must be in YYYY-MM-DD format and be realistic
- Keep descriptions factual and concise (2-3 sentences max)
- Always provide citations for any factual claims

⚠️ VERIFICATION STANDARD:
Before including ANY piece of information, ask yourself: "Did I find this through web search with a verifiable source?" If not, omit it.

Research the VC firm "${vcFirmName}" and provide a comprehensive analysis for "${companyName}" who is preparing for investor meetings.${contactName ? `

SPECIAL FOCUS: The user will be meeting with "${contactName}" from ${vcFirmName}. Please:
- Include this contact in the keyContacts section with isUserContact: true
- Research this specific person's background, investment focus, and experience
- If limited information is available about this contact, indicate this clearly
- Provide insights on how to best prepare for a meeting with this specific person` : ''}

IMPORTANT: You are researching "${vcFirmName}" specifically - NOT any other VC firm. All data must be about "${vcFirmName}" only. Do not confuse this with other firms like Andreessen Horowitz, Sequoia Capital, or any other VC firm.

Please provide a detailed JSON response with the following structure:

{
  "firmProfile": {
    "name": "Exact firm name (properly capitalized)",
    "description": "Detailed description of the firm's investment philosophy",
    "founded": "Year founded",
    "location": "Primary location",
    "website": "Official website URL",
    "focusAreas": ["Specific investment focus areas"],
    "typicalInvestmentSize": "Investment range",
    "stage": ["Investment stages they focus on"],
    "notableInvestments": [
      {
        "companyName": "Portfolio company name",
        "amount": "Investment amount if known",
        "date": "YYYY-MM-DD",
        "round": "Series A/B/Seed etc",
        "description": "Brief description",
        "exitStatus": "Public/Acquired/Private",
        "exitValue": "Exit valuation or acquisition price if known",
        "source": "Citation for this information"
      }
    ],
    "keyContacts": [
      {
        "name": "Contact name",
        "title": "Contact title",
        "focusArea": "Technology focus area most relevant to ${companyName}",
        "experience": "Brief background and expertise",
        "relevanceReason": "Why this contact is specifically relevant to ${companyName}'s sector and stage",
        "isUserContact": false,
        "contactInfo": "Email or LinkedIn if publicly available",
        "source": "Citation for this information"
      }
    ]
  },
  "recentNews": [
    {
      "title": "ONLY real news headlines with citations",
      "source": "Actual news source (TechCrunch, Forbes, etc.)",
      "date": "YYYY-MM-DD (must be realistic and recent)",
      "url": "ONLY include if found in search results",
      "summary": "Brief factual summary with citation",
      "citation": "Full citation for verification"
    }
  ],
  "recentInvestments": [
    {
      "companyName": "Portfolio company name (last 12 months)",
      "amount": "Investment amount",
      "date": "YYYY-MM-DD",
      "round": "Series A/B/Seed etc",
      "description": "Brief description focusing on why this investment is relevant to ${companyName}",
      "source": "Citation for this information"
    }
  ],
  "competitiveAnalysis": [
    {
      "companyName": "Portfolio company name",
      "similarity": "High/Medium/Low",
      "reasoning": "Detailed analysis of direct product/service overlap, specific technology stack similarities, and exact competitive conflicts with ${companyName}'s business model. Focus on precise competitive dynamics rather than broad market categories.",
      "potentialConcerns": ["Specific concerns about competition, market positioning conflicts, or partnership risks"],
      "source": "Citation for this information"
    }
  ],
  "alternativeVCs": [
    {
      "name": "Alternative VC firm name",
      "reasoning": "Why they might be a better fit - focus on recent investments in similar companies, lack of competing portfolio companies, and active interest in ${companyName}'s sector",
      "focusAlignment": "How their investment thesis and portfolio strategy aligns with ${companyName}'s business model and growth stage",
      "contactInfo": "Key partner name and contact information if publicly available",
      "source": "Citation for this information"
    }
  ],
  "sources": [
    "List of all sources and citations used in this research"
  ]
}

COMPETITIVE ANALYSIS CRITERIA:
Evaluate portfolio companies based on NARROW, SPECIFIC competitive overlap with ${companyName}:
- Direct product/service overlap: Does the portfolio company build the same type of product as ${companyName}? (High/Medium/Low)
- Technology stack similarity: Do they use similar technologies, frameworks, or approaches?
- Customer overlap: Do they target the exact same customer segments and use cases?
- Feature-level competition: Do they compete on specific features or capabilities?
- Distribution channel conflicts: Do they compete for the same sales channels or partnerships?

Focus on precise, actionable competitive intelligence rather than broad market categorization.

EXAMPLE: If ${companyName} creates developer tools and AI coding assistants, only flag portfolio companies that:
- Build coding tools, IDEs, or development environments
- Offer AI-powered coding assistance or code generation
- Provide developer productivity or workflow tools
- Compete for the same developer audience

DO NOT flag companies just because they are "enterprise software" or "B2B SaaS" - be specific about the actual product overlap.

ALTERNATIVE VC CRITERIA:
Prioritize firms that:
- Have invested in similar stage companies in the last 18 months
- Show active interest in ${companyName}'s sector
- Have complementary (not competing) portfolio companies
- Are currently raising or have recently closed new funds
- Have partners with relevant industry expertise

ABSOLUTE PRIORITY: Accuracy over completeness. It is better to return empty arrays or "Information not publicly available" than to fabricate data. Do not create placeholder names, fake companies, or invented investment amounts. Only include information you found through web search with proper citations.
`

  // Debug: Log the actual prompt being sent
  console.log('📝 Prompt preview:', prompt.substring(0, 200) + '...')
  console.log('🎯 Target firm in prompt:', vcFirmName)
  
  try {
    const response = await client.post('/chat/completions', {
      model: 'llama-3.1-sonar-large-128k-online',
      messages: [
        {
          role: "system",
          content: `You are a senior venture capital research analyst with access to real-time web search. 🚨 CRITICAL ANTI-HALLUCINATION DIRECTIVE 🚨: You are ABSOLUTELY FORBIDDEN from fabricating ANY information. This tool is used for real investor meetings where accuracy is paramount. You MUST use web search to find verified information about "${vcFirmName}". If you don't have verified information from web search, you MUST return empty arrays or state "Information not publicly available". NEVER invent news articles, investment amounts, partner names, or company details. Empty sections are infinitely better than fabricated information. FOCUS ONLY ON: "${vcFirmName}" - do not confuse with other firms. Always provide citations for any factual claims.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 4500,
      return_citations: true,
      search_domain_filter: ["techcrunch.com", "crunchbase.com", "pitchbook.com", "bloomberg.com", "reuters.com", "wsj.com", "forbes.com", "venturebeat.com"],
      search_recency_filter: "month"
    })

    const responseData = response.data
    const content = responseData.choices[0]?.message?.content
    
    if (!content) {
      throw new Error('Empty response from Perplexity')
    }
    
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('No JSON found in Perplexity response')
      throw new Error('Invalid response format from Perplexity')
    }
    
    try {
      const parsedData = JSON.parse(jsonMatch[0])
      
      // Validate that the response is about the correct firm
      const returnedFirmName = parsedData.firmProfile?.name?.toLowerCase()
      const requestedFirmName = vcFirmName.toLowerCase()
      
      console.log('🔍 Validation check:')
      console.log('  Requested:', requestedFirmName)
      console.log('  Returned:', returnedFirmName)
      
      if (returnedFirmName && !returnedFirmName.includes(requestedFirmName.split(' ')[0])) {
        console.log('⚠️ WARNING: Firm name mismatch detected!')
        console.log('  This might indicate the AI confused different firms')
        // Still return the data but log the warning
      }
      
      // Add citations from Perplexity response if available
      const citations = responseData.citations || []
      
      return {
        ...parsedData,
        generatedAt: new Date().toISOString(),
        citations: citations,
        model: 'llama-3.1-sonar-large-128k-online',
        provider: 'Perplexity'
      }
    } catch (parseError) {
      console.error('Failed to parse Perplexity response:', parseError)
      throw new Error('Failed to parse research results')
    }
  } catch (error) {
    console.error('Perplexity API error:', error)
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data)
      console.error('Response status:', error.response?.status)
    }
    throw new Error('Failed to research VC firm')
  }
}
