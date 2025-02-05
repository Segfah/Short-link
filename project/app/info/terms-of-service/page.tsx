export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Conditions Générales d'Utilisation</h1>
        <p className="mb-4">Dernière mise à jour : 27/01/2025</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Acceptation des Conditions</h2>
          <p>En utilisant sl.corozco.fr, vous acceptez de vous conformer et d'être lié par ces Conditions Générales d'Utilisation. Si vous n'êtes pas d'accord avec une partie quelconque de ces conditions, vous ne pouvez pas utiliser notre service.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Description du Service</h2>
          <p>sl.corozco.fr est un raccourcisseur d'URL conçu à des fins éducatives et de démonstration. Il permet aux utilisateurs de créer des versions courtes d'URL longues pour faciliter leur partage.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Inscription au Compte</h2>
          <ul className="list-disc list-inside">
            <li>Certains services peuvent nécessiter la création d'un compte.</li>
            <li>Vous êtes responsable de maintenir la confidentialité de votre compte et de votre mot de passe.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Utilisation du Service</h2>
          <ul className="list-disc list-inside">
            <li>Les liens créés sans compte utilisateur seront automatiquement supprimés après 24 heures.</li>
            <li>Les liens créés avec un compte utilisateur seront supprimés, modifiés par vous-même ou si vous supprimez votre compte.</li>
            <li>Vous vous engagez à ne pas utiliser le service à des fins illégales, frauduleuses ou malveillantes.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Contenu de l'Utilisateur</h2>
          <ul className="list-disc list-inside">
            <li>Vous êtes seul responsable des liens que vous créez et partagez via notre service.</li>
            <li>Nous nous réservons le droit de supprimer tout lien que nous jugeons inapproprié ou en violation de ces conditions.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Confidentialité et Protection des Données</h2>
          <ul className="list-disc list-inside">
            <li>Nous collectons des informations limitées, y compris les adresses e-mail, uniquement pour le fonctionnement du service.</li>
            <li>Nous n'utilisons pas ces informations à des fins commerciales.</li>
            <li>Les données seront conservées pendant la durée maximale autorisée par la loi française.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Limitation de Responsabilité</h2>
          <ul className="list-disc list-inside">
            <li>sl.corozco.fr, ses créateurs et le domaine associé ne sont pas responsables de toute utilisation abusive, fraude ou activité illégale réalisée via les liens raccourcis.</li>
            <li>L'utilisateur assume l'entière responsabilité de l'utilisation du service et des liens qu'il crée.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Modifications du Service</h2>
          <p>Nous nous réservons le droit de modifier ou d'interrompre le service à tout moment, avec ou sans préavis.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. Loi Applicable</h2>
          <p>Ces conditions seront régies et interprétées conformément aux lois françaises.</p>
        </div>

      </div>
    </div>
  );
}
