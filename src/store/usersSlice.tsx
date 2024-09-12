import { createSlice } from '@reduxjs/toolkit';
import User from '../types/models/user/User';
import UserView from '../types/models/user/UserView';
import FilterPayload from '../types/models/users_slice/FilterPayload';
import UsersState from '../types/models/users_slice/UsersState';

const initialState: UsersState = {
    users: [],
    filteredUsers: [],
    isFetching: null,
    filtering: {
        name: '',
        username: '',
        email: '',
        phone: ''
    }
};

function filterUser(user: UserView, filtering: UserView) {
    const entries = Object.entries as <T>(
        obj: T
    ) => Array<[keyof T, T[keyof T]]>;

    return entries(filtering).every(
        ([field, phrase]) => {
            const normalizedUserProp = user[field].toLowerCase();
            const normalizedPhrase = phrase.toLowerCase();
            return phrase === '' || normalizedUserProp.includes(normalizedPhrase);
        }
    );
}

const usersSlice = createSlice(
    {
        name: 'users',
        initialState,
        reducers: {
            setUsers(state, action: { payload: User[], type: string }) {
                state.users = action.payload;
            },

            filterUsers(state) {
                state.filteredUsers = state.users.filter(
                    user => filterUser(user, state.filtering)
                );
            },

            setIsFetching(state, action: { payload: boolean, type: string }) {
                state.isFetching = action.payload;
            },

            setFilter(state, action: { payload: FilterPayload, type: string }) {
                const {field, phrase}: FilterPayload = action.payload;
                state.filtering[field] = phrase;
            }
        }
    }
);

export default usersSlice.reducer;
export const usersActions = usersSlice.actions;