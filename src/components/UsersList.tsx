import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { usersActions } from '../store/usersSlice';
import User from '../types/models/user/User';
import UserView from '../types/models/user/UserView';
import UsersState from '../types/models/users_slice/UsersState';
import SearchField from './SearchField';
import classes from './UsersList.module.css';


function UsersList() {
    const dispatch = useDispatch();
    const users = useSelector((state: UsersState) => state.users);
    const filteredUsers = useSelector((state: UsersState) => state.filteredUsers);
    const isFetching = useSelector((state: UsersState) => state.isFetching);

    useEffect(() => {
        async function loadUsers() {
            dispatch(usersActions.setIsFetching(true));
            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            if (response.ok) {
                const data: User[] = await response.json();
                dispatch(usersActions.setUsers(data));
                dispatch(usersActions.filterUsers());
            }

            dispatch(usersActions.setIsFetching(false));
        }

        loadUsers();
    }, []);

    if (isFetching)
        return (
            <span>
                Fetching the data.. {' '}
                <Spinner animation='border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            </span>
        );

    if (users.length === 0)
        return <span className={classes.tableSubstitute}>No users found</span>;

    return (
        <Table
            bordered
            hover
            striped
            className='table-success'
        >
            <thead>
            <tr>
                <th>
                    <span>Name</span>
                    <SearchField name='name'/>
                </th>
                <th>
                    <span>Username</span>
                    <SearchField name='username'/>
                </th>
                <th>
                    <span>Email</span>
                    <SearchField name='email'/>
                </th>
                <th>
                    <span>Phone</span>
                    <SearchField name='phone'/>
                </th>
            </tr>
            </thead>
            <tbody>
            {
                filteredUsers.map(
                    ({name, username, email, phone}: UserView) => (
                        <tr key={username}>
                            <td>{name}</td>
                            <td>{username}</td>
                            <td>{email}</td>
                            <td>{phone}</td>
                        </tr>
                    )
                )
            }
            </tbody>
        </Table>
    );
}

export default UsersList;