import { createSlice } from "@reduxjs/toolkit";
import { getUserData, loadToken, login } from "../actions/authActions";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        success: false,
        user: null,
        token: null,
        error: null
    },

    reducers: {
        reset: (state) => {
            state.error = null;
            state.success = false;
        },

        logout: (state) => {   // ✅ comma + syntax fix
            state.user = null
            state.token = null
            localStorage.removeItem("appData") // ✅ optional but important
        }
    },

    extraReducers: (builder) => {
        builder

            // login pending
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })

            // login success
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.user = action.payload.user
                state.token = action.payload.token
            })

            // login error
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.payload
            })

            // ✅ FIXED (state, action)
            .addCase(loadToken.fulfilled, (state, action) => {
                state.token = action.payload
            })

            .addCase(getUserData.fulfilled, (state, action) => {
                state.user = action.payload
            })
    }
})

export default authSlice.reducer;

// ✅ export fix
export const { reset, logout } = authSlice.actions;