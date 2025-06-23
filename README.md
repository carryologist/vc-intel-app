# VC Intel App

A sleek, modern web app for researching VC firms before investor meetings. Built for early-stage software company CEOs who need comprehensive intelligence on potential investors.

## Features

- **VC Firm Profiles**: Get detailed information about venture capital firms
- **Recent News**: Latest press coverage and announcements
- **Investment Analysis**: Recent portfolio investments and funding rounds
- **Competitive Intelligence**: Analysis of portfolio companies that might compete with yours
- **Alternative Recommendations**: Discover similar VC firms that might be a good fit

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **AI Research**: OpenAI GPT-4
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

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

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter the name of the VC firm you want to research
2. Enter your company name for competitive analysis
3. Click "Start Research" to generate a comprehensive report
4. Review the five key sections:
   - Firm Profile
   - Recent News
   - Recent Investments
   - Competitive Analysis
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