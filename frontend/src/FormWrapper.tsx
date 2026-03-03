import type { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
}
const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-center">{title}</h1>
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  )
}

export default FormWrapper