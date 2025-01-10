/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { DtoPrefix, getValidationMessage, ValidationType } from 'src/_common/enums/ValidationMessage.enum';


export class RegisterInput {

    @MinLength(3, { message: getValidationMessage(DtoPrefix.NAME, ValidationType.MIN_LENGTH, 3) })
    @ApiProperty()
    name: string;

    @MinLength(2, { message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MIN_LENGTH, 2) })
    @ApiProperty()
    lastname: string;

    @IsEmail({},{ message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.MUST_BE_STRING) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.IS_NOT_EMPTY) })
    @ApiProperty()
    email: string;

    @MaxLength(30, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.MAX_LENGTH, 30) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.MIN_LENGTH, 6) })
    @IsStrongPassword({},{ message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.NOT_STRONG) })
    @ApiProperty()
    password: string;
}
