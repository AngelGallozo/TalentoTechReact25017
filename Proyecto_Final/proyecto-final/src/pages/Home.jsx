import React from "react";
import {Container} from "react-bootstrap"
import Main from "../components/Main";

function Home({productos, cargando,addToCart}){

    return(
        <Container className="mt-4">
            <h1>Home</h1>
            <Main productos={productos} cargando={cargando} addToCart={addToCart}>
                
            </Main>

        </Container>
    );
}

export default Home;