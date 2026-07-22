export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: 'https://6a5fd778b1933e9d25fcb56a.mockapi.io',

    onRequest({ options }) {
  
    },

    onResponseError({ response }) {
    
    }
  })

  return {
    provide: {
      api
    }
  }
})