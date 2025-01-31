import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 text-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-center">Bienvenue sur notre service de raccourcissement d'URL</h1>
        
        <div className="mt-4 text-center text-gray-500 mb-8">
          <ul className="list-disc list-inside">
            <li>Les liens créés sans compte utilisateur seront automatiquement supprimés après 24 heures.</li>
            <li>Les liens créés avec un compte utilisateur seront supprimés, modifiés par vous-même ou si vous supprimez votre compte.</li>
          </ul>
        </div>

        {/* Formulaire para acortar URL */}
        <form className="mb-6">
          <input
            type="text"
            placeholder="Entrez l'Url a raccourcir"
            className="text-center w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Réduire l'URL
          </button>
        </form>

        {/* Espacio para mostrar resultados */}
        <div className="mt-4">


          {/* Relleno con un JSON de ejemplo */}
          <div className="mt-4 text-center text-gray-500 mb-8">
            Vous vous engagez à ne pas utiliser le service à des fins illégales, frauduleuses ou malveillantes. 
          </div>

        </div>

        <div className="mt-4">
          {/* Relleno con un JSON de ejemplo */}
          <div className="mt-4 text-center text-gray-500 mb-8">
          
          </div>
          <Link
              key='Statistiques'
              href='url-info'
              className="text-sky-700text-sm font-semibold hover:text-sky-700 mr-4 text-center"
            >
              <p>Si vous avez reçu un lien raccourci, vous pouvez cliquer ici afin de voir l'URL complète d'origine ainsi que des informations supplémentaires.</p>
            </Link>
            

        </div>
      </div>
    </div>
  );
}
