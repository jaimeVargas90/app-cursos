import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
  HttpCode,
  Req,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { Request } from 'express';
import { BrowserAgentGuard } from 'src/guards/browser-agent/browser-agent.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard';
import { Rol } from 'src/decorators/rol/rol.decorator';

@UseGuards(JwtGuardGuard, RolesGuard)
@UseGuards(BrowserAgentGuard)
@Controller('courses')
@ApiBearerAuth()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @HttpCode(201)
  @Rol(['admin'])
  create(@Req() req: Request, @Body() createCourseDto: CreateCourseDto) {
    console.log('req -----', req.user);
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @Rol(['manager', 'admin'])
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
