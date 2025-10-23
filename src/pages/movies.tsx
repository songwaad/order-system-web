import React, { useEffect, useState } from "react";

import { Layout } from "@/components/layout";
import type { Movie } from "@/api/movies";
import { apiGetMovies } from "@/api/movies";

import { Spinner } from "@/components/ui/spinner";


function MoviesPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        // Fetch movies from API
        async function fetchMovies() {
            setLoading(true);
            setError(null);

            const res = await apiGetMovies();
            if (res.ok) {
                setMovies(res.data.movies);
            } else {
                setError(res.error || "Failed to fetch movies");
            }
            setLoading(false);
        }

        fetchMovies();
    }, []);

    return (
        <>
            <Layout>
                <p>Movies Page</p>
                {loading && (<p><Spinner />Loading movies...</p>)}
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading && !error && (
                    <ul>
                        {movies.map((movie) => (
                            <li key={movie.ID}>
                                <p>ID: {movie.ID}</p>
                                <p>Title: {movie.title}</p>
                                <p>Release Date: {movie.release_date}</p>
                                <p>Duration: {movie.duration} minutes</p>
                                <p>Synopsis: {movie.synopsis}</p>
                                <p>Trailer: {movie.trailer_url}</p>
                                <img src={movie.image_url} alt={movie.title} className="w-32 h-auto"/>
                                {movie.actors && movie.actors.length > 0 && (
                                    <div>
                                        <p>Actors:</p>
                                        <ul>
                                            {movie.actors.map((actor) => (
                                                <li key={actor.ID}>
                                                    {actor.first_name} {actor.last_name}
                                                    <img src={actor.image_url} alt={`${actor.first_name} ${actor.last_name}`} className="w-32 h-auto"/>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </Layout>
        </>
    )
}

export default MoviesPage;