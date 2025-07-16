'use client'

import { VCResearchReport } from '@/types'

interface ResearchResultsProps {
  report: VCResearchReport
}

export function ResearchResults({ report }: ResearchResultsProps) {
  return (
    <div className="space-y-10">
      <div className="text-center print-section">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-4 shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
          VC Research Report
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          {report.firmProfile.name}
        </h2>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Generated on {new Date(report.generatedAt).toLocaleDateString()}
        </div>
      </div>

      {/* VC Firm Profile */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 print-section print-bg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Firm Profile
          </h3>
        </div>
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
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 print-section print-bg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Key Contacts
          </h3>
        </div>
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
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 print-section print-bg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Notable Portfolio Investments
          </h3>
        </div>
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
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 print-section print-bg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Recent News
          </h3>
        </div>
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
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 print-section print-bg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Recent Investments
          </h3>
        </div>
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
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 print-section print-bg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Competitive Analysis
          </h3>
        </div>
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