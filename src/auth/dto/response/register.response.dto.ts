import { BaseResponse } from 'src/_base/response/Base.response';
import { AuthResponse } from 'src/_common/response/auth.response';

export class RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthResponse;
}

export class RegisterResponseDto extends BaseResponse<RegisterResponse> {
  data: RegisterResponse;
  message: string;
  success: boolean;
}
