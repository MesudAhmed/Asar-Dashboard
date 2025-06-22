export interface teamsActionsModel {
  success: boolean;
  data: {
    id: number;
    full_name: string;
    team_name: string;
    license_number: string;
    phone: string;
    bank_account_number: string;
    email: string;
    address: string | null;
    status: string;
    total_finance: string;
    total_campaigns: number;
    total_employees: number;
    total_campaigns_rejected: number;
    total_campaigns_done: number;
    created_at: string;
  };
}
