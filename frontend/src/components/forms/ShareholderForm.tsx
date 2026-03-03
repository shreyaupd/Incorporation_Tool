import FormWrapper from '../../FormWrapper'
import type { Shareholder } from "../../types"

type ShareholderFormProps = {
  shareholders: Shareholder[];
  numberOfShareholders: number;
  updateShareholders: (shareholders: Shareholder[]) => void;
}

const ShareholderForm = ({
  shareholders,
  numberOfShareholders,
  updateShareholders
}: ShareholderFormProps) => {

  const updateShareholder = (index: number, field: keyof Shareholder, value: string) => {
    const newShareholders = [...shareholders]
    if (!newShareholders[index]) {
      newShareholders[index] = { firstName: '', lastName: '', nationality: '' }
    }
    newShareholders[index] = { ...newShareholders[index], [field]: value }
    updateShareholders(newShareholders)
  }

  return (
    <FormWrapper title="Shareholder Information">

      <div className="flex flex-col gap-6">
        {Array.from({ length: numberOfShareholders }).map((_, index) => (
          <div key={index} className="p-6 border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold">
                {index + 1}
              </span>
              <h3 className="font-bold text-slate-900">Shareholder Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">First Name *</label>
                <input
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  type="text"
                  required
                  value={shareholders[index]?.firstName || ''}
                  onChange={e => updateShareholder(index, 'firstName', e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Name *</label>
                <input
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  type="text"
                  required
                  value={shareholders[index]?.lastName || ''}
                  onChange={e => updateShareholder(index, 'lastName', e.target.value)}
                />
              </div>

              <div className="col-span-1 sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nationality *</label>
                <input
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  type="text"
                  required
                  value={shareholders[index]?.nationality || ''}
                  onChange={e => updateShareholder(index, 'nationality', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </FormWrapper>
  )
}

export default ShareholderForm