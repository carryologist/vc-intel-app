import { NextResponse } from 'next/server'

export async function GET() {
  const hasApiKey = !!process.env.PERPLEXITY_API_KEY
  const keyLength = process.env.PERPLEXITY_API_KEY?.length || 0
  const keyPrefix = process.env.PERPLEXITY_API_KEY?.substring(0, 8) || 'none'
  
  // Get all environment variable names that might be related
  const envKeys = Object.keys(process.env).filter(key => 
    key.includes('PERPLEXITY') || 
    key.includes('API') || 
    key.includes('KEY')
  )
  
  return NextResponse.json({
    hasApiKey,
    keyLength,
    keyPrefix,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    relatedEnvKeys: envKeys,
    totalEnvVars: Object.keys(process.env).length
  })
}
