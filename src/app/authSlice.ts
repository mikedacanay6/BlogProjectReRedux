import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supaBase from "../supabase-client";

interface AuthState {
    user: any;
}

const initialState: AuthState = {
    user: null,
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const { data, error } = await supaBase.auth.getUser();
    if (error) throw error;

    console.log(data.user);
    return data.user;
});

export const logout = createAsyncThunk('auth/logout', async () => {
    const { error } = await supaBase.auth.signOut();
    if (error) throw error;
})

export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string, password: string }) => {
    const { data, error } = await supaBase.auth.signInWithPassword({  email, password });
    if (error) throw error;
    return data.user;
});

export const signUp = createAsyncThunk('auth/signUp', async ({ email, password, name }: { email: string, password: string, name: string }) => {
    const { data, error } = await supaBase.auth.signUp({ 
        email, 
        password,
        options: {
            data: {
                first_name: name,
            }
        }
     });
    if (error) throw error;
    return data.user;
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;