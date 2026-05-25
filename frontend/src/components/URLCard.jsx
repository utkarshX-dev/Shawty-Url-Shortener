import { FaCopy, FaExternalLinkAlt, FaTrashAlt } from 'react-icons/fa'
import Button from './Button'
import { formatDate, normalizeShortUrl, truncate } from '../utils/format'

export default function URLCard({ item, onCopy, onDelete }) {
  const shortUrl = normalizeShortUrl(item.shortUrl)

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-black">{truncate(item.originalUrl, 72)}</p>
      <a
        href={shortUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-1 inline-flex items-center gap-2 text-sm text-gray-700 hover:text-black"
      >
        {shortUrl}
        <span className="inline-flex"><FaExternalLinkAlt /></span>
      </a>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
        <span>{item.clicks ?? 0} clicks</span>
        <span>{formatDate(item.createdAt)}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => onCopy(shortUrl)}>
          <span className="inline-flex"><FaCopy /></span>
          Copy
        </Button>
        <Button variant="danger" onClick={() => onDelete(item._id)}>
          <span className="inline-flex"><FaTrashAlt /></span>
          Delete
        </Button>
      </div>
    </article>
  )
}
