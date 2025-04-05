import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateMajorDto } from "../dto/create-major.dto";
import { UpdateMajorDto } from "../dto/update-major.dto";
import { Repository } from "typeorm";
import { Major } from "../entities/major.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MajorService {
  public constructor(@InjectRepository(Major) private majorRepo: Repository<Major>) {}

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
    return this.majorRepo.find();
  }

  async findOne(id: number) {
    const major = await this.majorRepo.findOne({ where: { id } });
    if (!major) throw new BadRequestException("major not found");

    return major;
  }

  async update(id: number, updateMajorDto: UpdateMajorDto) {
    const major = await this.majorRepo.findOne({ where: { id } });
    if (!major) throw new BadRequestException("major not found");
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
    if (!major) throw new BadRequestException("major not found");
    await this.majorRepo.softDelete(id);

    return true;
  }
}
