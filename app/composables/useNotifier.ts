export const useNotifier = () => {
  const toast = useToast()

  return {
    success: (message: string) =>
      toast.success({
        title: 'Success',
        message: message,
        timeout: 3000,
        position: 'topRight',
        color: 'success'
      }),

    error: (message: string) =>
      toast.error({
        title: 'Error',
        message: message,
        timeout: 3000,
        color: 'error'
      })
  }
}