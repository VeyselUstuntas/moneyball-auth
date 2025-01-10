export class RefreshTokenRequestDto {
  refreshToken: string;
  constructor(refreshToken: Partial<RefreshTokenRequestDto>) {
    Object.assign(this, refreshToken);
  }
}
