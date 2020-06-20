import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { HttpExceptionFilter } from 'src/Exception/http-exception.filter';
import Joi = require('@hapi/joi');
import { ValidationPipe } from 'src/pipes/employee.pipe';
import { employee } from './employee.dto';

@Controller('employee')
@UseFilters(new HttpExceptionFilter())
export class EmployeeController {
  constructor(private readonly empService: EmployeeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createEmp(@Body() emp: employee) {
    return this.empService.create(emp);
  }
  @Get()
  getAllEmployees() {
    return this.empService.getAll();
  }
  @Put(':id')
  updateEmployee(@Param() id: number, @Body() emp: employee) {
    return this.empService.update(id, emp);
  }
  @Delete(':id')
  deleteEmployee(@Param() id: any) {
    return this.empService.delete(id);
  }
}
