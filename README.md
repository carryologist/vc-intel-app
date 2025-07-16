# VC Intel App

A sleek, modern web app for researching VC firms before investor meetings. Built for early-stage software company CEOs who need comprehensive intelligence on potential investors.

## Features

- **VC Firm Profiles**: Get detailed information about venture capital firms
- **Key Partners**: Senior partners and investors relevant to your company's tech category
- **Notable Investments**: 10 major portfolio companies with exit status and valuations
- **Recent News**: Latest press coverage and announcements with real citations
- **Investment Analysis**: Recent portfolio investments and funding rounds
- **Competitive Intelligence**: Color-coded analysis of portfolio companies that might compete with yours
- **Alternative Recommendations**: Discover similar VC firms that might be a good fit
- **PDF Export**: Professional print-to-PDF functionality for meeting preparation
- **Real-time Web Search**: Powered by Perplexity AI for accurate, up-to-date information

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **AI Research**: Perplexity AI with real-time web search
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- Perplexity API key (for real data - optional for demo)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/carryologist/vc-intel-app.git
cd vc-intel-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional for demo):
```bash
cp .env.example .env.local
```

**For Real VC Research Data:**
Add your Perplexity API key to `.env.local`:
```
PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

**For Demo Mode:**
The app works without an API key using realistic mock data. Perfect for testing the interface and features.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Perplexity API Setup (For Real Data)

### Why Perplexity?

Perplexity AI provides several advantages over traditional LLMs for VC research:
- **Real-time web search**: Access to current information, not just training data
- **Citation support**: Every fact comes with verifiable sources
- **Reduced hallucination**: Web-grounded responses prevent made-up information
- **Recent news access**: Can find articles from the last month
- **Domain filtering**: Focuses on reputable financial and tech news sources

### Getting Your API Key

1. **Create Perplexity Account:**
   - Visit [perplexity.ai](https://perplexity.ai)
   - Sign up for a Pro account
   - Navigate to API settings

2. **Generate API Key:**
   - Go to the "API" section in your dashboard
   - Click "Create new API key"
   - Copy the key (store it securely!)

3. **Cost Information:**
   - Each research report costs approximately $0.02-0.08
   - More expensive than traditional LLMs but provides real-time, cited information
   - You only pay for what you use
   - Significantly reduces hallucination risk

### Adding the API Key

**Local Development:**
```bash
# Add to .env.local file
PERPLEXITY_API_KEY=pplx-your-actual-api-key-here
```

**Vercel Deployment:**
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add `PERPLEXITY_API_KEY` with your key as the value
4. Redeploy your application

### Data Quality Comparison

| Feature | Demo Mode (No API Key) | Real Data Mode (With Perplexity) |
|---------|------------------------|-----------------------------------|
| VC Firm Profiles | Realistic mock data | Real, current firm information with citations |
| Recent News | Sample headlines | Actual recent press coverage with source links |
| Investments | Famous portfolio companies | Current portfolio and recent deals with verification |
| Partners | Generic partner info | Real partners with current roles and backgrounds |
| Competitive Analysis | Template analysis | AI-powered competitive insights based on real data |
| Alternative VCs | Sample recommendations | Tailored recommendations based on recent activity |
| Citations | None | Full source citations for every claim |
| Recency | Static data | Information from the last month |

## Usage

1. Enter the name of the VC firm you want to research (case insensitive)
2. Enter your company name for competitive analysis
3. Optionally enter a specific contact name for personalized insights
4. Click "Start Research" to generate a comprehensive report
5. Use the "Export to PDF" button to save for meetings
6. Review the six key sections:
   - Firm Profile with Key Partners (with citations)
   - Notable Portfolio Investments (with exit status and sources)
   - Recent News (with source links)
   - Recent Investments (with verification)
   - Color-Coded Competitive Analysis (based on real portfolio data)
   - Alternative VC Recommendations (based on recent activity)

## Anti-Hallucination Features

This app is specifically designed to minimize AI hallucination:

- **Web-grounded responses**: All information comes from real web search
- **Citation requirements**: Every fact must have a verifiable source
- **Domain filtering**: Only searches reputable financial and tech news sources
- **Recency filters**: Prioritizes recent information (last month)
- **Validation checks**: Warns if AI response doesn't match requested firm
- **Empty over fake**: Returns empty sections rather than fabricated information
- **Source transparency**: All sources are listed for manual verification

## Deployment

This app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `PERPLEXITY_API_KEY` environment variable
4. Deploy and start researching!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.
