# Debugging Guide: Perplexity API Issues on Vercel

This guide will walk you through debugging the Perplexity API integration that works locally but fails on Vercel.

## 🔧 Enhanced Debugging Features Added

We've added extensive logging throughout the application:

### 1. Server-Side Logging (API Routes)
- **Perplexity Integration** (`src/lib/perplexity.ts`): Detailed request/response logging with `[PERPLEXITY]` and `[RESEARCH]` prefixes
- **Research API** (`src/app/api/research/route.ts`): Request processing and error handling
- **Debug Endpoint** (`src/app/api/debug/route.ts`): Environment variables, network connectivity, and Perplexity API tests

### 2. Client-Side Logging
- **Main Page** (`src/app/page.tsx`): Fetch request logging with `[CLIENT]` prefix
- Request timing, response analysis, and detailed error reporting

## 🌐 Step-by-Step Debugging Process

### Step 1: Check the Debug Endpoint

1. **Local Testing:**
   ```bash
   curl http://localhost:3000/api/debug
   ```

2. **Production Testing:**
   ```bash
   curl https://your-app.vercel.app/api/debug
   ```

3. **What to Look For:**
   - `perplexityApi.hasApiKey`: Should be `true`
   - `perplexityApi.keyLength`: Should match your API key length
   - `perplexityApi.keyPrefix`: Should show first 12 characters
   - `perplexityApi.connectivityTest.success`: Network connectivity to Perplexity
   - `network.connectivityTest.success`: General network connectivity
   - `environment.vercelEnv`: Should show `production` on Vercel

### Step 2: Browser Developer Tools

#### Opening Developer Tools:
- **Chrome/Edge**: F12 or Ctrl+Shift+I (Cmd+Option+I on Mac)
- **Firefox**: F12 or Ctrl+Shift+I (Cmd+Option+I on Mac)
- **Safari**: Cmd+Option+I (enable Developer menu first)

#### Console Tab:
1. **Clear the console** before testing
2. **Submit a research request**
3. **Look for log patterns:**

   **Client-Side Logs (Browser Console):**
   ```
   🚀 [CLIENT] Starting research request...
   📤 [CLIENT] Making fetch request to /api/research
   📥 [CLIENT] Response received:
   📥 [CLIENT] Status: 200
   ✅ [CLIENT] Data received successfully
   ```

   **Error Patterns to Watch For:**
   ```
   ❌ [CLIENT] Response not OK
   ❌ [CLIENT] Error type: TypeError
   🌐 [CLIENT] Network error detected
   ```

#### Network Tab:
1. **Clear network logs** before testing
2. **Submit a research request**
3. **Check the `/api/research` request:**
   - **Status Code**: Should be 200
   - **Response Time**: Note if unusually slow
   - **Response Headers**: Check for errors
   - **Response Body**: Look for error messages

### Step 3: Vercel Function Logs

#### Accessing Vercel Logs:

1. **Via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Select your project
   - Click "Functions" tab
   - Click on the failing function
   - View "Logs" section

2. **Via Vercel CLI:**
   ```bash
   # Install Vercel CLI if not already installed
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # View real-time logs
   vercel logs --follow
   
   # View recent logs
   vercel logs
   ```

#### Log Patterns to Look For:

**Successful Flow:**
```
🚀 [RESEARCH] Starting VC firm research...
🔧 [PERPLEXITY] Initializing client...
✅ [PERPLEXITY] Client initialized successfully
📤 [PERPLEXITY] Outgoing request:
📥 [PERPLEXITY] Response received:
✅ [RESEARCH] API call completed successfully
```

**Error Patterns:**
```
❌ [PERPLEXITY] API key not configured
❌ [PERPLEXITY] Response error:
❌ [RESEARCH] Perplexity API error occurred:
❌ [RESEARCH] Axios error details:
```

### Step 4: Environment Variable Verification

#### Check Environment Variables on Vercel:

1. **Via Dashboard:**
   - Project Settings → Environment Variables
   - Verify `PERPLEXITY_API_KEY` is set
   - Check it's enabled for Production environment
   - Verify the value matches your local `.env`

2. **Via Debug Endpoint:**
   ```bash
   curl https://your-app.vercel.app/api/debug | jq '.environmentVariables.relatedKeys'
   ```

#### Common Environment Variable Issues:
- Key not set for Production environment
- Typo in variable name
- Extra spaces in the value
- Wrong API key (expired, invalid, etc.)

### Step 5: Network and Connectivity Issues

#### Check Network Connectivity:
The debug endpoint tests:
1. **General Internet**: `https://httpbin.org/get`
2. **Perplexity API**: `https://api.perplexity.ai`

#### Common Network Issues:
- Vercel region restrictions
- Firewall blocking outbound requests
- DNS resolution issues
- SSL/TLS certificate problems

### Step 6: API Key and Authentication Issues

#### Verify API Key:
1. **Test locally** with the same key
2. **Check Perplexity dashboard** for:
   - Key validity
   - Usage limits
   - Account status
   - Billing issues

#### Authentication Error Patterns:
```
❌ [PERPLEXITY] Response status: 401
❌ [PERPLEXITY] Response status: 403
❌ [PERPLEXITY] Error message: Invalid API key
```

## 🔍 Specific Debugging Commands

### Test the Debug Endpoint:
```bash
# Local
curl -s http://localhost:3000/api/debug | jq .

# Production
curl -s https://your-app.vercel.app/api/debug | jq .
```

### Test the Research Endpoint:
```bash
# Local
curl -X POST http://localhost:3000/api/research \
  -H "Content-Type: application/json" \
  -d '{"vcFirmName":"Test Firm","companyName":"Test Company"}'

# Production
curl -X POST https://your-app.vercel.app/api/research \
  -H "Content-Type: application/json" \
  -d '{"vcFirmName":"Test Firm","companyName":"Test Company"}'
```

### Monitor Vercel Logs in Real-Time:
```bash
vercel logs --follow
```

## 🚨 Common Issues and Solutions

### Issue 1: "API key not configured"
**Symptoms:**
- Debug endpoint shows `hasApiKey: false`
- Logs show "❌ [PERPLEXITY] API key not configured"

**Solutions:**
1. Check environment variable name: `PERPLEXITY_API_KEY`
2. Verify it's set for Production environment
3. Redeploy after setting the variable

### Issue 2: Network Connectivity Failures
**Symptoms:**
- Debug endpoint shows network test failures
- Timeout errors in logs

**Solutions:**
1. Check Vercel region restrictions
2. Try different Vercel regions
3. Contact Vercel support for network issues

### Issue 3: Authentication Errors (401/403)
**Symptoms:**
- API key is present but requests fail
- 401 or 403 status codes

**Solutions:**
1. Verify API key in Perplexity dashboard
2. Check account billing status
3. Regenerate API key if needed

### Issue 4: Timeout Errors
**Symptoms:**
- Requests timeout after 30 seconds
- "ECONNABORTED" or "timeout" errors

**Solutions:**
1. Check Perplexity API status
2. Reduce request complexity
3. Implement retry logic

## 📊 Log Analysis Tips

### Timing Analysis:
- Look for duration logs: `⏱️ [RESEARCH] Duration: XXX ms`
- Compare local vs production timing
- Identify bottlenecks

### Error Correlation:
- Match client-side errors with server-side logs
- Check timestamps for request flow
- Look for patterns in failures

### Environment Differences:
- Compare debug endpoint responses
- Check Node.js versions
- Verify environment variable differences

## 🔄 Testing Workflow

1. **Start with debug endpoint** - verify environment
2. **Check browser console** - client-side issues
3. **Monitor Vercel logs** - server-side issues
4. **Test with curl** - isolate frontend issues
5. **Compare local vs production** - environment differences

## 📞 Getting Help

If issues persist:
1. **Collect logs** from all sources
2. **Document environment differences**
3. **Test with minimal reproduction case**
4. **Contact Perplexity support** for API issues
5. **Contact Vercel support** for platform issues

---

**Remember**: The extensive logging we've added will help pinpoint exactly where the failure occurs. Look for the ❌ emoji in logs to quickly identify error points.
