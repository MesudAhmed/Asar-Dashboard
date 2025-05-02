export interface LoginResponse {
    data: { token: string }
    role: string;
    userId: string;
}
