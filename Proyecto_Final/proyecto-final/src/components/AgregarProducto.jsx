import React, { useState,useEffect  } from 'react';
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

    const [categories, setCategories] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Obtener categorías desde la API
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

    // Validación simple
    if (!formData.title || !formData.price || !formData.description || !formData.category || !formData.image || !formData.rating.rate || !formData.rating.count) {
        alert('Por favor completa todos los campos.');
        return;
    }

    try {
        const response = await fetch('https://67eaf4ae34bcedd95f651d8e.mockapi.io/api/products', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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

        if (!response.ok) {
            throw new Error('No se pudo agregar el producto');
        }

        const data = await response.json();
        console.log('Producto agregado:', data);

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

    } catch (error) {
        console.error('Error al agregar el producto:', error);
        alert('Ocurrió un error al enviar el producto.');
    }
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
                            <Form.Label>Precio($USD)</Form.Label>
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
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una categoría</option>
                                {categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
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
