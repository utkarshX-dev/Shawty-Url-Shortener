import { useState } from 'react'

export default function useClipboard(timeout = 1500) {
  const [copiedText, setCopiedText] = useState('')

  const copy = async (text) => {
    await navigator.clipboard.writeText(text)
    setCopiedText(text)
    window.setTimeout(() => setCopiedText(''), timeout)
  }

  return { copy, copiedText }
}
