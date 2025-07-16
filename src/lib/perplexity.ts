import axios from 'axios'

// Initialize Perplexity client only when API key is available
const getPerplexityClient = () => {
  const apiKey = process.env.PERPLEXITY_API_KEY || process.env.OPENAI_API_KEY
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
You are a venture capital research analyst. You MUST use web search to find ONLY verified, factual information about the specific VC firm requested.

🚨 CRITICAL INSTRUCTIONS 🚨
1. Search the web for "${vcFirmName}" specifically - do NOT confuse with other VC firms
2. ONLY include information you find through web search with citations
3. If you cannot find specific information, return "Information not publicly available"
4. DO NOT make up partner names, investment amounts, or company details
5. DO NOT include information about other VC firms (like Andreessen Horowitz, Sequoia, etc.)

RESEARCH GUIDELINES:
- Search for the EXACT firm name: "${vcFirmName}"
- Verify all partner names through the firm's official website or LinkedIn
- Only include investments that are specifically attributed to "${vcFirmName}"
- Focus on information from the last 12 months for news and recent investments
- For competitive analysis, focus on direct product/service overlap with ${companyName}'s business model
- ALWAYS provide citations for every piece of information

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
      model: 'sonar', // Updated to use the current model name
      messages: [
        {
          role: "system",
          content: `You are a venture capital research analyst with access to real-time web search. 
          
🚨 ABSOLUTE REQUIREMENTS 🚨
1. ONLY research the EXACT firm: "${vcFirmName}"
2. Use web search to verify ALL information
3. NEVER include information about other VC firms (Andreessen Horowitz, Sequoia Capital, etc.)
4. If you cannot find verified information, return "Information not publicly available"
5. NEVER fabricate partner names, investments, or news articles
6. Every fact MUST have a citation from web search
7. Empty sections are better than fake information

FIRM VALIDATION: You are researching "${vcFirmName}" - if you find information about a different firm, DO NOT include it. Only include information specifically about "${vcFirmName}".`
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
      // Removed potentially problematic parameters like logprobs, top_logprobs, stream_options
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
      
      // Check for common wrong firms that AI might confuse
      const wrongFirms = ['andreessen horowitz', 'a16z', 'sequoia', 'kleiner perkins', 'accel']
      const isWrongFirm = wrongFirms.some(wrong => returnedFirmName?.includes(wrong))
      
      if (isWrongFirm || (returnedFirmName && !returnedFirmName.includes(requestedFirmName.split(' ')[0]))) {
        console.log('❌ ERROR: Wrong firm detected in response!')
        console.log('  AI returned information about a different firm')
        throw new Error(`AI returned information about wrong firm: ${returnedFirmName}. Expected: ${requestedFirmName}`)
      }
      
      // Check for fabricated contacts (common hallucination patterns)
      const contacts = parsedData.firmProfile?.keyContacts || []
      const suspiciousContacts = contacts.filter((contact: any) => 
        contact.name?.toLowerCase().includes('marc andreessen') ||
        contact.name?.toLowerCase().includes('ben horowitz') ||
        contact.contactInfo?.includes('@a16z.com') ||
        contact.contactInfo?.includes('@sequoiacap.com')
      )
      
      if (suspiciousContacts.length > 0) {
        console.log('❌ ERROR: Fabricated contacts detected!')
        console.log('  Suspicious contacts:', suspiciousContacts.map((c: any) => c.name))
        throw new Error('AI fabricated contacts from other VC firms')
      }
      
      // Add citations from Perplexity response if available
      const citations = responseData.citations || []
      
      return {
        ...parsedData,
        generatedAt: new Date().toISOString(),
        citations: citations,
        model: 'sonar',
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
