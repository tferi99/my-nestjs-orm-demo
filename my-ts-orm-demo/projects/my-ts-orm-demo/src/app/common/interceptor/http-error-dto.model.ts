export interface HttpErrorDto {
  errorMessage: string;
  errorMessageId: string;
  data: string;
}

export interface ErrorMessage {
  message: string;
  data?: string;
}
