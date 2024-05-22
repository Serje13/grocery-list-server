
import { IsNotEmpty, IsString, IsInt } from 'class-validator';


export class CreateGroceryDto {
    @IsNotEmpty()
  	@IsString()
    title: string;

	@IsNotEmpty()
	@IsInt()
  	status:number;

	@IsNotEmpty()
	@IsInt()
  	priority: number;

	@IsNotEmpty()
	@IsInt()
	userId: number;
}
