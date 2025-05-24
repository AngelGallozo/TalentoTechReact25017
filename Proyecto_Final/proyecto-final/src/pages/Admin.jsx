import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AgregarProducto from '../components/AgregarProducto';

function Admin() {
    return (
        <Container className="mt-4">
            <h1 className="mb-3">Administración</h1>
            <hr style={{ borderTop: "1px solid #ccc", opacity: 0.5 }} />

            <Row>
                <Col>
                    <AgregarProducto />
                </Col>
            </Row>
        </Container>
    );
}

export default Admin;
