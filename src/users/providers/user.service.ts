import { DataSource, Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EncryptionService } from "@/@core/encryption/encryption.service";
import { DEFAULT_PASSWORD } from "../constants/user.const";
import { Role } from "../enums/role.enum";
import { User } from "../entities/user.entity";
import { Teacher } from "../entities/teacher.entity";
import { Company } from "../entities/company.entity";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import { UpdateTeacherDto } from "../dto/update-teacher.dto";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { UpdateCompanyDto } from "../dto/update-company.dto";

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
      where: { id, role: Role.Teacher },
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
      user.password = await this.encryptionService.encrypt(DEFAULT_PASSWORD);
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

  public async updateTeacher(id: number, updateTeacherDto: UpdateTeacherDto): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepo.findOne({
        where: { id, role: Role.Teacher },
        relations: { teacher: true },
      });

      if (!user) throw new NotFoundException("teacher not found");

      user.teacher.name = updateTeacherDto.name;
      user.teacher.address = updateTeacherDto.address;
      user.teacher.fax = updateTeacherDto.fax;
      user.teacher.phoneNumber = updateTeacherDto.phoneNumber;
      user.teacher.birthday = updateTeacherDto.birthday
        ? new Date(updateTeacherDto.birthday)
        : user.teacher.birthday;
      await queryRunner.manager.save(user.teacher);
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

  public async deleteTeacher(id: number): Promise<boolean> {
    try {
      const user = await this.userRepo.findOne({
        where: { id, role: Role.Teacher },
        relations: { teacher: true },
      });

      if (!user) throw new NotFoundException("teacher not found");
      await this.userRepo.softDelete(id);

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getCompanies(): Promise<User[]> {
    const users = await this.userRepo.find({
      where: { role: Role.Company },
      relations: { company: true },
    });

    return users.map((user) => {
      user.password = undefined;
      return user;
    });
  }

  public async getCompany(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Company },
      relations: { company: true },
    });

    if (!user) throw new NotFoundException("company not found");
    user.password = undefined;

    return user;
  }

  public async createCompany(createCompanyDto: CreateCompanyDto): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const company = new Company();
      company.name = createCompanyDto.name;
      company.address = createCompanyDto.address;
      company.phoneNumber = createCompanyDto.phoneNumber;
      company.description = createCompanyDto.description;
      company.type = createCompanyDto.type;
      company.domain = createCompanyDto.domain;
      company.website = createCompanyDto.website;
      await queryRunner.manager.save(company);
      const companyResult = await queryRunner.manager.save(company);

      const user = new User();
      user.email = createCompanyDto.email;
      user.password = await this.encryptionService.encrypt(DEFAULT_PASSWORD);
      user.role = Role.Company;
      user.company = companyResult;
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

  public async updateCompany(id: number, updateCompanyDto: UpdateCompanyDto): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepo.findOne({
        where: { id, role: Role.Company },
        relations: { company: true },
      });

      if (!user) throw new NotFoundException("company not found");

      user.company.name = updateCompanyDto.name;
      user.company.address = updateCompanyDto.address;
      user.company.phoneNumber = updateCompanyDto.phoneNumber;
      user.company.description = updateCompanyDto.description;
      user.company.type = updateCompanyDto.type;
      user.company.domain = updateCompanyDto.domain;
      user.company.website = updateCompanyDto.website;
      await queryRunner.manager.save(user.company);
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

  public async deleteCompany(id: number): Promise<boolean> {
    try {
      const user = await this.userRepo.findOne({
        where: { id, role: Role.Company },
        relations: { company: true },
      });

      if (!user) throw new NotFoundException("company not found");
      await this.userRepo.softDelete(id);

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
