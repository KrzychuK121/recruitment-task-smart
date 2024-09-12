import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import classes from './App.module.css';
import UsersList from './components/UsersList';

function App() {
    return (
        <Container as='main' className={classes.tableContainer}>
            <Row className='justify-content-center'>
                <Col>
                    <UsersList/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
