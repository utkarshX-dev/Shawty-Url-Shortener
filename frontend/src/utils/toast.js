import toast from 'react-hot-toast'

const baseStyle = {
  borderRadius: '12px',
  border: '1px solid #111111',
  color: '#ffffff',
  background: '#111111',
}

export function toastSuccess(message) {
  toast.success(message, {
    style: {
      ...baseStyle,
      background: '#166534',
      border: '1px solid #166534',
    },
  })
}

export function toastError(message) {
  toast.error(message, {
    style: {
      ...baseStyle,
      background: '#b91c1c',
      border: '1px solid #b91c1c',
    },
  })
}

export function toastInfo(message) {
  toast(message, {
    icon: 'i',
    style: {
      ...baseStyle,
      background: '#1f2937',
      border: '1px solid #1f2937',
    },
  })
}

export function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || 'Something went wrong'
}
