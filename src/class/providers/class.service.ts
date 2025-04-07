import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subject } from "@/subject/entities/subject.entity";
import { Teacher } from "@/user/entities/teacher.entity";
import { CreateClassDto } from "../dto/create-class.dto";
import { UpdateClassDto } from "../dto/update-class.dto";
import { Class } from "../entities/class.entity";

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const subject = await this.subjectRepository.findOne({
      where: { id: createClassDto.subjectId },
    });

    if (!subject) throw new NotFoundException("subject not found");

    const teacher = await this.teacherRepository.findOne({
      where: { id: createClassDto.teacherId },
    });

    if (!teacher) throw new NotFoundException("teacher not found");

    const className = new Class();
    className.classNo = createClassDto.classNo;
    className.room = createClassDto.room;
    className.from = new Date(createClassDto.from);
    className.to = new Date(createClassDto.to);
    className.duration = createClassDto.duration;
    className.subject = subject;
    className.teacher = teacher;
    this.classRepository.save(className);

    return true;
  }

  async findAll() {
    return this.classRepository.find({
      relations: ["subject", "teacher"],
    });
  }

  async findOne(id: number) {
    return this.classRepository.findOne({
      where: { id },
      relations: ["subject", "teacher"],
    });
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    const className = await this.classRepository.findOne({
      where: { id },
      relations: ["subject", "teacher"],
    });

    if (!className) throw new NotFoundException("class not found");

    className.subject = await this.subjectRepository.findOne({
      where: { id: updateClassDto.subjectId },
    });

    if (!className.subject) throw new NotFoundException("subject not found");

    className.teacher = await this.teacherRepository.findOne({
      where: { id: updateClassDto.teacherId },
    });

    if (!className.teacher) throw new NotFoundException("teacher not found");

    className.classNo = updateClassDto.classNo;
    className.room = updateClassDto.room;
    className.from = new Date(updateClassDto.from);
    className.to = new Date(updateClassDto.to);
    className.duration = updateClassDto.duration;
    this.classRepository.save(className);

    return true;
  }

  async remove(id: number) {
    const className = await this.classRepository.findOne({
      where: { id },
      relations: ["subject", "teacher"],
    });

    if (!className) throw new NotFoundException("class not found");
    await this.classRepository.softDelete(id);

    return true;
  }
}
