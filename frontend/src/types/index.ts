export interface Shareholder {
    firstName: string;
    lastName: string;
    nationality: string;
}

export interface FormData {
    companyName: string;
    numberOfShareholders: number;
    totalCapital: number;
    shareholders: Shareholder[];
}

export interface Company {
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


export interface AdminCompany extends Company {
  
}