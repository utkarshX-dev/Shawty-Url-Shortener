import { useState } from 'react'

export default function useApiAction(action) {
  const [loading, setLoading] = useState(false)

  const execute = async (...args) => {
    setLoading(true)
    try {
      return await action(...args)
    } finally {
      setLoading(false)
    }
  }

  return { execute, loading }
}
