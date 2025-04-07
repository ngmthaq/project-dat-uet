import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Company } from "@/user/entities/company.entity";
import { Job } from "../entities/job.entity";
import { CreateJobDto } from "../dto/create-job.dto";
import { UpdateJobDto } from "../dto/update-job.dto";

@Injectable()
export class JobService {
  public constructor(
    @InjectRepository(Job) private jobRepo: Repository<Job>,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}

  public async create(createJobDto: CreateJobDto, cover?: Express.Multer.File) {
    const company = await this.companyRepo.findOne({ where: { id: createJobDto.companyId } });
    if (!company) throw new NotFoundException("company not found");
    const job = new Job();
    job.title = createJobDto.title;
    job.content = createJobDto.content;
    job.from = createJobDto.from;
    job.to = createJobDto.to;
    job.company = company;
    if (cover) job.coverPath = cover.path;
    this.jobRepo.save(job);

    return true;
  }

  public async findAll() {
    return this.jobRepo.find({ relations: { company: true } });
  }

  public async findOne(id: number) {
    const job = await this.jobRepo.findOne({ where: { id }, relations: { company: true } });
    if (!job) throw new NotFoundException("job not found");
    return job;
  }

  public async update(id: number, updateJobDto: UpdateJobDto, cover?: Express.Multer.File) {
    const job = await this.jobRepo.findOne({ where: { id } });
    if (!job) throw new NotFoundException("job not found");
    job.title = updateJobDto.title;
    job.content = updateJobDto.content;
    job.from = updateJobDto.from;
    job.to = updateJobDto.to;
    if (cover) job.coverPath = cover.path;
    this.jobRepo.save(job);

    return true;
  }

  public async remove(id: number) {
    const job = await this.jobRepo.findOne({ where: { id } });
    if (!job) throw new NotFoundException("job not found");
    await this.jobRepo.softDelete(id);
    return true;
  }
}
