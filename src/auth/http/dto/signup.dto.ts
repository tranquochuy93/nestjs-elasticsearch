import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MAX_PASSWORD_LENGTH } from '~auth/constants/max-email-length.constant';
import { MAX_NAME_LENGTH } from '~auth/constants/max-name-length.constant';
import { MAX_EMAIL_LENGTH } from '~auth/constants/max-password-length.constant';
import { MIN_NAME_LENGTH } from '~auth/constants/min-name-length.constant';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_NAME_LENGTH)
  @MinLength(MIN_NAME_LENGTH)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_NAME_LENGTH)
  @MinLength(MIN_NAME_LENGTH)
  lastName: string;

  @IsNotEmpty()
  @MaxLength(MAX_EMAIL_LENGTH)
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_PASSWORD_LENGTH)
  readonly password: string;
}
