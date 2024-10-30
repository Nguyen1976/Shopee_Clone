import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                name = '',
                email = '',
                phone = '',
                address = '',
                avatar = '',
                access_token = '',
                _id = '',
            } = action.payload;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar;
            state.access_token = access_token;
            state.id = _id;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser } = UserSlice.actions;

export default UserSlice.reducer;
