import React from "react";
import { Link } from 'react-router-dom';
import { Container,Row,Col,Card } from "react-bootstrap";

function Main({productos,cargando,error,addToCart}){

    return(
      <Container className="mt-4">
       {cargando && <p>Cargando productos...</p>}
        {error && <p>{error}</p>}
  
        {!cargando && !error && (
        
        <Row xs={1} md={2} lg={3} className="g-4">
            {productos.map((producto) => (
            <Col key={producto.id}>
                <Card className="h-100">
                <Link to={`/productos/${producto.id}`}>
                    <Card.Img
                      variant="top"
                      src={producto.image}
                      alt={producto.title}
                      style={{ height: '200px', objectFit: 'contain' }}
                    />
                </Link>
                
                <Card.Body>
                    <Card.Title>{producto.title}</Card.Title>
                    <Card.Text style={{ maxHeight: '100px', overflow: 'hidden' }}>
                    {producto.description}
                    </Card.Text>
                    <h5>${producto.price}</h5>
                    <button className="btn btn-primary" onClick={() => addToCart(producto)}>
                        Agreg. Carro
                    </button>
                </Card.Body>
                </Card>
            </Col>
            ))}
            
        </Row>
         )}
    </Container>);
}

export default Main;