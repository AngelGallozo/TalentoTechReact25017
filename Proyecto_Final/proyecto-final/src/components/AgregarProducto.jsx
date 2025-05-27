import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import validarFormulario from './ValidarFormulario';

function AgregarProducto() {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: { rate: '', count: '' }
    });

    const [categories, setCategories] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errores, setErrores] = useState({});  // <-- Estado para errores

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error('Error cargando categorías:', err));
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar el formulario
        const erroresValidacion = validarFormulario(formData);
        setErrores(erroresValidacion);

        // Si hay errores, no continuar
        if (Object.keys(erroresValidacion).length > 0) return;

        try {
            const response = await fetch('https://67eaf4ae34bcedd95f651d8e.mockapi.io/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    price: parseFloat(formData.price),
                    description: formData.description,
                    image: formData.image,
                    category: formData.category,
                    rating: {
                        rate: parseFloat(formData.rating.rate),
                        count: parseInt(formData.rating.count)
                    }
                })
            });

            if (!response.ok) throw new Error('No se pudo agregar el producto');

            const data = await response.json();

            setShowSuccess(true);
            setFormData({
                title: '',
                price: '',
                description: '',
                category: '',
                image: '',
                rating: { rate: '', count: '' }
            });
            setErrores({});

            setTimeout(() => setShowSuccess(false), 3000);

        } catch (error) {
            console.error('Error al agregar el producto:', error);
            alert('Ocurrió un error al enviar el producto.');
        }
    };

    return (
        <>
            <h4 className="mb-3">Agregar nuevo producto</h4>
            {showSuccess && <Alert variant="success">Producto agregado exitosamente.</Alert>}
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
                                isInvalid={!!errores.title}
                            />
                            <Form.Control.Feedback type="invalid">{errores.title}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Precio($USD)</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                isInvalid={!!errores.price}
                            />
                            <Form.Control.Feedback type="invalid">{errores.price}</Form.Control.Feedback>
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
                        isInvalid={!!errores.description}
                    />
                    <Form.Control.Feedback type="invalid">{errores.description}</Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                isInvalid={!!errores.category}
                            >
                                <option value="">Selecciona una categoría</option>
                                {categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errores.category}</Form.Control.Feedback>
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
                                isInvalid={!!errores.image}
                            />
                            <Form.Control.Feedback type="invalid">{errores.image}</Form.Control.Feedback>
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
                                isInvalid={!!errores.rate}
                            />
                            <Form.Control.Feedback type="invalid">{errores.rate}</Form.Control.Feedback>
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
                                isInvalid={!!errores.count}
                            />
                            <Form.Control.Feedback type="invalid">{errores.count}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Button type="submit" variant="primary">Agregar producto</Button>
            </Form>
        </>
    );
}

export default AgregarProducto;
