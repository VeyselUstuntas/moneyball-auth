import { RefreshTokenViewModel } from './refresh-token.vm';

export class GetRefreshTokenViewModel {
  refreshToken: RefreshTokenViewModel;
  isValid: boolean;

  constructor(getRefreshToken: Partial<GetRefreshTokenViewModel>) {
    Object.assign(this, getRefreshToken);
  }
}
