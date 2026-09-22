const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL

export async function healthCheck() {    
  const response = await fetch(`${NEXT_API_URL}/health`)
  return response.json()
}