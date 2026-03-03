import { useState, useEffect } from "react"
import type { FormEvent } from "react"
import type { FormData, Shareholder } from "./types"
import { useMultistepForm } from "./hooks/multistepform"
import { companyService } from "./services/companyService"
import CompanyForm from "./components/forms/CompanyForm"
import ShareholderForm from "./components/forms/ShareholderForm"
import AdminPage from './components/admin/AdminPage'
import Navbar from './components/Navbar'  // Import the navbar

const INITIAL_DATA: FormData = {
  companyName: "",
  numberOfShareholders: 1,
  totalCapital: 0,
  shareholders: []
}

const App = () => {
  const [view, setView] = useState<'form' | 'admin'>('form')
  const [data, setData] = useState<FormData>(() => {
    const savedDraft = localStorage.getItem('companyDraft')
    return savedDraft ? JSON.parse(savedDraft) : INITIAL_DATA
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('companyDraft', JSON.stringify(data))
  }, [data])

  const updateFields = (fields: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...fields }))
  }

  const updateShareholders = (shareholders: Shareholder[]) => {
    setData(prev => ({ ...prev, shareholders }))
  }

  const clearForm = () => {
    if (window.confirm('Are you sure you want to clear all form data? This cannot be undone.')) {
      setData(INITIAL_DATA)
      localStorage.removeItem('companyDraft')
      if (currentStepIndex !== 0) {
        goTo(0)
      }
    }
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } =
    useMultistepForm([
      <CompanyForm
        key="company"
        {...data}
        updateFields={updateFields}
      />,
      <ShareholderForm
        key="shareholders"
        shareholders={data.shareholders}
        numberOfShareholders={data.numberOfShareholders}
        updateShareholders={updateShareholders}
      />
    ])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (isLastStep) {
      setLoading(true)
      try {
        const missingShareholders = data.shareholders.some(
          s => !s.firstName || !s.lastName || !s.nationality
        )

        if (missingShareholders) {
          alert('❌ Please fill in all shareholder details')
          setLoading(false)
          return
        }

        const companyResult = await companyService.createCompany(data)
        const companyId = companyResult.result[0]?.id

        if (!companyId) {
          throw new Error('No company ID returned from server')
        }

        if (data.shareholders.length > 0) {
          await companyService.addShareholders(companyId, data.shareholders)
        }

        alert('✅ Company incorporated successfully!')
        localStorage.removeItem('companyDraft')
        setData(INITIAL_DATA)

      } catch (error: any) {
        console.error('Submission error:', error)
        alert(`❌ Failed to submit: ${error.response?.data?.error || error.message || 'Please try again.'}`)
      } finally {
        setLoading(false)
      }
    } else {
      next()
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar view={view} setView={setView} />

      <div className="max-w-6xl w-full mx-auto px-4 py-8">
        {view === 'form' ? (
          <div className="w-full max-w-2xl mx-auto">
            <div className="relative bg-white border border-slate-200 shadow-sm p-8 sm:p-12 rounded-2xl w-full">
              <form onSubmit={handleSubmit}>
                <div className="absolute top-6 right-8 bg-blue-50 text-blue-700 font-medium text-sm px-4 py-1.5 rounded-full border border-blue-100">
                  Step {currentStepIndex + 1} of {steps.length}
                </div>
                <button
                  type="button"
                  onClick={clearForm}
                  className="absolute bottom-14 left-8 text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Clear Form
                </button>
                <div className="pt-2">
                  {step}
                </div>

                <div className="mt-12 flex gap-4 justify-end border-t border-slate-100 pt-8">
                  {!isFirstStep && (
                    <button
                      type="button"
                      onClick={back}
                      disabled={loading}
                      className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type='submit'
                    disabled={loading}
                    className="px-8 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : (isLastStep ? 'Submit Incorporation' : 'Next Step')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <AdminPage />
        )}
      </div>
    </div>
  )
}

export default App