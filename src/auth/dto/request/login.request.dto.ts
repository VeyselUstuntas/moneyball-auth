/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { DtoPrefix, getValidationMessage, ValidationType } from "src/_common/enums/ValidationMessage.enum";


export class LoginRequestDto {

    @MaxLength(25, { message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.MAX_LENGTH, 25) })
    @MinLength(5, { message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.MIN_LENGTH, 5) })
    @IsEmail({},{ message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.MUST_BE_STRING) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.IS_NOT_EMPTY) })
    email: string;

    @MaxLength(30, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.MAX_LENGTH, 30) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.MIN_LENGTH, 6) })
    @IsStrongPassword({},{ message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.NOT_STRONG) })
    @IsString({ message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.MUST_BE_STRING) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.IS_NOT_EMPTY) })
    password: string;
}
