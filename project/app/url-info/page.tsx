"use client";

export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 text-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-center">Plus d'informations sur une URL</h1>

        {/* Modo de uso */}
        <div className="mb-6 text-center text-gray-500">
          <p className="text-gray-500 text-center">
            Sur cette page, nous pourrons voir quelques informations sur certains liens.<br />
            Si vous avez reçu un lien de ce site, vous pouvez le rechercher et voir son URL d'origine et quelques informations supplémentaires.
          </p>
        </div>
        <div className="mb-6 text-center text-gray-500">
          <p className="text-gray-500 text-center">
            Exemple d'utilisation: <br />
            Pour un lien comme https://example.com/<span className="text-blue-950">/abc123</span> prenez le code <span className="text-blue-500">abc123</span> et entrez-le dans le champ de recherche ci-dessous.
          </p>
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
          <p className="text-gray-500 text-center">
            Les résultats de la recherche s'afficheront ici.
          </p>

          {/* Relleno con un JSON de ejemplo */}
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md font-mono text-sm text-gray-700">
            <pre>
{`{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2024-09-01T12:00:00Z"
}`}
            </pre>
          </div>


        </div>
      </div>
    </div>
  );
}
