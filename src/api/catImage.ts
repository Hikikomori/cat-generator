export const getCatImage = async (id: string, text?: string, params?: string): Promise<string> => {
  let url = `${process.env.NEXT_PUBLIC_DOMAIN}/cat/${id}`
  
  if (text) {
    url += `/says/${text}`
  }
  
  if (params) {
    url += `?${params}`
  }
  
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error('Failed to fetch cat')
  }
  
  const contentType = response.headers.get('Content-Type')
  const blob = await response.blob()
  
  const buffer = Buffer.from(await blob.arrayBuffer())
  
  return `data:${contentType};base64,${buffer.toString('base64')}`
}
