export class RegisterRequestDto {
  name: string;
  lastname: string;
  email: string;
  password: string;

  constructor(registerRequestDto: RegisterRequestDto) {
    Object.assign(this, registerRequestDto);
  }
}
