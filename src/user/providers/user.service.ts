import fs from "node:fs/promises";
import { DataSource, Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EncryptionService } from "@/@core/encryption/encryption.service";
import { DEFAULT_PASSWORD } from "../constants/user.const";
import { Role } from "../enums/role.enum";
import { User } from "../entities/user.entity";
import { Teacher } from "../entities/teacher.entity";
import { Company } from "../entities/company.entity";
import { Student } from "../entities/student.entity";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import { UpdateTeacherDto } from "../dto/update-teacher.dto";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { UpdateCompanyDto } from "../dto/update-company.dto";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateStudentDto } from "../dto/update-student.dto";
import { StudentCv } from "../entities/student-cv.entity";
import { CreateReportDto } from "../dto/create-report.dto";
import { UpdateReportDto } from "../dto/update-report.dto";
import { StudentReport } from "../entities/student-report.entity";
import { Job } from "@/job/entities/job.entity";
import { CompanyType } from "../enums/company-type.enum";
import { NotificationService } from "@/notification/providers/notification.service";
import { StudentReportStatus } from "../enums/student-report-status.enum";

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    @InjectRepository(StudentCv) private cvRepo: Repository<StudentCv>,
    @InjectRepository(StudentReport) private reportRepo: Repository<StudentReport>,
    @InjectRepository(Job) private jobRepo: Repository<Job>,
    private encryptionService: EncryptionService,
    private notificationService: NotificationService,
    private dataSource: DataSource,
  ) {}

  public findById(id: number, withDeleted: boolean = false): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
      withDeleted,
      relations: {
        teacher: { subjects: true, classes: true },
        company: { jobs: true },
        student: { studentCvs: true, studentReport: true },
      },
    });
  }

  public findByEmail(email: string, withDeleted: boolean = false): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      withDeleted,
      relations: {
        teacher: { subjects: true, classes: true },
        company: { jobs: true },
        student: { studentCvs: true, studentReport: true },
      },
    });
  }

  public async getTeachers(): Promise<User[]> {
    const users = await this.userRepo.find({
      where: { role: Role.Teacher },
      relations: { teacher: { subjects: true, classes: true } },
    });

    return users.map((user) => {
      user.password = undefined;
      return user;
    });
  }

  public async getTeacher(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Teacher },
      relations: { teacher: { subjects: true, classes: true } },
    });

    if (!user) throw new NotFoundException("teacher not found");
    user.password = undefined;

    return user;
  }

  public async createTeacher(
    createTeacherDto: CreateTeacherDto,
    avatar?: Express.Multer.File,
  ): Promise<boolean> {
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
      if (avatar) teacher.avatarPath = avatar.path;
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
      if (avatar) await fs.unlink(avatar.path);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async updateTeacher(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
    avatar?: Express.Multer.File,
  ): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepo.findOne({
        where: { id, role: Role.Teacher },
        relations: { teacher: true },
      });

      if (!user) throw new NotFoundException("teacher not found");

      if (user.teacher.avatarPath) await fs.unlink(user.teacher.avatarPath);
      if (avatar) user.teacher.avatarPath = avatar.path;
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
      if (avatar) await fs.unlink(avatar.path);
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

  public async getTeacherSubjects(id: number) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Teacher },
      relations: { teacher: { subjects: true } },
    });

    if (!user) throw new NotFoundException("teacher not found");
    user.password = undefined;

    return user?.teacher?.subjects || [];
  }

  public async addSubjectToTeacher(id: number, subjectId: number) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Teacher },
      relations: { teacher: { subjects: true } },
    });
    if (!user) throw new NotFoundException("teacher not found");
    const subject = user.teacher.subjects.find((subject) => subject.id === subjectId);
    if (subject) throw new BadRequestException("subject already added to teacher");
    user.teacher.subjects.push(subject);
    await this.userRepo.save(user.teacher);

    return true;
  }

  public async removeSubjectFromTeacher(id: number, subjectId: number) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Teacher },
      relations: { teacher: { subjects: true } },
    });
    if (!user) throw new NotFoundException("teacher not found");
    const subject = user.teacher.subjects.find((subject) => subject.id === subjectId);
    if (!subject) throw new NotFoundException("subject not found");
    user.teacher.subjects = user.teacher.subjects.filter((subject) => subject.id !== subjectId);
    await this.userRepo.save(user.teacher);

    return true;
  }

  public async getTeacherClasses(id: number) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Teacher },
      relations: { teacher: { classes: true } },
    });

    if (!user) throw new NotFoundException("teacher not found");
    user.password = undefined;

    return user?.teacher?.classes || [];
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

  public async getCompanyJobs(id: number) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Company },
      relations: { company: { jobs: true } },
    });

    if (!user) throw new NotFoundException("company not found");
    user.password = undefined;

    return user?.company?.jobs || [];
  }

  public async createCompany(
    createCompanyDto: CreateCompanyDto,
    avatar?: Express.Multer.File,
  ): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const company = new Company();
      company.name = createCompanyDto.name;
      company.address = createCompanyDto.address;
      company.phoneNumber = createCompanyDto.phoneNumber;
      company.description = createCompanyDto.description;
      company.type = CompanyType.Partner;
      company.domain = createCompanyDto.domain;
      company.website = createCompanyDto.website;
      if (avatar) company.logoPath = avatar.path;
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
      if (avatar) await fs.unlink(avatar.path);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
    avatar?: Express.Multer.File,
  ): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepo.findOne({
        where: { id, role: Role.Company },
        relations: { company: true },
      });

      if (!user) throw new NotFoundException("company not found");

      if (user.company.logoPath) await fs.unlink(user.company.logoPath);
      if (avatar) user.company.logoPath = avatar.path;
      user.company.name = updateCompanyDto.name;
      user.company.address = updateCompanyDto.address;
      user.company.phoneNumber = updateCompanyDto.phoneNumber;
      user.company.description = updateCompanyDto.description;
      user.company.domain = updateCompanyDto.domain;
      user.company.website = updateCompanyDto.website;

      await queryRunner.manager.save(user.company);
      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      if (avatar) await fs.unlink(avatar.path);
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

  public async getStudents(): Promise<User[]> {
    const users = await this.userRepo.find({
      where: { role: Role.Student },
      relations: { student: { studentCvs: true, studentReport: true } },
    });

    return users.map((user) => {
      user.password = undefined;
      return user;
    });
  }

  public async getStudent(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Student },
      relations: { student: { studentCvs: true, studentReport: true } },
    });

    if (!user) throw new NotFoundException("student not found");
    user.password = undefined;

    return user;
  }

  public async createStudent(
    createStudentDto: CreateStudentDto,
    avatar?: Express.Multer.File,
  ): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const student = new Student();
      student.name = createStudentDto.name;
      student.address = createStudentDto.address;
      student.birthday = new Date(createStudentDto.birthday);
      student.className = createStudentDto.className;
      student.phoneNumber = createStudentDto.phoneNumber;
      student.teacherId = createStudentDto.teacherId;
      if (avatar) student.avatarPath = avatar.path;
      await queryRunner.manager.save(student);
      const studentResult = await queryRunner.manager.save(student);

      const user = new User();
      user.email = createStudentDto.email;
      user.password = await this.encryptionService.encrypt(DEFAULT_PASSWORD);
      user.role = Role.Student;
      user.student = studentResult;
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      if (avatar) await fs.unlink(avatar.path);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async updateStudent(
    id: number,
    updateStudentDto: UpdateStudentDto,
    avatar?: Express.Multer.File,
  ): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepo.findOne({
        where: { id, role: Role.Student },
        relations: { student: true },
      });

      if (!user) throw new NotFoundException("student not found");

      if (user.student.avatarPath) await fs.unlink(user.student.avatarPath);
      if (avatar) user.student.avatarPath = avatar.path;
      user.student.name = updateStudentDto.name;
      user.student.address = updateStudentDto.address;
      user.student.className = updateStudentDto.className;
      user.student.phoneNumber = updateStudentDto.phoneNumber;
      user.student.teacherId = updateStudentDto.teacherId;
      user.student.birthday = updateStudentDto.birthday
        ? new Date(updateStudentDto.birthday)
        : user.student.birthday;

      await queryRunner.manager.save(user.student);
      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      if (avatar) await fs.unlink(avatar.path);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async deleteStudent(id: number): Promise<boolean> {
    try {
      const user = await this.userRepo.findOne({
        where: { id, role: Role.Student },
        relations: { student: true },
      });

      if (!user) throw new NotFoundException("student not found");
      await this.userRepo.softDelete(id);

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async changePassword(id: number, password: string, newPassword: string) {
    try {
      const user = await this.findById(id);
      const isPasswordCorrect = this.encryptionService.check(password, user.password);
      if (!isPasswordCorrect) throw new BadRequestException("old password is incorrect");

      const encryptedPassword = await this.encryptionService.encrypt(newPassword);
      await this.userRepo.update({ id }, { password: encryptedPassword });

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getStudentCVs(id: number) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Student },
      relations: { student: { studentCvs: true } },
    });

    if (!user) throw new NotFoundException("student not found");

    return user?.student?.studentCvs || [];
  }

  public async getStudentCV(id: number, cvId: number) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Student },
      relations: { student: { studentCvs: true } },
    });

    if (!user) throw new NotFoundException("student not found");

    const cv = user.student.studentCvs.find((cv) => cv.id === cvId);
    if (!cv) throw new NotFoundException("cv not found");

    return cv;
  }

  public async uploadStudentCV(id: number, cvFile: Express.Multer.File) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Student },
      relations: { student: true },
    });

    if (!user) throw new NotFoundException("student not found");

    const cv = new StudentCv();
    cv.cvPath = cvFile.path;
    cv.student = user.student;
    await this.cvRepo.save(cv);

    user.student.studentCvs.push(cv);
    await this.studentRepo.save(user.student);

    return true;
  }

  public async deleteStudentCV(id: number, cvId: number) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Student },
      relations: { student: { studentCvs: true } },
    });

    if (!user) throw new NotFoundException("student not found");

    const cv = user.student.studentCvs.find((cv) => cv.id === cvId);
    if (!cv) throw new NotFoundException("cv not found");

    await this.cvRepo.remove(cv);
    await fs.unlink(cv.cvPath);

    user.student.studentCvs = user.student.studentCvs.filter((cv) => cv.id !== cvId);
    await this.studentRepo.save(user.student);

    return true;
  }

  public async getStudentReport(id: number) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Student },
      relations: { student: { studentReport: true } },
    });

    if (!user) throw new NotFoundException("student not found");

    return user?.student?.studentReport || null;
  }

  public async createStudentReport(id: number, createReportDto: CreateReportDto) {
    let user = await this.userRepo.findOne({
      where: { id, role: Role.Student },
      relations: { student: true },
    });

    if (!user) throw new NotFoundException("student not found");
    if (!user.student) throw new NotFoundException("student not found");
    if (user.student.studentReport) throw new BadRequestException("student report already exists");

    const job = await this.jobRepo.findOne({
      where: { id: createReportDto.jobId },
    });

    if (!job) throw new NotFoundException("job not found");

    let studentReport = new StudentReport();
    studentReport.job = job;
    studentReport = await this.reportRepo.save(studentReport);

    user.student.studentReport = studentReport;
    const student = await this.studentRepo.save(user.student);

    user.student = student;
    user = await this.userRepo.save(user);

    await this.notificationService.create({
      title: "New Student Report Submission",
      content: `Student ${user.student.name} has submitted a request for job ${job.title}`,
      userId: user.id,
      metadata: JSON.stringify({ job: job.id, user: user.id }),
      isRead: false,
    });

    return true;
  }

  public async createStudentReportExternal(id: number, createCompanyDto: CreateCompanyDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let user = await this.userRepo.findOne({
        where: { id, role: Role.Student },
        relations: { student: true },
      });

      if (!user) throw new NotFoundException("student not found");
      if (!user.student) throw new NotFoundException("student not found");
      if (user.student.studentReport)
        throw new BadRequestException("student report already exists");

      let company = new Company();
      company.name = createCompanyDto.name;
      company.address = createCompanyDto.address;
      company.phoneNumber = createCompanyDto.phoneNumber;
      company.description = createCompanyDto.description;
      company.type = CompanyType.External;
      company.domain = createCompanyDto.domain;
      company.website = createCompanyDto.website;
      company = await this.companyRepo.save(company);

      let newCompanyUser = new User();
      newCompanyUser.email = createCompanyDto.email;
      newCompanyUser.password = await this.encryptionService.encrypt(DEFAULT_PASSWORD);
      newCompanyUser.role = Role.Company;
      newCompanyUser.company = company;
      newCompanyUser = await this.userRepo.save(newCompanyUser);

      let job = new Job();
      job.title = createCompanyDto.name;
      job.content = createCompanyDto.description;
      job.from = new Date();
      job.to = new Date();
      job.company = newCompanyUser.company;
      job = await this.jobRepo.save(job);

      let studentReport = new StudentReport();
      studentReport.job = job;
      studentReport = await this.reportRepo.save(studentReport);

      user.student.studentReport = studentReport;
      const student = await this.studentRepo.save(user.student);

      user.student = student;
      user = await this.userRepo.save(user);

      await this.notificationService.create({
        title: "New Student Report Submission",
        content: `Student ${user.student.name} has submitted a request for job ${job.title}`,
        userId: user.id,
        metadata: JSON.stringify({ job: job.id, user: user.id }),
        isRead: false,
      });
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

  public async uploadStudentReport(id: number, reportFile: Express.Multer.File) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Student },
      relations: { student: true },
    });

    if (!user) throw new NotFoundException("student not found");

    user.student.studentReport.attachmentPath = reportFile.path;
    await this.reportRepo.save(user.student.studentReport);

    return true;
  }

  public async updateStudentReport(id: number, updateReportDto: UpdateReportDto) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Student },
      relations: { student: { studentReport: { job: { company: true } } } },
    });

    if (!user) throw new NotFoundException("student not found");
    if (!user.student.studentReport) throw new NotFoundException("student report not found");
    user.student.studentReport.score = updateReportDto.score;
    user.student.studentReport.comment = updateReportDto.comment;
    user.student.studentReport.status = updateReportDto.status;
    const studentReport = await this.reportRepo.save(user.student.studentReport);

    if (studentReport.status === StudentReportStatus.InProgress) {
      await this.notificationService.create({
        title: "Student Report Status Update",
        content: `Company ${studentReport.job.company.name} has approved your request in job: ${studentReport.job.title}`,
        userId: user.id,
        metadata: JSON.stringify({ job: studentReport.job.id, user: user.id }),
        isRead: false,
      });
    } else if (studentReport.status === StudentReportStatus.Rejected) {
      await this.notificationService.create({
        title: "Student Report Status Update",
        content: `Company ${studentReport.job.company.name} has rejected your request in job: ${studentReport.job.title}`,
        userId: user.id,
        metadata: JSON.stringify({ job: studentReport.job.id, user: user.id }),
        isRead: false,
      });
    }

    return true;
  }

  public async deleteStudentReport(id: number) {
    const user = await this.userRepo.findOne({
      where: { id, role: Role.Student },
      relations: { student: { studentReport: true } },
    });

    if (!user) throw new NotFoundException("student not found");
    if (!user.student.studentReport) throw new NotFoundException("student report not found");

    const report = user.student.studentReport;
    await this.reportRepo.softDelete(report);

    user.student.studentReport = null;
    await this.studentRepo.save(user.student);
    await fs.unlink(report.attachmentPath);

    return true;
  }
}
