import FormWrapper from "../../FormWrapper"

type CompanyFormProps = {
  companyName: string;
  numberOfShareholders: number;
  totalCapital: number;
  updateFields: (fields: Partial<{
    companyName: string;
    numberOfShareholders: number;
    totalCapital: number;
  }>) => void;
}

const CompanyForm = ({
  companyName,
  numberOfShareholders,
  totalCapital,
  updateFields
}: CompanyFormProps) => {
  return (
    <FormWrapper title="Company Information">
      <div className="grid gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Company Name *</label>
          <input
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            type="text"
            autoFocus
            required
            value={companyName}
            onChange={e => updateFields({ companyName: e.target.value })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Number of Shareholders *</label>
            <input
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none"
              type="number"
              required
              value={numberOfShareholders}
              onChange={e => updateFields({ numberOfShareholders: parseInt(e.target.value)})}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Total Capital Invested ($)</label>
            <input
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none"
              type="number"
              value={totalCapital}
              onChange={e => updateFields({ totalCapital: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  )
}

export default CompanyForm