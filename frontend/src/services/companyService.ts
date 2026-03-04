import api from './axiosConfig';
import type { FormData } from '../types';

interface CompanyResponse {
  message: string;
  result: Array<{
    id: number;
    name: string;
    number_of_shareholder: number;
    total_capital: number;
    status: string;
    created_at: string;
  }>;
}

interface Company {
  id: number;
  name: string;
  number_of_shareholder: number;
  total_capital: number;
  status: string;
  created_at: string;
  shareholders?: Array<{
    id: number;
    company_id: number;
    first_name: string;
    last_name: string;
    nationality: string;
    created_at?: string;
  }>;
}

export const companyService = {
  createCompany: async (companyData: FormData) => {
    const response = await api.post<CompanyResponse>('/company', {
      name: companyData.companyName,
      number_of_shareholder: companyData.numberOfShareholders,
      total_capital: companyData.totalCapital
    });
    return response.data;
  },
  addShareholders: async (companyId: number, shareholders: FormData['shareholders']) => {
    const shareholdersData = shareholders.map(s => ({
      first_name: s.firstName,
      last_name: s.lastName,
      nationality: s.nationality
    }));
    
    const response = await api.post(`/company/${companyId}/shareholders`, shareholdersData);
    return response.data;   
  },

  getAllCompanies: async () => {
    const response = await api.get<Company[]>('/company');
    return response.data;
  },

  getCompany: async (id: number) => {
    const response = await api.get<Company>(`/company/${id}`);
    return response.data; 
  }
};