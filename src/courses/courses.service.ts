import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './model/course.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/model/user.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly CourseModel: Model<Course>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    return this.CourseModel.create(createCourseDto);
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    console.log(updateCourseDto);
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
