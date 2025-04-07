import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subject } from "@/subject/entities/subject.entity";
import { Major } from "../entities/major.entity";
import { Semester } from "../entities/semester.entity";
import { CreateMajorDto } from "../dto/create-major.dto";
import { UpdateMajorDto } from "../dto/update-major.dto";
import { CreateSemesterDto } from "../dto/create-semester.dto";
import { UpdateSemesterDto } from "../dto/update-semester.dto";

@Injectable()
export class MajorService {
  public constructor(
    @InjectRepository(Major) private majorRepo: Repository<Major>,
    @InjectRepository(Semester) private semesterRepo: Repository<Semester>,
    @InjectRepository(Subject) private subjectRepo: Repository<Subject>,
  ) {}

  async create(createMajorDto: CreateMajorDto) {
    const major = new Major();
    major.majorNo = createMajorDto.majorNo;
    major.name = createMajorDto.name;
    major.englishName = createMajorDto.englishName;
    major.degreeName = createMajorDto.degreeName;
    major.knowledge = createMajorDto.knowledge;
    major.attitude = createMajorDto.attitude;
    major.skills = createMajorDto.skills;
    major.careerPath = createMajorDto.careerPath;
    major.higherEducation = createMajorDto.higherEducation;
    await this.majorRepo.save(major);

    return true;
  }

  async findAll() {
    return this.majorRepo.find({ relations: ["semesters"] });
  }

  async findOne(id: number) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");

    return major;
  }

  async update(id: number, updateMajorDto: UpdateMajorDto) {
    const major = await this.majorRepo.findOne({ where: { id } });
    if (!major) throw new NotFoundException("major not found");
    major.majorNo = updateMajorDto.majorNo;
    major.name = updateMajorDto.name;
    major.englishName = updateMajorDto.englishName;
    major.degreeName = updateMajorDto.degreeName;
    major.knowledge = updateMajorDto.knowledge;
    major.attitude = updateMajorDto.attitude;
    major.skills = updateMajorDto.skills;
    major.careerPath = updateMajorDto.careerPath;
    major.higherEducation = updateMajorDto.higherEducation;
    await this.majorRepo.save(major);

    return true;
  }

  async remove(id: number) {
    const major = await this.majorRepo.findOne({ where: { id } });
    if (!major) throw new NotFoundException("major not found");
    await this.majorRepo.softDelete(id);

    return true;
  }

  async findAllSemesters(id: number) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");

    return major.semesters;
  }

  async findOneSemester(id: number, semesterId: number) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    const semester = major.semesters.find((semester) => semester.id === semesterId);
    if (!semester) throw new NotFoundException("semester not found");

    return semester;
  }

  async createSemester(id: number, createSemesterDto: CreateSemesterDto) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    const semester = new Semester();
    semester.year = createSemesterDto.year;
    semester.period = createSemesterDto.period;
    semester.major = major;
    await this.semesterRepo.save(semester);

    return true;
  }

  async updateSemester(id: number, semesterId: number, updateSemesterDto: UpdateSemesterDto) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    const semesterToUpdate = major.semesters.find((semester) => semester.id === semesterId);
    if (!semesterToUpdate) throw new NotFoundException("semester not found");
    semesterToUpdate.year = updateSemesterDto.year;
    semesterToUpdate.period = updateSemesterDto.period;
    await this.semesterRepo.save(semesterToUpdate);

    return true;
  }

  async removeSemester(id: number, semesterId: number) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    const semesterToDelete = major.semesters.find((semester) => semester.id === semesterId);
    if (!semesterToDelete) throw new NotFoundException("semester not found");
    await this.semesterRepo.softDelete(semesterId);

    return true;
  }

  async findSemestersByMajorId(id: number) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    return major.semesters;
  }

  async findSemesterById(id: number, semesterId: number) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    const semester = major.semesters.find((semester) => semester.id === semesterId);
    if (!semester) throw new NotFoundException("semester not found");

    return semester;
  }

  async createSemesterByMajorId(id: number, createSemesterDto: CreateSemesterDto) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    const semester = new Semester();
    semester.year = createSemesterDto.year;
    semester.period = createSemesterDto.period;
    semester.major = major;
    await this.semesterRepo.save(semester);

    return true;
  }

  async updateSemesterById(id: number, semesterId: number, updateSemesterDto: UpdateSemesterDto) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    const semesterToUpdate = major.semesters.find((semester) => semester.id === semesterId);
    if (!semesterToUpdate) throw new NotFoundException("semester not found");
    semesterToUpdate.year = updateSemesterDto.year;
    semesterToUpdate.period = updateSemesterDto.period;
    await this.semesterRepo.save(semesterToUpdate);

    return true;
  }

  async removeSemesterById(id: number, semesterId: number) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    const semesterToDelete = major.semesters.find((semester) => semester.id === semesterId);
    if (!semesterToDelete) throw new NotFoundException("semester not found");
    await this.semesterRepo.softDelete(semesterId);

    return true;
  }

  async findSemestersByMajorIdAndSemesterId(id: number, semesterId: number) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    const semester = major.semesters.find((semester) => semester.id === semesterId);
    if (!semester) throw new NotFoundException("semester not found");

    return semester;
  }

  async findSemestersByMajorIdAndSemesterIdAndSubjectId(
    id: number,
    semesterId: number,
    subjectId: number,
  ) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    const semester = major.semesters.find((semester) => semester.id === semesterId);
    if (!semester) throw new NotFoundException("semester not found");
    const subject = semester.subjects.find((subject) => subject.id === subjectId);
    if (!subject) throw new NotFoundException("subject not found");

    return subject;
  }

  async addSubjectToSemester(id: number, semesterId: number, subjectId: number) {
    const major = await this.majorRepo.findOne({ where: { id }, relations: ["semesters"] });
    if (!major) throw new NotFoundException("major not found");
    const semester = major.semesters.find((semester) => semester.id === semesterId);
    if (!semester) throw new NotFoundException("semester not found");
    const subject = await this.subjectRepo.findOne({ where: { id: subjectId } });
    if (!subject) throw new NotFoundException("subject not found");
    semester.subjects.push(subject);
    await this.semesterRepo.save(semester);

    return true;
  }

  async removeSubjectFromSemester(id: number, semesterId: number, subjectId: number) {
    const major = await this.majorRepo.findOne({
      where: { id },
      relations: { semesters: { subjects: true } },
    });

    if (!major) throw new NotFoundException("major not found");
    const semester = major.semesters.find((semester) => semester.id === semesterId);
    if (!semester) throw new NotFoundException("semester not found");
    const subject = semester.subjects.find((subject) => subject.id === subjectId);
    if (!subject) throw new NotFoundException("subject not found");
    semester.subjects = semester.subjects.filter((subject) => subject.id !== subjectId);
    await this.semesterRepo.save(semester);

    return true;
  }

  async findAllSubjectsInSemester(id: number, semesterId: number) {
    const major = await this.majorRepo.findOne({
      where: { id },
      relations: { semesters: { subjects: true } },
    });

    if (!major) throw new NotFoundException("major not found");
    const semester = major.semesters.find((semester) => semester.id === semesterId);
    if (!semester) throw new NotFoundException("semester not found");

    return semester.subjects;
  }

  async findAllSubjectsInMajor(id: number) {
    const major = await this.majorRepo.findOne({
      where: { id },
      relations: { semesters: { subjects: true } },
    });

    if (!major) throw new NotFoundException("major not found");

    return major.semesters.flatMap((semester) => semester.subjects);
  }
}
