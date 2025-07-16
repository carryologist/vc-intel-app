import axios from 'axios'

// Initialize Perplexity client only when API key is available
const getPerplexityClient = () => {
  console.log('🔧 [DEBUG] Initializing Perplexity client...')
  
  const apiKey = process.env.PERPLEXITY_API_KEY || process.env.OPENAI_API_KEY
  
  console.log('🔧 [DEBUG] Environment check:')
  console.log('  - PERPLEXITY_API_KEY exists:', !!process.env.PERPLEXITY_API_KEY)
  console.log('  - OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY)
  console.log('  - Using key type:', process.env.PERPLEXITY_API_KEY ? 'PERPLEXITY_API_KEY' : 'OPENAI_API_KEY')
  console.log('  - Key length:', apiKey ? apiKey.length : 'undefined')
  console.log('  - Key prefix:', apiKey ? apiKey.substring(0, 8) + '...' : 'undefined')
  
  if (!apiKey) {
    console.error('❌ [ERROR] No API key found in environment variables')
    throw new Error('Perplexity API key not configured')
  }
  
  const client = axios.create({
    baseURL: 'https://api.perplexity.ai',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    timeout: 60000 // 60 second timeout
  })
  
  console.log('✅ [DEBUG] Perplexity client initialized successfully')
  return client
}

export async function researchVCFirm(vcFirmName: string, companyName: string, contactName?: string) {
  console.log('🚀 [DEBUG] Starting researchVCFirm function')
  console.log('📊 [DEBUG] Input parameters:')
  console.log('  - vcFirmName:', vcFirmName)
  console.log('  - companyName:', companyName)
  console.log('  - contactName:', contactName)
  console.log('  - Environment:', process.env.NODE_ENV)
  console.log('  - Runtime:', typeof window !== 'undefined' ? 'client' : 'server')
  
  let client
  try {
    client = getPerplexityClient()
  } catch (error) {
    console.error('❌ [ERROR] Failed to initialize Perplexity client:', error)
    throw error
  }
  
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

  console.log('📝 [DEBUG] Prompt details:')
  console.log('  - Prompt length:', prompt.length)
  console.log('  - Target firm in prompt:', vcFirmName)
  console.log('  - Prompt preview (first 200 chars):', prompt.substring(0, 200) + '...')
  
  const requestPayload = {
    model: 'sonar',
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
  }
  
  console.log('📤 [DEBUG] Request payload:')
  console.log('  - Model:', requestPayload.model)
  console.log('  - Messages count:', requestPayload.messages.length)
  console.log('  - Temperature:', requestPayload.temperature)
  console.log('  - Max tokens:', requestPayload.max_tokens)
  console.log('  - Return citations:', requestPayload.return_citations)
  console.log('  - Search domain filter:', requestPayload.search_domain_filter)
  console.log('  - Search recency filter:', requestPayload.search_recency_filter)
  console.log('  - System message length:', requestPayload.messages[0].content.length)
  console.log('  - User message length:', requestPayload.messages[1].content.length)
  
  const startTime = Date.now()
  console.log('⏱️ [DEBUG] Starting API request at:', new Date().toISOString())
  
  try {
    console.log('🌐 [DEBUG] Making request to Perplexity API...')
    console.log('  - URL: https://api.perplexity.ai/chat/completions')
    console.log('  - Method: POST')
    
    const response = await client.post('/chat/completions', requestPayload)
    
    const duration = Date.now() - startTime
    console.log('✅ [DEBUG] API request completed successfully')
    console.log('  - Duration:', duration + 'ms')
    console.log('  - Status:', response.status)
    console.log('  - Status text:', response.statusText)
    console.log('  - Headers:', JSON.stringify(response.headers, null, 2))
    
    const responseData = response.data
    console.log('📥 [DEBUG] Response data structure:')
    console.log('  - Response keys:', Object.keys(responseData))
    console.log('  - Choices count:', responseData.choices?.length)
    console.log('  - Usage:', responseData.usage)
    console.log('  - Citations count:', responseData.citations?.length)
    
    const content = responseData.choices[0]?.message?.content
    console.log('📄 [DEBUG] Response content:')
    console.log('  - Content exists:', !!content)
    console.log('  - Content length:', content?.length)
    console.log('  - Content preview (first 500 chars):', content?.substring(0, 500) + '...')
    
    if (!content) {
      console.error('❌ [ERROR] Empty response content from Perplexity')
      console.error('  - Full response data:', JSON.stringify(responseData, null, 2))
      throw new Error('Empty response from Perplexity')
    }
    
    console.log('🔍 [DEBUG] Attempting to extract JSON from response...')
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('❌ [ERROR] No JSON found in Perplexity response')
      console.error('  - Full content:', content)
      throw new Error('Invalid response format from Perplexity')
    }
    
    console.log('✅ [DEBUG] JSON pattern found in response')
    console.log('  - JSON string length:', jsonMatch[0].length)
    console.log('  - JSON preview (first 200 chars):', jsonMatch[0].substring(0, 200) + '...')
    
    try {
      console.log('🔄 [DEBUG] Parsing JSON response...')
      const parsedData = JSON.parse(jsonMatch[0])
      console.log('✅ [DEBUG] JSON parsed successfully')
      console.log('  - Parsed data keys:', Object.keys(parsedData))
      console.log('  - Firm profile exists:', !!parsedData.firmProfile)
      console.log('  - Firm name in response:', parsedData.firmProfile?.name)
      
      // Validate that the response is about the correct firm
      const returnedFirmName = parsedData.firmProfile?.name?.toLowerCase()
      const requestedFirmName = vcFirmName.toLowerCase()
      
      console.log('🔍 [DEBUG] Validation check:')
      console.log('  - Requested firm:', requestedFirmName)
      console.log('  - Returned firm:', returnedFirmName)
      
      // Check for common wrong firms that AI might confuse
      const wrongFirms = ['andreessen horowitz', 'a16z', 'sequoia', 'kleiner perkins', 'accel']
      const isWrongFirm = wrongFirms.some(wrong => returnedFirmName?.includes(wrong))
      
      if (isWrongFirm || (returnedFirmName && !returnedFirmName.includes(requestedFirmName.split(' ')[0]))) {
        console.log('❌ [ERROR] Wrong firm detected in response!')
        console.log('  - AI returned information about a different firm')
        console.log('  - Expected:', requestedFirmName)
        console.log('  - Got:', returnedFirmName)
        throw new Error(`AI returned information about wrong firm: ${returnedFirmName}. Expected: ${requestedFirmName}`)
      }
      
      // Check for fabricated contacts (common hallucination patterns)
      const contacts = parsedData.firmProfile?.keyContacts || []
      console.log('👥 [DEBUG] Checking contacts for fabrication...')
      console.log('  - Contacts count:', contacts.length)
      
      const suspiciousContacts = contacts.filter((contact: any) => 
        contact.name?.toLowerCase().includes('marc andreessen') ||
        contact.name?.toLowerCase().includes('ben horowitz') ||
        contact.contactInfo?.includes('@a16z.com') ||
        contact.contactInfo?.includes('@sequoiacap.com')
      )
      
      if (suspiciousContacts.length > 0) {
        console.log('❌ [ERROR] Fabricated contacts detected!')
        console.log('  - Suspicious contacts:', suspiciousContacts.map((c: any) => c.name))
        throw new Error('AI fabricated contacts from other VC firms')
      }
      
      console.log('✅ [DEBUG] Validation passed - no fabricated contacts detected')
      
      // Add citations from Perplexity response if available
      const citations = responseData.citations || []
      console.log('📚 [DEBUG] Citations processing:')
      console.log('  - Citations count:', citations.length)
      
      const finalResult = {
        ...parsedData,
        generatedAt: new Date().toISOString(),
        citations: citations,
        model: 'sonar',
        provider: 'Perplexity',
        debugInfo: {
          requestDuration: duration,
          responseSize: content.length,
          citationsCount: citations.length,
          timestamp: new Date().toISOString()
        }
      }
      
      console.log('🎉 [DEBUG] Research completed successfully!')
      console.log('  - Final result keys:', Object.keys(finalResult))
      console.log('  - Total processing time:', Date.now() - startTime + 'ms')
      
      return finalResult
      
    } catch (parseError) {
      console.error('❌ [ERROR] Failed to parse Perplexity response JSON')
      console.error('  - Parse error:', parseError)
      console.error('  - JSON string that failed to parse:', jsonMatch[0])
      throw new Error('Failed to parse research results')
    }
    
  } catch (error) {
    const duration = Date.now() - startTime
    console.error('❌ [ERROR] Perplexity API request failed')
    console.error('  - Duration before failure:', duration + 'ms')
    console.error('  - Error type:', error.constructor.name)
    console.error('  - Error message:', error.message)
    
    if (axios.isAxiosError(error)) {
      console.error('🌐 [ERROR] Axios error details:')
      console.error('  - Status:', error.response?.status)
      console.error('  - Status text:', error.response?.statusText)
      console.error('  - Headers:', JSON.stringify(error.response?.headers, null, 2))
      console.error('  - Response data:', JSON.stringify(error.response?.data, null, 2))
      console.error('  - Request config:', {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        timeout: error.config?.timeout,
        headers: {
          ...error.config?.headers,
          Authorization: error.config?.headers?.Authorization ? '[REDACTED]' : undefined
        }
      })
      
      if (error.code) {
        console.error('  - Error code:', error.code)
      }
      
      if (error.response?.status === 400) {
        console.error('🚨 [ERROR] 400 Bad Request - This is likely a parameter issue')
        console.error('  - Check if model name is correct')
        console.error('  - Check if all parameters are supported by Perplexity API')
        console.error('  - Request payload that caused 400:', JSON.stringify(requestPayload, null, 2))
      }
      
      if (error.response?.status === 401) {
        console.error('🔑 [ERROR] 401 Unauthorized - API key issue')
        console.error('  - Check if API key is valid')
        console.error('  - Check if API key has correct permissions')
      }
      
      if (error.response?.status === 429) {
        console.error('⏱️ [ERROR] 429 Rate Limited')
        console.error('  - Too many requests to Perplexity API')
        console.error('  - Consider implementing retry logic with backoff')
      }
    } else {
      console.error('🔧 [ERROR] Non-Axios error:')
      console.error('  - Error stack:', error.stack)
    }
    
    throw new Error(`Failed to research VC firm: ${error.message}`)
  }
}
