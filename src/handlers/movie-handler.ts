import { Request, Response } from "express";
import { AppDataSource } from "../database/database.js";
import { Movie } from "../database/entities/movie.js";
import { MovieUsecase } from "../usecases/movie-usecase.js";
import { CreateMovieValidator, UpdateMovieValidator} from "./validators/movie-validator.js";
import { generateValidationErrorMessage } from "./validators/utils.js";

const movieUsecase = new MovieUsecase(AppDataSource.getRepository(Movie));

export const ListMovies = async (req: Request, res: Response) => {

    const movies = await movieUsecase.list();
    
    return res.json(movies);
};

export const GetMovie = async (req: Request, res: Response) => {

    const movie = await movieUsecase.getById( Number(req.params.id));

    if (!movie) { return res.status(404).json({ error: "Film introuvable" });}

    return res.json(movie);
};

export const CreateMovie = async (req: Request, res: Response) => {

    const { error, value } = CreateMovieValidator.validate(req.body);

    if (error) { return res.status(400).json(generateValidationErrorMessage(error.details) ); }

    const movie = await movieUsecase.create(value);

    return res.status(201).json(movie);
};

export const UpdateMovie = async (req: Request, res: Response) => {

    const { error, value } = UpdateMovieValidator.validate(req.body);

    if (error) {return res.status(400).json(generateValidationErrorMessage(error.details));}

    const movie = await movieUsecase.update(Number(req.params.id), value );

    if (!movie) { return res.status(404).json({ error: "Film introuvable" });}

    return res.json(movie);
};

export const DeleteMovie = async (req: Request, res: Response) => {

    const deleted = await movieUsecase.delete( Number(req.params.id) );

    if (!deleted) { return res.status(404).json({ error: "Film introuvable"}); }

    return res.json({ message: "Film supprimé" });
};
