import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  console.log('🔍 [DEBUG] Debug endpoint called at:', new Date().toISOString())
  
  const hasApiKey = !!process.env.PERPLEXITY_API_KEY
  const keyLength = process.env.PERPLEXITY_API_KEY?.length || 0
  const keyPrefix = process.env.PERPLEXITY_API_KEY?.substring(0, 12) || 'none'
  
  // Get all environment variable names that might be related
  const envKeys = Object.keys(process.env).filter(key => 
    key.includes('PERPLEXITY') || 
    key.includes('API') || 
    key.includes('KEY') ||
    key.includes('VERCEL') ||
    key.includes('NODE')
  )
  
  // Get all environment variables (be careful not to expose sensitive data)
  const allEnvKeys = Object.keys(process.env).sort()
  
  // Test network connectivity
  let networkTest = null
  try {
    console.log('🌐 [DEBUG] Testing network connectivity...')
    const testResponse = await axios.get('https://httpbin.org/get', { timeout: 5000 })
    networkTest = {
      success: true,
      status: testResponse.status,
      userAgent: testResponse.data?.headers?.['User-Agent'] || 'unknown'
    }
    console.log('✅ [DEBUG] Network test successful')
  } catch (networkError) {
    console.error('❌ [DEBUG] Network test failed:', networkError)
    networkTest = {
      success: false,
      error: networkError instanceof Error ? networkError.message : 'Unknown network error',
      code: axios.isAxiosError(networkError) ? networkError.code : 'unknown'
    }
  }
  
  // Test Perplexity API connectivity (without making a real request)
  let perplexityConnectivityTest = null
  if (hasApiKey) {
    try {
      console.log('🤖 [DEBUG] Testing Perplexity API connectivity...')
      const perplexityResponse = await axios.get('https://api.perplexity.ai', { 
        timeout: 5000,
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      })
      perplexityConnectivityTest = {
        success: true,
        status: perplexityResponse.status
      }
      console.log('✅ [DEBUG] Perplexity connectivity test successful')
    } catch (perplexityError) {
      console.error('❌ [DEBUG] Perplexity connectivity test failed:', perplexityError)
      perplexityConnectivityTest = {
        success: false,
        error: perplexityError instanceof Error ? perplexityError.message : 'Unknown error',
        status: axios.isAxiosError(perplexityError) ? perplexityError.response?.status : 'unknown',
        code: axios.isAxiosError(perplexityError) ? perplexityError.code : 'unknown'
      }
    }
  }
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      platform: process.platform,
      nodeVersion: process.version,
      vercelEnv: process.env.VERCEL_ENV,
      vercelUrl: process.env.VERCEL_URL,
      vercelRegion: process.env.VERCEL_REGION
    },
    perplexityApi: {
      hasApiKey,
      keyLength,
      keyPrefix,
      connectivityTest: perplexityConnectivityTest
    },
    network: {
      connectivityTest: networkTest
    },
    environmentVariables: {
      relatedKeys: envKeys,
      allKeys: allEnvKeys,
      totalCount: Object.keys(process.env).length
    },
    runtime: {
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime()
    }
  }
  
  console.log('📊 [DEBUG] Debug info compiled:', {
    hasApiKey: debugInfo.perplexityApi.hasApiKey,
    networkSuccess: debugInfo.network.connectivityTest?.success,
    perplexitySuccess: debugInfo.perplexityApi.connectivityTest?.success
  })
  
  return NextResponse.json(debugInfo)
}
