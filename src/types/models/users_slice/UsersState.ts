import User from '../user/User';
import UserView from '../user/UserView';

type UsersState = {
    users: User[],
    filteredUsers: UserView[],
    isFetching: boolean | null,
    filtering: UserView
}

export default UsersState;