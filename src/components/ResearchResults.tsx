'use client'

import { VCResearchReport } from '@/types'

interface ResearchResultsProps {
  report: VCResearchReport
}

export function ResearchResults({ report }: ResearchResultsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Research Report
        </h2>
        <p className="text-gray-600">
          Generated on {new Date(report.generatedAt).toLocaleDateString()}
        </p>
      </div>

      {/* VC Firm Profile */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          📊 Firm Profile
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700">Name</h4>
            <p className="text-gray-900">{report.firmProfile.name}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Founded</h4>
            <p className="text-gray-900">{report.firmProfile.founded}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Location</h4>
            <p className="text-gray-900">{report.firmProfile.location}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Investment Size</h4>
            <p className="text-gray-900">{report.firmProfile.typicalInvestmentSize}</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-2">Description</h4>
          <p className="text-gray-900">{report.firmProfile.description}</p>
        </div>
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-2">Focus Areas</h4>
          <div className="flex flex-wrap gap-2">
            {report.firmProfile.focusAreas.map((area, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent News */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          📰 Recent News
        </h3>
        <div className="space-y-4">
          {report.recentNews.map((news, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-gray-900">{news.title}</h4>
              <p className="text-sm text-gray-600 mb-2">
                {news.source} • {new Date(news.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">{news.summary}</p>
              {news.url && (
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Read more →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Investments */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          💰 Recent Investments
        </h3>
        <div className="space-y-4">
          {report.recentInvestments.map((investment, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{investment.companyName}</h4>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {investment.amount}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {investment.round} • {new Date(investment.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">{investment.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Competitive Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🎯 Competitive Analysis
        </h3>
        <div className="space-y-4">
          {report.competitiveAnalysis.map((analysis, index) => (
            <div key={index} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
              <h4 className="font-medium text-gray-900 mb-2">{analysis.companyName}</h4>
              <p className="text-sm text-orange-800 mb-2">
                Similarity: {analysis.similarity}
              </p>
              <p className="text-gray-700 mb-3">{analysis.reasoning}</p>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Potential Concerns:</h5>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {analysis.potentialConcerns.map((concern, idx) => (
                    <li key={idx}>{concern}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative VCs */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🔄 Alternative VC Firms
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {report.alternativeVCs.map((vc, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{vc.name}</h4>
              <p className="text-gray-700 mb-2">{vc.reasoning}</p>
              <p className="text-sm text-blue-600">{vc.focusAlignment}</p>
              {vc.contactInfo && (
                <p className="text-sm text-gray-500 mt-2">{vc.contactInfo}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}