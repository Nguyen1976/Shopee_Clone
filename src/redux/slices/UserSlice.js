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
    },
});

// Action creators are generated for each case reducer function
export const { updateUser } = UserSlice.actions;

export default UserSlice.reducer;
