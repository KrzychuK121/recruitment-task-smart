import React from 'react';
import { CloseButton, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { OverlayInjectedProps } from 'react-bootstrap/Overlay';
import { useDispatch } from 'react-redux';
import { usersActions } from '../store/usersSlice';
import UserView from '../types/models/user/UserView';
import classes from './SearchField.module.css';

function SearchField({name}: { name: keyof UserView }) {
    const dispatch = useDispatch();
    const searchInputId = `input-${name}`;

    function filterBy(phrase: string) {
        dispatch(
            usersActions.setFilter(
                {field: name, phrase}
            )
        );
        dispatch(usersActions.filterUsers());
    }

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const typed = event.target.value;
        filterBy(typed);
    }

    function onClickHandler(event: React.MouseEvent<HTMLInputElement>) {
        event.currentTarget.select();
    }

    function clearFieldHandler() {
        const searchInput = document.getElementById(searchInputId) as HTMLInputElement;
        searchInput.value = '';
        filterBy('');
    }

    function getClearFieldTooltip(props: OverlayInjectedProps | (React.ReactNode | undefined)[]) {
        return (
            <Tooltip id='clear-tooltip' {...props}>
                Clear search field
            </Tooltip>
        );
    }

    return (
        <>
            <InputGroup className={`align-items-center ${classes.searchField}`}>
                <Form.Control
                    id={searchInputId}
                    onChange={onChangeHandler}
                    onClick={onClickHandler}
                    placeholder={`Search ${name}..`}
                />
                <OverlayTrigger
                    placement='top'
                    delay={{show: 400, hide: 200}}
                    overlay={getClearFieldTooltip}
                    aria-label='Clear search field tooltip'
                >
                    <CloseButton
                        aria-label='Clear search field'
                        onClick={clearFieldHandler}
                    />
                </OverlayTrigger>
            </InputGroup>
        </>
    );
}

export default SearchField;