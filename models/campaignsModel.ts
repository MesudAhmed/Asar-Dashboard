export interface Campaign {
  id: number;
  name: string;
  location: string;
  status: string;
  date: string;
  category: string;
  cost: string;
}

export interface teamCampaignsModel {
  success: boolean;
  data: {
    ongoing_campaigns: Campaign[];
    completed_campaigns: Campaign[];
  };
}
