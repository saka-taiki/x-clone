import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function PostForm({ userId, onPost }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)

    const { error } = await supabase
      .from('posts')
      .insert({ user_id: userId, content: content.trim() })

    if (!error) {
      setContent('')
      onPost()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        placeholder="いまどうしてる？"
        value={content}
        onChange={e => setContent(e.target.value)}
        maxLength={280}
        rows={3}
        style={styles.textarea}
      />
      <div style={styles.footer}>
        <span style={styles.count}>{content.length}/280</span>
        <button type="submit" disabled={loading || !content.trim()} style={styles.button}>
          {loading ? '投稿中...' : '投稿'}
        </button>
      </div>
    </form>
  )
}

const styles = {
  form: {
    borderBottom: '1px solid #e5e5e5',
    padding: '16px',
  },
  textarea: {
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '18px',
    resize: 'none',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '12px',
    marginTop: '8px',
  },
  count: {
    fontSize: '13px',
    color: '#888',
  },
  button: {
    padding: '8px 20px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}
