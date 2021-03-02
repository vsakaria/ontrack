
export const books = async (payload: any): Promise<any> => {
  const response = await fetch('http://nyx.vima.ekt.gr:3000/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return response.json()
}
