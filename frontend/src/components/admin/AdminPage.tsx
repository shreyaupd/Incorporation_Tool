import { useState, useEffect } from 'react'
import { companyService } from '../../services/companyService'
import type { Company } from '../../types'

const AdminPage = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const data = await companyService.getAllCompanies()
      setCompanies(data)
    } catch (error) {
      console.error('Failed to fetch companies:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center p-8">Loading...</div>

  return (
    <div className="flex flex-col gap-8 w-full">
       <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Companies Admin Dashboard
        </h1>
        <p className="text-slate-500 font-medium">
          Manage and review all submitted company incorporations.
        </p>
      </div>


      <div className="flex flex-col gap-6">
        {companies.map(company => (
          <div
            key={company.id}
            className="border border-slate-200 rounded-2xl p-8 bg-white shadow-sm flex flex-col gap-6"
          >

            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-slate-900">{company.name}</h2>
                <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">
                  Company ID: #{company.id}
                </p>
              </div>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${company.status === 'completed'
                  ? 'bg-green-50 text-green-700 border-green-100'
                  : 'bg-blue-50 text-blue-700 border-blue-100'
                  }`}
              >
                {company.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-6 p-5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex-1 min-w-[150px]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Shareholders
                </span>
                <span className="text-lg font-bold text-slate-700">
                  {company.number_of_shareholder}
                </span>
              </div>
              <div className="flex-1 min-w-[150px]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Total Capital
                </span>
                <span className="text-lg font-bold text-slate-700">
                  ${company.total_capital?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Shareholders Section */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                Shareholder Details
              </h3>

              {/* Shareholders Cards - Horizontal scroll on mobile, wrap on desktop */}
              <div className="flex flex-wrap gap-4">
                {company.shareholders?.map((sh, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 p-4 rounded-xl flex-1 min-w-[200px] shadow-sm"
                  >
                    <span className="text-sm font-bold text-slate-800 block">
                      {sh.first_name} {sh.last_name}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {sh.nationality}
                    </span>
                  </div>
                ))}
                {(!company.shareholders || company.shareholders.length === 0) && (
                  <p className="text-slate-500 text-sm">No shareholders added</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPage