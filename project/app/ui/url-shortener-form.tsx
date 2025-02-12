'use client';

import { useState } from 'react';

export default function UrlShortenerForm() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Enviando URL:', url);
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
      setCopied(false); // Resetear estado de copiado
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la solicitud');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Entrez l'Url a raccourcir"
          required
          className="text-center w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:bg-blue-300"
        >
          {isLoading ? 'Traitement...' : "Réduire l'URL"}
        </button>
      </form>

      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="text-center mt-4 p-4 bg-green-50 rounded-md">
          <p className="text-center text-gray-700 mb-2">URL raccourcie :</p>

          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:bg-blue-300"
          >
            {shortUrl}
          </button>
          {copied && <span className="text-sm text-green-600">Copié !</span>}
        </div>

      )}
    </div>
  );
}
