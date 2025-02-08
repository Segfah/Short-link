"use client"
import { useState, useEffect } from "react";

interface Link {
  id: string;
  short_code: string;
  original_url: string;
  creation_date: string;
  is_disabled: boolean;
}

export function Dashboard() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isValidUrl, setIsValidUrl] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch("/api/link")
      .then(res => res.json())
      .then(data => {
        setLinks(data.links);
        // Validar las URLs al cargar la página
        const initialValidation = data.links.reduce((acc: { [key: string]: boolean }, link: Link) => {
          acc[link.id] = validateUrl(link.original_url);
          return acc;
        }, {});
        setIsValidUrl(initialValidation);
      });
  }, []);

  const validateUrl = (url: string) => {
    try {
      if (!url.startsWith('http://') && !url.startsWith('https://'))
        return false;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSourceChange = (id: string, value: string) => {
    setLinks(links.map(link => link.id === id ? { ...link, original_url: value } : link));
    setIsValidUrl({ ...isValidUrl, [id]: validateUrl(value) });
  };

  const handleSave = async (id: string) => {
    if (!isValidUrl[id]) return;
    const link = links.find(link => link.id === id);
    if (link) {
      try {
        const response = await fetch(`/api/link`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            short_code: link.short_code,
            original_url: link.original_url,
            is_disabled: link.is_disabled
          })
        });
        console.log ('Response:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const updatedLink = await response.json();
        console.log('Link updated:', updatedLink);
      } catch (error) {
        console.error('Error updating link:', error);
      }
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b hidden sm:table-row">
              <th className="text-left p-3 px-5">Short Code</th>
              <th className="text-left p-3 px-5">Original URL</th>
              <th className="text-left p-3 px-2">Creation Date</th>
              <th className="text-left p-3 px-2">Status</th>
              <th></th>
            </tr>
            {links.map(link => (
              <tr key={link.id} className="border-b hover:bg-orange-100 bg-gray-100 flex flex-col sm:table-row">
                <td className="p-3 px-5">
                  <p className="bg-transparent">{link.short_code}</p>
                </td>
                <td className="p-3 px-5">
                  <input
                    type="text"
                    value={link.original_url}
                    onChange={(e) => handleSourceChange(link.id, e.target.value)}
                    className={`bg-transparent border p-1 rounded w-full ${isValidUrl[link.id] ? "border-gray-300" : "border-red-500"}`}
                  />
                  {!isValidUrl[link.id] && <p className="text-red-500 text-sm mt-1">URL invalide</p>}
                </td>
                <td className="p-3 px-2">
                  <p className="bg-transparent">{new Date(link.creation_date).toLocaleDateString()}</p>
                </td>
                <td className="p-3 px-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!link.is_disabled}
                      onChange={() => setLinks(links.map(l => l.id === link.id ? { ...l, is_disabled: !l.is_disabled } : l))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </td>
                <td className="p-3 px-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSave(link.id)}
                    disabled={!isValidUrl[link.id]}
                    className={`mr-3 text-sm py-1 px-2 rounded focus:outline-none focus:shadow-outline ${
                      isValidUrl[link.id]
                        ? "bg-blue-500 hover:bg-blue-700 text-white"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    Sauvegarder 
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
