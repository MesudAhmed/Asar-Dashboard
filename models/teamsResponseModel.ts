export interface Team {
    id: string;
    name: string;
    team_name: string;
    created_at: string;
    address: string;
}

export interface teamsResponse {
    data: Team[];
    success: boolean;
}
