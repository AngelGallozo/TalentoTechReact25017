
import './App.css'
import EquipoTalentoLab from './components/EquipoTalentoLab';
import TarjetaProyecto from './components/TarjetaProyecto';
import Boton from './components/Boton';
import './styles/style.css'
function App() {
  const equipo = [
    { nombre: 'Silvia', rol: 'Product Owner', imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg' },
    { nombre: 'Luis', rol: 'Diseñador UX/UI', imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg' },
    { nombre: 'Matías', rol: 'Desarrollador', imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg' },
    { nombre: 'Sabrina', rol: 'Desarrolladora', imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg' },
  ];

  const proyectos = [
    { 
        titulo: "Sistema de Análisis de Datos", 
        descripcion: "Un software avanzado para visualizar y analizar grandes volúmenes de datos.", 
        botonTexto: "Ver más" 
    },
    { 
        titulo: "Gestor de Tareas Colaborativo", 
        descripcion: "Una aplicación para facilitar la organización y seguimiento de proyectos en equipo.", 
        botonTexto: "Explorar proyecto" 
    },
    { 
        titulo: "Plataforma de E-learning", 
        descripcion: "Un sistema interactivo para la enseñanza y aprendizaje en línea.", 
        botonTexto: "Descubrir más" 
    },
    { 
        titulo: "Asistente Virtual de Atención al Cliente", 
        descripcion: "Un chatbot basado en inteligencia artificial para mejorar la atención al cliente.", 
        botonTexto: "Probar ahora" 
    },
    { 
        titulo: "Aplicación de Finanzas Personales", 
        descripcion: "Herramienta para gestionar ingresos, gastos y presupuestos de manera eficiente.", 
        botonTexto: "Empezar ahora" 
    }
];

const intereses = ['React', 'JavaScript', 'APIs', 'Diseño UX', 'Node.js'];

  return (
    <div>
      <EquipoTalentoLab equipo={equipo}></EquipoTalentoLab>
      <div className='lista-proyectos'>
        {proyectos.map((proyecto, index) => (
          <TarjetaProyecto
              key={index}
              titulo={proyecto.titulo}
              descripcion={proyecto.descripcion}
              botonTexto={proyecto.botonTexto}
          />
        ))}
      </div>
      <div className='lista-intereses'>
        {intereses.map((interes, index) => (
          <Boton
              key={index}
              texto={interes}
              id={index}
          />
        ))}
      </div>
    </div>
    
  )
}

export default App
