export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 text-gray-800">
        <h1 className="text-2xl font-bold mb-4">À Propos de sl.corozco.fr</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">🚀 Notre Mission</h2>
          <p>sl.corozco.fr est un service gratuit de raccourcissement d'URL conçu pour simplifier le partage de liens sur internet.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">💡 Deux Modes d'Utilisation</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Mode Enregistré:</h3>
            <ul className="list-disc list-inside">
              <li>Création de liens durables</li>
              <li>Possibilité de modifier, supprimer, activer ou désactiver vos liens</li>
              <li>Suivi détaillé de tous vos liens créés</li>
              <li>Gestion personnalisée de votre compte</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Mode Anonyme:</h3>
            <ul className="list-disc list-inside">
              <li>Création rapide de liens sans inscription</li>
              <li>Liens valables pendant 24 heures</li>
              <li>Idéal pour un usage ponctuel et sans engagement</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">🔧 Caractéristiques Techniques</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Fonctionnalités Clés</h3>
            <ul className="list-disc list-inside">
              <li>Génération de liens courts uniques</li>
              <li>Système d'authentification utilisateur sécurisé</li>
              <li>Gestion dynamique des liens</li>
              <li>Statistiques de consultation détaillées</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Infrastructure</h3>
            <ul className="list-disc list-inside">
              <li>Frontend et Backend: Next.js</li>
              <li>Base de Données: MySQL</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
