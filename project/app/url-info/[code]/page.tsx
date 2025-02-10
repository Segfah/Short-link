import { getLinkInfo } from '@/app/ui/info-rendering';
import Link from 'next/link';
import { auth } from '@/auth';

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const linkInfo = await getLinkInfo(code);
  const user = await auth();

  const fields = [
    { label: 'URL originale', value: linkInfo?.original_url, isLink: true },
    { label: 'Date de création', value: linkInfo?.creation_date ? new Date(linkInfo.creation_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : null },
  ];

  const userfields = [
    { label: 'Le code a ete mis a jour le', value: linkInfo?.updated_date ? new Date(linkInfo.updated_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : null },
    { label: 'Désactivé', value: linkInfo?.is_disabled !== undefined ? (linkInfo.is_disabled ? 'Oui' : 'Non') : null },
    { label: 'Nombre d\'accès', value: linkInfo?.access_count },
    { label: 'Dernier accès', value: linkInfo?.last_access ? new Date(linkInfo.last_access).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : null },
    { label: 'Suppression après 2 ans', value: linkInfo?.delete_after_2_years !== undefined ? (linkInfo.delete_after_2_years ? 'Oui' : 'Non') : null },
  ];
  /*
    const Adminfields = [
      { label: 'Identifiant', value: linkInfo?.id },
      { label: 'ID utilisateur', value: linkInfo?.user_id },
      { label: 'IP de création', value: linkInfo?.ip_creation },
    ];
  */

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 text-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Informations détaillées et publiques du lien{' '}
          <span className="font-semibold">{code}</span>
        </h1>

        <div className="mt-4">
          {linkInfo ? (
            <>
              <ul className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md text-gray-700 space-y-2">
                {fields.map((field, index) =>
                  field.value ? (
                    <li key={index}>
                      <span className="font-semibold">{field.label} :</span>{' '}
                      {field.isLink ? (
                        <a href={field.value} className="text-blue-600 underline">{field.value}</a>
                      ) : (
                        field.value
                      )}
                    </li>
                  ) : null
                )}
              </ul>

              {/* Mostrar userfields solo si hay un usuario autenticado */}
              {user && (
                <ul className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md text-gray-700 space-y-2">
                  {userfields.map((field, index) =>
                    field.value ? (
                      <li key={index}>
                        <span className="font-semibold">{field.label} :</span>{' '}
                        {field.value}
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </>
          ) : (
            <div className="mt-4 text-center text-gray-500">
              Aucun résultat trouvé pour le code spécifié, veuillez réessayer avec un autre code.
            </div>
          )}
          <div className="mt-4 text-center text-blue-600">
            <Link href="/url-info">
              Page précédente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
