/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { DtoPrefix, getValidationMessage, ValidationType } from 'src/_common/enums/ValidationMessage.enum';


export class RegisterRequestDto {

    @MaxLength(15, { message: getValidationMessage(DtoPrefix.NAME, ValidationType.MAX_LENGTH, 15) })
    @MinLength(3, { message: getValidationMessage(DtoPrefix.NAME, ValidationType.MIN_LENGTH, 3) })
    @IsString({ message: getValidationMessage(DtoPrefix.NAME, ValidationType.MUST_BE_STRING) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.NAME, ValidationType.IS_NOT_EMPTY) })
    name: string;

    @MaxLength(20, { message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MAX_LENGTH, 20) })
    @MinLength(2, { message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MIN_LENGTH, 2) })
    @IsString({ message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MUST_BE_STRING) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.IS_NOT_EMPTY) })
    lastname: string;

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
