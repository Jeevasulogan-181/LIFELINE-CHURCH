// Static only — no backend
export async function postContact(data: { name: string; email: string; message: string }) {
  console.log('Contact form:', data)
  return { success: true }
}
export async function postPrayer(data: { name?: string; request: string }) {
  console.log('Prayer request:', data)
  return { success: true }
}
