import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    isAdmin: false,
    access_token: '',
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                _id = '',
                name = '',
                email = '',
                phone = '',
                address = '',
                avatar = '',
                isAdmin = false,
                access_token = '',
            } = action.payload;
            state.id = _id;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar;
            state.isAdmin = isAdmin;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
            state.isAdmin = false;
            state.city = '';
            state.refreshToken = '';
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = UserSlice.actions;

export default UserSlice.reducer;
