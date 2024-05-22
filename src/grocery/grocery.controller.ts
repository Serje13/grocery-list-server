import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe,ParseIntPipe} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { FilterDto } from './dto/filter-grocery.dto';
import { GroceryType, GroceryTypeCombined } from './types'

@Controller('grocery-managment')
export class GroceryController {
  	constructor(private readonly groceryService: GroceryService) {}

  	@Post()
  	create(@Body() createGroceryDto: CreateGroceryDto) : Promise<GroceryType> {
    	return this.groceryService.create(createGroceryDto);
  	}

  	@Get('/users/:userId/groceries')
	findAll(@Param('userId') id:string, @Query('filter') filter:FilterDto) : Promise<GroceryTypeCombined[] | null> {
		const parameters= filter === undefined ? undefined : +filter;
		return this.groceryService.findAll(+id, parameters);
  	}


  	@Get('/groceries/:id')
	findOne(@Param('id') id:string) : Promise<GroceryTypeCombined | null> {
		return this.groceryService.findOne(+id);
  	}

  	@Patch('/groceries/:id')
  	update(@Param('id') id:string, @Body() updateGroceryDto: UpdateGroceryDto) : Promise<GroceryTypeCombined | null> {
    	return this.groceryService.update(+id, updateGroceryDto);
  	}

  	@Delete('/groceries/:id')
  	remove(@Param('id') id: string) : Promise<GroceryType | null> {
    	return this.groceryService.remove(+id);
  	}
}
