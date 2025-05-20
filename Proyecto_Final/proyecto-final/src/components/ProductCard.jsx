
import React from "react";
import { Link } from 'react-router-dom';
import {Button, Card } from "react-bootstrap";

const ProductCard = ({producto, addToCart})=>{

    return(
        <Card className="h-100 d-flex flex-column">
            <Link to={`/productos/${producto.id}`}>
                <Card.Img
                    variant="top"
                    src={producto.image}
                    alt={producto.title}
                    className="card-img-top img-fluid"
                    style={{ height: '200px', objectFit: 'contain' }}
                />
            </Link>
            
            <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.title}</Card.Title>
                <Card.Text style={{ maxHeight: '100px', overflow: 'hidden' }}>
                    {producto.description.slice(0,100)}
                </Card.Text>
                <Card.Text>
                    <strong>${producto.price}</strong>
                </Card.Text>
                <Button variant="primary" onClick={() => addToCart(producto)}>
                    Agregar al carrito
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;