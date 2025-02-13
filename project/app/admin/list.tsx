"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { Link as LinkInterface } from "@/interfaces/Link";

export default function Dashboard() {
  const [links, setLinks] = useState<LinkInterface[]>([]);

  useEffect(() => {
    fetch("/api/admin")
      .then(res => res.json())
      .then(data => {
        setLinks(data.links);
      });
  }, []);

  const handleDelete = async (id: string) => {
    const link = links.find(link => link.id === id);
    if (link) {
      try {
        const response = await fetch(`/api/admin`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            short_code: link.short_code
          })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setLinks(links.filter(link => link.id !== id));
      } catch (error) {
        console.error('Error deleting link:', error);
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
              <th className="text-left p-3 px-2">Usuario</th>
              <th></th>
            </tr>
            {links.map(link => (
              <tr key={link.id} className="border-b hover:bg-orange-100 bg-gray-100 flex flex-col sm:table-row">
                <td className="p-3 px-5">
                  <Link href={`/url-info/${link.short_code}`} className="bg-transparent">{link.short_code}</Link>
                </td>
                <td className="p-3 px-5">
                  <p className="bg-transparent border-gray-300">{link.original_url}</p>
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
                <td className="p-3 px-2">
                  <label className="relative inline-flex items-center justify-center w-full">
                    <p className="bg-transparent">{link.user_id}</p>
                  </label>
                </td>
                <td className="p-3 px-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDelete(link.id)}
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
