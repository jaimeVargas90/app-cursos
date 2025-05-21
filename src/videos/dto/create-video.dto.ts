import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @Length(1, 16)
  title: string;

  @IsNotEmpty()
  @Length(1, 16)
  description: string;

  @IsUrl()
  src: string;
}
