import { BaseResponse } from 'src/_base/response/Base.response';
import { AuthResponse } from 'src/_common/response/auth.response';

export class LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthResponse;
}

export class LoginResponseDto extends BaseResponse<LoginResponse> {
  data: LoginResponse;
  message: string;
  success: boolean;
}
