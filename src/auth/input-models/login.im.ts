/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { DtoPrefix, getValidationMessage, ValidationType } from "src/_common/enums/ValidationMessage.enum";


export class LoginInput {

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
