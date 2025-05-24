import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

function AgregarProducto() {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: {
            rate: '',
            count: ''
        }
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'rate' || name === 'count') {
            setFormData({
                ...formData,
                rating: {
                    ...formData.rating,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación simple
        if (!formData.title || !formData.price || !formData.description || !formData.category || !formData.image || !formData.rating.rate || !formData.rating.count) {
            alert('Por favor completa todos los campos.');
            return;
        }

        // TODO: terminar de agregar al producto
        console.log('Producto a agregar:', formData);

        setShowSuccess(true);
        setFormData({
            title: '',
            price: '',
            description: '',
            category: '',
            image: '',
            rating: {
                rate: '',
                count: ''
            }
        });

        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <>
            <h4 className="mb-3">Agregar nuevo producto</h4>
            {showSuccess && (
                <Alert variant="success">Producto agregado exitosamente.</Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Rating - Rate</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.1"
                                name="rate"
                                value={formData.rating.rate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Rating - Count</Form.Label>
                            <Form.Control
                                type="number"
                                name="count"
                                value={formData.rating.count}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button type="submit" variant="primary">Agregar producto</Button>
            </Form>
        </>
    );
}

export default AgregarProducto;
