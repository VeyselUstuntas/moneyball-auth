export class LoginRequestDto {
  email: string;
  password: string;

  constructor(loginRequestDto: Partial<LoginRequestDto>) {
    Object.assign(this, loginRequestDto);
  }
}
