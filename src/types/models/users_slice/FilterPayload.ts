import UserView from '../user/UserView';

interface FilterPayload {
    field: keyof UserView;
    phrase: UserView[keyof UserView];
}

export default FilterPayload;