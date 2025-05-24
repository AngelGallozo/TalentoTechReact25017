import React from "react";
import { Link } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ producto, addToCart }) => {
    return (
        <Card 
            className="h-100 d-flex flex-column product-card"
            style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
        >
            <Link to={`/productos/${producto.id}`}>
                <Card.Img
                    variant="top"
                    src={producto.image}
                    alt={producto.title}
                    className="card-img-top img-fluid"
                    style={{ height: '200px', objectFit: 'contain' }}
                />
            </Link>

            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Card.Title 
                        style={{
                            height: '48px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {producto.title}
                    </Card.Title>

                    <Card.Text 
                        className="product-description"
                    >
                        {producto.description}
                    </Card.Text>
                    <Card.Text>
                        <strong>${producto.price}</strong>
                    </Card.Text>
                </div>

                <Button 
                    variant="primary" 
                    onClick={() => addToCart(producto)} 
                    className="mt-2"
                >
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" /> Agregar al carrito
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
