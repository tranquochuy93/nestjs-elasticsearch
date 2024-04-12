import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { MAX_PASSWORD_LENGTH } from "~auth/constants/max-email-length.constant";
import { MAX_EMAIL_LENGTH } from "~auth/constants/max-password-length.constant";

export class SignInDto {
    @IsNotEmpty()
    @MaxLength(MAX_EMAIL_LENGTH)
    @IsEmail({}, { message: 'Email must be valid' })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_PASSWORD_LENGTH)
    readonly password: string;
}