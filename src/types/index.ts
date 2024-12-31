export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
}

export interface AuthResponse {
    data: {
        token: string;
    };
}

export interface ApiError {
    data: {
        message: string;
        errors?: {
            password?: string;
            username?: string;
        };
    };
}


// types.ts
export type RootStackParamList = {
    Splash: undefined;
    MainTabs: undefined;
    Register: undefined;
    Login: undefined;
    Profile: undefined;
    EditProfile: { user: User }; // Pastikan ada tipe untuk EditProfile
    // Tambahkan layar lainnya yang diperlukan
  };
  
  