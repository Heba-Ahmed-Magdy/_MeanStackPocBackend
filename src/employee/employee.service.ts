import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { employee } from './employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './Employee.entity';
import { Console } from 'console';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private EmployeeRepo: Repository<Employee>,
  ) {}

  mysqlEmployees: employee[] = [];

  async create(emp: employee) {
    const _emp: Employee = { Id: emp.id, Name: emp.name, Age: emp.age };
    await this.EmployeeRepo.insert(_emp);
  }
  async getAll() {
    await this.insertStaticData();
    await this.EmployeeRepo.find().then(response => {
      this.mysqlEmployees = [];
      response.map(obj => {
        this.mysqlEmployees.push(new employee(obj.Id, obj.Name, obj.Age));
      });
    });
    console.log(this.mysqlEmployees);

    return this.mysqlEmployees;
  }
  async update(params: any, emp: employee) {
    await this.EmployeeRepo.update(Number(params.id), {
      Name: emp.name,
      Age: emp.age,
    });
    return await this.getAll();
  }
  async delete(params: any) {
    await this.EmployeeRepo.delete([Number(params.id)]);
    // if (index === -1)
    //   throw new HttpException('Invalid index', HttpStatus.FORBIDDEN);
    return await this.getAll();
  }

  async insertStaticData() {
    const arr: Employee[] = [
      { Id: 1, Name: 'Mysqlahmed1', Age: 23 },
      { Id: 2, Name: 'Mysqlahmed2', Age: 24 },
      { Id: 3, Name: 'Mysqlahmed3', Age: 25 },
    ];
    await this.EmployeeRepo.find().then(response => {
      if (response.length !== 0) {
        console.log('there is data');
        return;
      }
      console.log("there isn't data");
      this.EmployeeRepo.insert(arr);
    });
  }
}
