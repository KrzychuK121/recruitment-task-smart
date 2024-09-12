import Geo from './Geo';

type Address = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: Geo,
}

export default Address;