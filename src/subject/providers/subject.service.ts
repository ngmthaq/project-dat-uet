import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSubjectDto } from "../dto/create-subject.dto";
import { UpdateSubjectDto } from "../dto/update-subject.dto";
import { Subject } from "../entities/subject.entity";

@Injectable()
export class SubjectService {
  public constructor(@InjectRepository(Subject) private subjectRepo: Repository<Subject>) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const subject = new Subject();
    subject.subjectNo = createSubjectDto.subjectNo;
    subject.subjectCategory = createSubjectDto.subjectCategory;
    subject.name = createSubjectDto.name;
    subject.englishName = createSubjectDto.englishName;
    subject.numberOfCredits = createSubjectDto.numberOfCredits;
    this.subjectRepo.save(subject);

    return true;
  }

  async findAll() {
    return this.subjectRepo.find({ relations: ["classes"] });
  }

  async findOne(id: number) {
    const subject = await this.subjectRepo.findOne({ where: { id }, relations: ["classes"] });
    if (!subject) throw new BadRequestException("subject not found");

    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.subjectRepo.findOne({ where: { id } });
    if (!subject) throw new BadRequestException("subject not found");
    subject.subjectNo = updateSubjectDto.subjectNo;
    subject.subjectCategory = updateSubjectDto.subjectCategory;
    subject.name = updateSubjectDto.name;
    subject.englishName = updateSubjectDto.englishName;
    subject.numberOfCredits = updateSubjectDto.numberOfCredits;
    this.subjectRepo.save(subject);

    return true;
  }

  async remove(id: number) {
    const subject = await this.subjectRepo.findOne({ where: { id } });
    if (!subject) throw new BadRequestException("subject not found");
    await this.subjectRepo.softDelete(id);

    return true;
  }
}
