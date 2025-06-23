# VC Intel App

A sleek, modern web app for researching VC firms before investor meetings. Built for early-stage software company CEOs who need comprehensive intelligence on potential investors.

## Features

- **VC Firm Profiles**: Get detailed information about venture capital firms
- **Key Partners**: Senior partners and investors relevant to your company's tech category
- **Notable Investments**: 10 major portfolio companies with exit status and valuations
- **Recent News**: Latest press coverage and announcements
- **Investment Analysis**: Recent portfolio investments and funding rounds
- **Competitive Intelligence**: Color-coded analysis of portfolio companies that might compete with yours
- **Alternative Recommendations**: Discover similar VC firms that might be a good fit
- **PDF Export**: Professional print-to-PDF functionality for meeting preparation

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **AI Research**: OpenAI GPT-4
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key (for real data - optional for demo)

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
Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

**For Demo Mode:**
The app works without an API key using realistic mock data. Perfect for testing the interface and features.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## OpenAI API Setup (For Real Data)

### Getting Your API Key

1. **Create OpenAI Account:**
   - Visit [platform.openai.com](https://platform.openai.com)
   - Sign up and verify your account
   - Add billing information (required for API access)

2. **Generate API Key:**
   - Go to the "API Keys" section in your dashboard
   - Click "Create new secret key"
   - Copy the key (you won't see it again!)

3. **Cost Information:**
   - Each research report costs approximately $0.01-0.05
   - Very affordable for the comprehensive intelligence provided
   - You only pay for what you use

### Adding the API Key

**Local Development:**
```bash
# Add to .env.local file
OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Vercel Deployment:**
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add `OPENAI_API_KEY` with your key as the value
4. Redeploy your application

### Data Quality Comparison

| Feature | Demo Mode (No API Key) | Real Data Mode (With API Key) |
|---------|------------------------|--------------------------------|
| VC Firm Profiles | Realistic mock data | Real, current firm information |
| Recent News | Sample headlines | Actual recent press coverage |
| Investments | Famous portfolio companies | Current portfolio and recent deals |
| Partners | Generic partner info | Real partners with current roles |
| Competitive Analysis | Template analysis | AI-powered competitive insights |
| Alternative VCs | Sample recommendations | Tailored recommendations |

## Usage

1. Enter the name of the VC firm you want to research (case insensitive)
2. Enter your company name for competitive analysis
3. Click "Start Research" to generate a comprehensive report
4. Use the "Export to PDF" button to save for meetings
5. Review the six key sections:
   - Firm Profile with Key Partners
   - Notable Portfolio Investments (with exit status)
   - Recent News
   - Recent Investments
   - Color-Coded Competitive Analysis
   - Alternative VC Recommendations

## Deployment

This app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel dashboard
4. Deploy!

## Contributing

This is an open-source project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Disclaimer

This tool provides research assistance based on publicly available information. Always verify information independently before making investment decisions.