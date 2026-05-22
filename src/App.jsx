import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Feed from './components/Feed'
import PostForm from './components/PostForm'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return null

  if (!session) return <Auth />

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>X</h1>
        <button onClick={() => supabase.auth.signOut()} style={styles.logout}>
          ログアウト
        </button>
      </header>
      <main style={styles.main}>
        <PostForm userId={session.user.id} onPost={() => setRefresh(r => r + 1)} />
        <Feed refresh={refresh} />
      </main>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: '1px solid #e5e5e5',
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
  },
  logo: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
  },
  logout: {
    padding: '6px 16px',
    border: '1px solid #ccc',
    borderRadius: '24px',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  main: {
    minHeight: '100vh',
  },
}
