import { Repository } from "typeorm";
import { Movie } from "../database/entities/movie.js";

export class MovieUsecase {

    constructor( private movieRepo: Repository<Movie> ) {}

    async list() { return this.movieRepo.find(); }

    async getById(id: number) { return this.movieRepo.findOneBy({ id });}

    async create(data: Partial<Movie>) {

        const movie = this.movieRepo.create(data);

        return this.movieRepo.save(movie);
    }

    async update(id: number, data: Partial<Movie>) {

        const movie = await this.movieRepo.findOneBy({ id });

        if (!movie) { return null; }

        Object.assign(movie, data);

        return this.movieRepo.save(movie);
    }

    async delete(id: number) {

        const movie = await this.movieRepo.findOneBy({ id });

        if (!movie) { return null; }

        await this.movieRepo.remove(movie);

        return true;
    }
}
