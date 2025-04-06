import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSemesterEventDto } from "../dto/create-semester-event.dto";
import { UpdateSemesterEventDto } from "../dto/update-semester-event.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { SemesterEvent } from "../entities/semester-event.entity";
import { User } from "@/user/entities/user.entity";
import { Class } from "@/class/entities/class.entity";

@Injectable()
export class SemesterEventService {
  constructor(
    @InjectRepository(SemesterEvent) private semesterEventRepo: Repository<SemesterEvent>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Class) private classRepo: Repository<Class>,
  ) {}

  async create(createSemesterEventDto: CreateSemesterEventDto, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException("user not found");
    const semesterEvent = new SemesterEvent();
    semesterEvent.title = createSemesterEventDto.title;
    semesterEvent.from = new Date(createSemesterEventDto.from);
    semesterEvent.to = new Date(createSemesterEventDto.to);
    semesterEvent.user = user;
    await this.semesterEventRepo.save(semesterEvent);

    return true;
  }

  async findAll(userId: number) {
    return this.semesterEventRepo.find({
      where: { user: { id: userId } },
      relations: { user: true, classes: true },
    });
  }

  async findOne(id: number, userId: number) {
    return this.semesterEventRepo.findOne({
      where: { id, user: { id: userId } },
      relations: { user: true, classes: true },
    });
  }

  async update(id: number, updateSemesterEventDto: UpdateSemesterEventDto) {
    const semesterEvent = await this.semesterEventRepo.findOne({ where: { id } });
    if (!semesterEvent) throw new BadRequestException("semester event not found");
    semesterEvent.title = updateSemesterEventDto.title;
    semesterEvent.from = new Date(updateSemesterEventDto.from);
    semesterEvent.to = new Date(updateSemesterEventDto.to);
    await this.semesterEventRepo.save(semesterEvent);

    return true;
  }

  async remove(id: number) {
    const semesterEvent = await this.semesterEventRepo.findOne({ where: { id } });
    if (!semesterEvent) throw new BadRequestException("semester event not found");
    await this.semesterEventRepo.softDelete(semesterEvent);

    return true;
  }

  async getClasses(id: number, userId: number) {
    const semesterEvent = await this.semesterEventRepo.findOne({
      where: { id, user: { id: userId } },
      relations: { classes: true },
    });
    if (!semesterEvent) throw new BadRequestException("semester event not found");

    return semesterEvent.classes || [];
  }

  async addClasses(id: number, classIds: number[]) {
    const semesterEvent = await this.semesterEventRepo.findOne({
      where: { id },
      relations: { classes: true },
    });
    if (!semesterEvent) throw new BadRequestException("semester event not found");
    const classes = await this.classRepo.findBy({ id: In(classIds) });
    semesterEvent.classes = [...semesterEvent.classes, ...classes];
    await this.semesterEventRepo.save(semesterEvent);

    return true;
  }

  async removeClass(id: number, classId: number) {
    const semesterEvent = await this.semesterEventRepo.findOne({
      where: { id },
      relations: { classes: true },
    });
    if (!semesterEvent) throw new BadRequestException("semester event not found");

    const classEntity = await this.classRepo.findOne({ where: { id: classId } });
    if (!classEntity) throw new BadRequestException("class not found");
    if (!semesterEvent.classes.some((classEntity) => classEntity.id === classId)) {
      throw new BadRequestException("class not found in semester event");
    }

    semesterEvent.classes = semesterEvent.classes.filter(
      (classEntity) => classEntity.id !== classId,
    );

    await this.semesterEventRepo.save(semesterEvent);

    return true;
  }
}
