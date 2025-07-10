import Dashboard from "../components/Dashboard"
export default function Home() {
  const authenticated = true
  return (
    <main className='flex flex-col gap-4 items-center'>
      {authenticated && <Dashboard />}
    </main>
  )
}
