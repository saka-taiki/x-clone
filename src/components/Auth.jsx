import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>X</h1>
      <h2 style={styles.title}>{isLogin ? 'ログイン' : 'アカウント作成'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? '処理中...' : isLogin ? 'ログイン' : '登録'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} style={styles.toggle}>
        {isLogin ? 'アカウントを作成する' : 'ログインに戻る'}
      </button>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '80px auto',
    padding: '40px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  logo: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  title: {
    fontSize: '20px',
    marginBottom: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px 16px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    marginTop: '4px',
  },
  toggle: {
    marginTop: '16px',
    background: 'none',
    border: 'none',
    color: '#1d9bf0',
    cursor: 'pointer',
    fontSize: '14px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    margin: '0',
  },
}
