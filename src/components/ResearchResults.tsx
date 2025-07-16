'use client'

import { VCResearchReport } from '@/types'

interface ResearchResultsProps {
  report: VCResearchReport
}

export function ResearchResults({ report }: ResearchResultsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center print-section">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          VC Research Report: {report.firmProfile.name}
        </h1>
        <p className="text-gray-600">
          Generated on {new Date(report.generatedAt).toLocaleDateString()}
        </p>
      </div>

      {/* VC Firm Profile */}
      <div className="bg-white rounded-lg shadow-lg p-6 print-section print-bg">
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

      {/* Key Contacts */}
      <div className="bg-white rounded-lg shadow-lg p-6 print-section print-bg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          👥 Key Contacts
        </h3>
        <div className="space-y-4">
          {report.firmProfile.keyContacts && report.firmProfile.keyContacts.length > 0 ? (
            report.firmProfile.keyContacts.map((contact, index) => (
              <div key={index} className={`border rounded-lg p-4 ${
                contact.isUserContact 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-200'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{contact.name}</h4>
                    {contact.isUserContact && (
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                        Your Contact
                      </span>
                    )}
                  </div>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                    {contact.title}
                  </span>
                </div>
                <p className="text-sm text-blue-600 mb-2">{contact.focusArea}</p>
                <p className="text-gray-700 mb-2">{contact.experience}</p>
                {contact.contactInfo && (
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Contact:</strong> {contact.contactInfo}
                  </p>
                )}
                {contact.relevanceReason && (
                  <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                    <strong>Why relevant:</strong> {contact.relevanceReason}
                  </p>
                )}
                {contact.isUserContact && !contact.contactInfo && (
                  <div className="text-sm text-amber-700 bg-amber-50 p-2 rounded mt-2">
                    <strong>Note:</strong> Limited public information available for this contact. Consider reaching out through LinkedIn or the firm's website.
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Contact information not publicly available</p>
            </div>
          )}
        </div>
      </div>

      {/* Notable Investments */}
      <div className="bg-white rounded-lg shadow-lg p-6 print-section print-bg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🏆 Notable Portfolio Investments
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {report.firmProfile.notableInvestments && report.firmProfile.notableInvestments.length > 0 ? (
            report.firmProfile.notableInvestments.map((investment, index) => (
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
                <p className="text-gray-700 mb-2">{investment.description}</p>
                {investment.exitStatus && (
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      investment.exitStatus === 'Public' ? 'bg-blue-100 text-blue-800' :
                      investment.exitStatus === 'Acquired' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {investment.exitStatus}
                    </span>
                    {investment.exitValue && (
                      <p className="text-sm text-gray-600 mt-1">{investment.exitValue}</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Notable investment information not publicly available</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent News */}
      <div className="bg-white rounded-lg shadow-lg p-6 print-section print-bg">
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
      <div className="bg-white rounded-lg shadow-lg p-6 print-section print-bg">
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
      <div className="bg-white rounded-lg shadow-lg p-6 print-section print-bg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🎯 Competitive Analysis
        </h3>
        <div className="space-y-4">
          {report.competitiveAnalysis.map((analysis, index) => {
            const getBackgroundColor = (similarity: string) => {
              switch (similarity.toLowerCase()) {
                case 'high':
                  return 'bg-red-50 border-red-200'
                case 'medium':
                  return 'bg-orange-50 border-orange-200'
                case 'low':
                  return 'bg-yellow-50 border-yellow-200'
                default:
                  return 'bg-gray-50 border-gray-200'
              }
            }
            
            const getTextColor = (similarity: string) => {
              switch (similarity.toLowerCase()) {
                case 'high':
                  return 'text-red-800'
                case 'medium':
                  return 'text-orange-800'
                case 'low':
                  return 'text-yellow-800'
                default:
                  return 'text-gray-800'
              }
            }
            
            return (
              <div key={index} className={`border rounded-lg p-4 print-bg ${getBackgroundColor(analysis.similarity)}`}>
                <h4 className="font-medium text-gray-900 mb-2">{analysis.companyName}</h4>
                <p className={`text-sm mb-2 font-medium ${getTextColor(analysis.similarity)}`}>
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
            )
          })}
        </div>
      </div>

      {/* Alternative VCs */}
      <div className="bg-white rounded-lg shadow-lg p-6 print-section print-bg">
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