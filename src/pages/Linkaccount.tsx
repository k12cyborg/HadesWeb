import { useState } from "react";
import type { SteamAccount } from "../types/linkaccountTypes";
import { useSearchParams } from 'react-router-dom';

function Linkaccount() {
  const [searchParams] = useSearchParams();
  
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<SteamAccount | null>(null);
  const handleSeleccionarOpcion = (opcion: SteamAccount) => {
    setOpcionSeleccionada(opcion);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    console.log("¡Formulario enviado! 🎉");
  };

  
  return (
<div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Elige tu Plan 😎</h2>
      
      <form onSubmit={handleSubmit}>
        
        <div className="space-y-4 mb-6">
          {OPCIONES_DISPONIBLES.map((opcion) => {
            // Determina si esta opción está actualmente seleccionada para cambiar estilos
            const isSelected = opcionSeleccionada?.id === opcion.id;
            
            return (
              // Contenedor de la opción (usa estilos condicionales de Tailwind)
              <div 
                key={opcion.id} 
                className={`
                  flex items-center justify-between p-4 border rounded-lg transition duration-300 ease-in-out
                  ${isSelected 
                    ? 'border-indigo-500 bg-indigo-50 shadow-md ring-2 ring-indigo-500' 
                    : 'border-gray-200 hover:border-gray-400'
                  }
                `}
              >
                <span className="text-lg font-medium text-gray-700">
                  {opcion.nombre}
                </span>
                
                {/* Botón de Selección */}
                <button
                  type="button" // MUY IMPORTANTE: Evita que el botón haga submit
                  onClick={() => handleSeleccionarOpcion(opcion)}
                  className={`
                    px-4 py-2 text-sm font-semibold rounded-full transition duration-300
                    ${isSelected 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                    }
                  `}
                >
                  {isSelected ? 'Deseleccionar' : 'Seleccionar'}
                </button>
              </div>
            );
          })}
        </div>
        
        {/* Botón final para enviar el formulario */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-gray-400"
          disabled={!opcionSeleccionada}
        >
          Confirmar y Enviar
        </button>
        
        {/* Muestra la selección actual (opcional) */}
        <p className="mt-4 text-center text-sm text-gray-500">
            {opcionSeleccionada ? 
             `Selección actual: ${opcionSeleccionada.nombre}` : 
             'Aún no has seleccionado nada.'}
        </p>
        
      </form>
    </div>
  )
}

export default Linkaccount