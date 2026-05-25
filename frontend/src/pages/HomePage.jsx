import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLink, FaMagic } from 'react-icons/fa'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import useApiAction from '../hooks/useApiAction'
import useAuth from '../hooks/useAuth'
import { createCustomAlias, shortenUrl } from '../services/urlService'
import { normalizeShortUrl } from '../utils/format'
import { toastError, toastInfo, toastSuccess } from '../utils/toast'

function AuthHint({ text, onLogin }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3 text-sm text-gray-600">
      {text}
      <button onClick={onLogin} className="ml-2 font-semibold text-black underline" type="button">
        Login now
      </button>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [originalUrl, setOriginalUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [createdLink, setCreatedLink] = useState('')

  const { execute: runShorten, loading: loadingShorten } = useApiAction(shortenUrl)
  const { execute: runCustom, loading: loadingCustom } = useApiAction(createCustomAlias)

  const guardAuth = () => {
    if (isAuthenticated) return true
    toastInfo('Please login to create short URLs')
    navigate('/login')
    return false
  }

  const handleShorten = async (event) => {
    event.preventDefault()
    if (!guardAuth()) return

    try {
      const data = await runShorten({ originalUrl })
      setCreatedLink(normalizeShortUrl(data.shortUrl))
      toastSuccess(data.message || 'URL shortened successfully')
      setOriginalUrl('')
    } catch (error) {
      toastError(error.message)
    }
  }

  const handleCustom = async (event) => {
    event.preventDefault()
    if (!guardAuth()) return

    try {
      const data = await runCustom({ originalUrl, customAlias })
      setCreatedLink(normalizeShortUrl(data.shortUrl))
      toastSuccess(data.message || 'Custom alias created')
      setCustomAlias('')
      setOriginalUrl('')
    } catch (error) {
      toastError(error.message)
    }
  }

  return (
  <section className="relative space-y-10 overflow-hidden">

    {/* background glow */}
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl"></div>
    </div>

    {/* HERO */}
    <div
      className="
      relative overflow-hidden
      rounded-[2rem]
      border border-white/10
      bg-white/5
      backdrop-blur-2xl
      p-8 md:p-14
      shadow-[0_0_50px_rgba(255,255,255,0.05)]
      "
    >

      {/* background text */}
      <h1
        className="
        pointer-events-none absolute right-0 top-0
        translate-x-10 -translate-y-6
        text-[8rem] md:text-[12rem]
        font-black italic
        text-white/[0.03]
        "
      >
        shawty
      </h1>

      <div className="relative z-10">

        <p
          className="
          text-xs uppercase
          tracking-[0.35em]
          text-zinc-500
          "
        >
          Fast. Simple. Minimal.
        </p>

        <h1
          className="
          mt-4
          text-6xl md:text-7xl
          font-black italic
          tracking-tight
          bg-gradient-to-r from-white via-zinc-300 to-zinc-500
          bg-clip-text text-transparent
          "
        >
          Shawty
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
          Modern URL shortener with custom aliases, analytics, secure authentication,
          and a smooth black-and-white aesthetic built for creators ✦
        </p>

        {/* forms */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          {/* QUICK SHORTEN */}
          <form
            onSubmit={handleShorten}
            className="
            rounded-3xl
            border border-white/10
            bg-black/30
            p-6
            backdrop-blur-xl
            transition-all duration-300
            hover:border-white/20
            "
          >
            <h2
              className="
              mb-5 flex items-center gap-3
              text-xl font-bold text-white
              "
            >
              <span className="rounded-xl bg-white/10 p-3 text-white">
                <FaLink />
              </span>

              Quick Shorten
            </h2>

            <div className="space-y-4">

              <input
                type="url"
                placeholder="https://example.com"
                value={originalUrl}
                onChange={(event) => setOriginalUrl(event.target.value)}
                required
                className="
                w-full rounded-2xl
                border border-white/10
                bg-white/5
                px-5 py-4
                text-white
                placeholder:text-zinc-500
                outline-none
                transition-all duration-300
                focus:border-white/30
                focus:ring-2 focus:ring-white/10
                "
              />

              <Button
                type="submit"
                disabled={loadingShorten}
                className="
                w-full rounded-2xl
                bg-white
                !text-black
                py-4 font-semibold
                transition-all duration-300
                hover:scale-[1.02]
                hover:bg-zinc-200
                hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
                "
              >
                {loadingShorten ? 'Creating...' : 'Create Short URL'}
              </Button>

            </div>
          </form>

          {/* CUSTOM */}
          <form
            onSubmit={handleCustom}
            className="
            rounded-3xl
            border border-white/10
            bg-black/30
            p-6
            backdrop-blur-xl
            transition-all duration-300
            hover:border-white/20
            "
          >
            <h2
              className="
              mb-5 flex items-center gap-3
              text-xl font-bold text-white
              "
            >
              <span className="rounded-xl bg-white/10 p-3 text-white">
                <FaMagic />
              </span>

              Custom Alias
            </h2>

            <div className="space-y-4">

              <input
                type="url"
                placeholder="https://example.com"
                value={originalUrl}
                onChange={(event) => setOriginalUrl(event.target.value)}
                required
                className="
                w-full rounded-2xl
                border border-white/10
                bg-white/5
                px-5 py-4
                text-white
                placeholder:text-zinc-500
                outline-none
                transition-all duration-300
                focus:border-white/30
                focus:ring-2 focus:ring-white/10
                "
              />

              <input
                type="text"
                placeholder="shawty"
                value={customAlias}
                onChange={(event) => setCustomAlias(event.target.value)}
                minLength={4}
                maxLength={8}
                required
                className="
                w-full rounded-2xl
                border border-white/10
                bg-white/5
                px-5 py-4
                text-white
                placeholder:text-zinc-500
                outline-none
                transition-all duration-300
                focus:border-white/30
                focus:ring-2 focus:ring-white/10
                "
              />

              <Button
                type="submit"
                disabled={loadingCustom}
                className="
                w-full rounded-2xl
                bg-white
                !text-black
                py-4 font-semibold
                transition-all duration-300
                hover:scale-[1.02]
                hover:bg-zinc-200
                hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
                "
              >
                {loadingCustom ? 'Creating...' : 'Create Custom Alias'}
              </Button>

            </div>
          </form>
        </div>

        {/* auth hint */}
        {!isAuthenticated ? (
          <div
            className="
            mt-6 flex items-center justify-between
            rounded-2xl
            border border-dashed border-white/10
            bg-black/20
            p-4
            "
          >
            <p className="text-sm text-zinc-400">
              Login required to create and manage shortened URLs.
            </p>

            <button
              onClick={() => navigate('/login')}
              type="button"
              className="
              rounded-xl
              bg-white px-5 py-2
              text-sm font-semibold text-black
              transition-all duration-300
              hover:bg-zinc-200
              "
            >
              Login
            </button>
          </div>
        ) : null}

        {/* generated link */}
        {createdLink ? (
          <div
            className="
            mt-8
            rounded-3xl
            border border-white/10
            bg-black
            p-6
            shadow-[0_0_30px_rgba(255,255,255,0.08)]
            "
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Generated Link
            </p>

            <a
              href={createdLink}
              target="_blank"
              rel="noreferrer"
              className="
              mt-3 block break-all
              text-lg font-medium
              text-white underline
              underline-offset-4
              "
            >
              {createdLink}
            </a>
          </div>
        ) : null}
      </div>
    </div>

    {/* FEATURES */}
    <div className="grid gap-5 md:grid-cols-3">
      {[
        [
          'Dashboard Metrics',
          'Track total URLs, analytics, clicks, and top-performing links.',
        ],
        [
          'Profile Controls',
          'Update username, email, password, and profile securely.',
        ],
        [
          'Clean Experience',
          'Minimal black-and-white interface with smooth responsiveness.',
        ],
      ].map(([title, text]) => (
        <article
          key={title}
          className="
          group rounded-3xl
          border border-white/10
          bg-white/5
          p-6
          backdrop-blur-xl
          transition-all duration-300
          hover:border-white/20
          hover:bg-white/[0.07]
          hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]
          "
        >
          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {text}
          </p>
        </article>
      ))}
    </div>
  </section>
)
}
