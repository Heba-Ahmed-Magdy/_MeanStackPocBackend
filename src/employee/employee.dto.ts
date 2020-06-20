import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class employee {
  @IsNumber()
  id: number;
  @IsNotEmpty()
  name: string;
  @IsNumber()
  age: number;
  constructor(id: number, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}
