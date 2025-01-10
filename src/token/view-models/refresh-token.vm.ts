export class RefreshTokenViewModel {
  token: string;
  userId: number;
  expiryDate: Date;

  constructor(refreshToken: Partial<RefreshTokenViewModel>) {
    Object.assign(this, refreshToken);
  }
}
