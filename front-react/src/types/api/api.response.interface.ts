export interface ApiResponse<TPayload> {
  success: boolean;
  error?: string;
  payload?: TPayload;
}
