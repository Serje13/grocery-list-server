import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';

@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Post()
  create(@Body() createGroceryDto: CreateGroceryDto) {
    return this.groceryService.create(createGroceryDto);
  }

  @Get(':userId')
  findAll(@Param('userId') id:string) {
    return this.groceryService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groceryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroceryDto: UpdateGroceryDto) {
    return this.groceryService.update(+id, updateGroceryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groceryService.remove(+id);
  }
}
