export interface AuthUser {
    user_id: number;
    username: string;
    email: string;
    role: string;
}

interface ApiOk<T> {ok : true; data: T;}
interface ApiError {ok : false; error: string;}
export type ApiResponse<T> = ApiOk<T> | ApiError;

const BASE_URL = 'http://localhost:8080/api';

export async function apiMe(signal?: AbortSignal): Promise<ApiResponse<{ user: AuthUser }>> {
    const res = await fetch(`${BASE_URL}/me`, {
        credentials: 'include',
        signal: signal,
    });
    const json = await res.json();

    if (!res.ok) {
        const msg = json?.message ?? `Failed /api/me (${res.status})`;
        return { 
            ok: false, 
            error: msg 
        };
    }

    const user: AuthUser | undefined = json?.data?.user;
    if (!user) {
        return { 
            ok: false, 
            error: 'No user data in /api/me response' 
        };
    }
    return { 
        ok: true, 
        data: { user } 
    };
}

export async function apiLogin(identity: string, password: string): Promise<ApiResponse<{ user: AuthUser }>> {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ identity, password }),
    });

    const json = await res.json();

    if (!res.ok) {
        const msg = json?.message ?? "Login failed";
        return { 
            ok: false, 
            error: msg 
        };
    }

    // เรียก /api/me เพื่อดึง user data หลัง login สำเร็จ
    return await apiMe();
}

export async function apiLogout(): Promise<ApiResponse<null>> {
    const res = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    const json = await res.json();
    if (!res.ok) {
        const msg = json?.message ?? "Logout failed";
        return { 
            ok: false, 
            error: msg 
        };
    }

    return { 
        ok: true, 
        data: null 
    };
}

export async function apiRegister(username: string, email: string, password: string): Promise<ApiResponse<null>> {
    const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role_id: 1 }),
    });

    const json = await res.json();
    if (!res.ok) {
        const msg = json?.message ?? "Registration failed";
        return { 
            ok: false, 
            error: msg 
        };
    }
    
    return { 
        ok: true, 
        data: null 
    };
}