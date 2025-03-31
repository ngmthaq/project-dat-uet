import { DataSource, Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EncryptionService } from "@/@core/encryption/encryption.service";
import { User } from "../entities/user.entity";
import { Role } from "../enums/role.enum";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import { TEACHER_DEFAULT_PASSWORD } from "../constants/teacher.const";
import { Teacher } from "../entities/teacher.entity";

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private encryptionService: EncryptionService,
    private dataSource: DataSource,
  ) {}

  public findById(id: number, withDeleted: boolean = false): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
      withDeleted,
    });
  }

  public findByEmail(email: string, withDeleted: boolean = false): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      withDeleted,
    });
  }

  public async getTeachers(): Promise<User[]> {
    const users = await this.userRepo.find({
      where: { role: Role.Teacher },
      relations: { teacher: true },
    });

    return users.map((user) => {
      user.password = undefined;
      return user;
    });
  }

  public async getTeacher(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: { teacher: true },
    });

    if (!user) throw new NotFoundException("teacher not found");
    user.password = undefined;

    return user;
  }

  public async createTeacher(createTeacherDto: CreateTeacherDto): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const teacher = new Teacher();
      teacher.name = createTeacherDto.name;
      teacher.address = createTeacherDto.address;
      teacher.birthday = new Date(createTeacherDto.birthday);
      teacher.fax = createTeacherDto.fax;
      teacher.phoneNumber = createTeacherDto.phoneNumber;
      await queryRunner.manager.save(teacher);
      const teacherResult = await queryRunner.manager.save(teacher);

      const user = new User();
      user.email = createTeacherDto.email;
      user.password = await this.encryptionService.encrypt(TEACHER_DEFAULT_PASSWORD);
      user.role = Role.Teacher;
      user.teacher = teacherResult;
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
