import React, { useState } from 'react';

function Login() {
    const [user,setUser] = useState('');
    const [password,setPass] = useState('');
    function manejarLogin(evento){
        evento.preventDefault();
        alert(`Login: ${user} - ${password}`)
    }
    return (
        <div>
            <h1>Inicio de Sesión</h1>
            <form onSubmit={manejarLogin}>
                <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} placeholder='Ingrese nombre de usuario'/>
                <input type="password" name="password" id="password" value={password} onChange={(e)=>setPass(e.target.value)} placeholder='Ingrese contraseña' />
                <button type='submit'>Ingresar</button>
            </form>
        </div>
        
    
    );
}

export default Login;