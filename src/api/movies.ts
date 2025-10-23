const BASE_URL = 'http://localhost:8080/api/movies';

export interface Actor { 
    ID: number; 
    first_name: string; 
    last_name: string;
    image_url: string;
}

export interface Movie {
    ID: number;
    title: string;
    release_date: string;
    duration: number; // duration in minutes
    synopsis: string;
    trailer_url: string;
    image_url: string;
    actors?: Actor[];
}

export interface MovieActor {
    actor : Actor[]
}

interface ApiOk<T> {ok : true; data: T;}
interface ApiError {ok : false; error: string;}
export type ApiResponse<T> = ApiOk<T> | ApiError;

export async function apiGetMovies(signal?: AbortSignal): Promise<ApiResponse<{ movies: Movie[] }>> {
    const res = await fetch(`${BASE_URL}`, {
        credentials: 'include',
        signal: signal,
    });
    const json = await res.json();

    if (!res.ok) {
        const msg = json?.message ?? `Failed to fetch movies (${res.status})`;
        return { ok: false, error: msg };
    }

    const movies: Movie[] | undefined = json?.data;
    
    if (!movies || !Array.isArray(movies)) {
        return { ok: false, error: 'No movies data in response' };
    }
    
    return { ok: true, data: { movies } };
}

