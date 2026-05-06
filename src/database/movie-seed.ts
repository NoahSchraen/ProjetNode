import { AppDataSource } from "./database.js";
import { Movie } from "./entities/movie.js";

export const createMovies = async () => {

    const movieRepo = AppDataSource.getRepository(Movie);

    const movies = await movieRepo.find();

    if (movies.length > 0) { return; }

    const data = [
        {
            title: "Avengers",
            description: "Film Marvel",
            duration: 180,
            genre: "Action",
            image: ""
        },
        {
            title: "Barbie",
            description: "Film de princesse",
            duration: 170,
            genre: "Jeunesse",
            image: ""
        },
        {
            title: "La Reine des Neiges",
            description: "Film Disney",
            duration: 120,
            genre: "Animation",
            image: ""
        }
    ];

    for (const movieData of data) {

        const movie = movieRepo.create(movieData);

        await movieRepo.save(movie);
    }

    console.log("Films créés");
};