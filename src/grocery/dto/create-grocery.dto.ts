
import { IsNotEmpty, IsString, IsBoolean, IsInt } from 'class-validator';


export class CreateGroceryDto {
    @IsNotEmpty()
  	@IsString()
    title: string;

	@IsNotEmpty()
	@IsBoolean()
  	status:boolean;

	@IsNotEmpty()
	@IsInt()
  	priority: number;
}
