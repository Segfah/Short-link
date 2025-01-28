"use client";

export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 text-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-center">Plus d'informations sur une URL</h1>

        {/* Modo de uso */}
        <div className="mb-6 text-center text-gray-700">
          <p className="text-gray-500 text-center">
            Cette page vous permet d'obtenir des informations détaillées sur des liens spécifiques de notre site.
          </p>
        </div>
        
        <div className="mb-6 text-center text-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Comment utiliser :</h2>
          <p className="text-sm mb-4">
            Suivez ces étapes simples pour utiliser le service :
          </p>
          <ul className="list-disc list-inside text-left text-sm space-y-2">
            <li>
              Identifiez le code unique dans le lien raccourci 
              <span className="font-medium text-blue-600"> (par exemple, "abc123" dans https://example.com/abc123)</span>.
            </li>
            <li>Entrez ce code dans le formulaire ci-dessous.</li>
          </ul>
        </div>


        {/* Formulario de búsqueda */}
        <form className="mb-6">
          <input
            type="text"
            placeholder="Entrez le code ici..."
            className="text-center w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Rechercher
          </button>
        </form>

        {/* Espacio para mostrar resultados */}
        <div className="mt-4">


          {/* Relleno con un JSON de ejemplo */}
          <div className="mt-4 text-center text-gray-500">
            Informations détaillées pour le code <span className="font-semibold">XXXX</span> :
          </div>
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md font-mono text-sm text-gray-700">
            <pre>
{`{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2024-09-01T12:00:00Z",
  "accessCount": 123
}`}
            </pre>
          </div>

          {/* no hay resultados */}
          <div className="mt-4 text-center text-gray-500">
            Aucun résultat trouvé pour le code spécifié, veuillez réessayer avec un autre code.
          </div>


        </div>
      </div>
    </div>
  );
}
