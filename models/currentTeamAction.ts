export interface currnetTeamsActionsModel {
  success: boolean;
  data: {
    finance: {
      total_price: number;
      payment: number;
    };
    employees: {
      total_count: number;
    };
    contracts: {
      total_count: number;
    };
    campaigns: {
      total_count: number;
      completed_percentage: number;
      uncompleted_percentage: number;
      completed_count: number;
      uncompleted_count: number;
    };
  };
}
