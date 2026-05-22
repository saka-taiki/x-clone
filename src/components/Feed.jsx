import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Feed({ refresh }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [refresh])

  if (loading) return <p style={styles.message}>読み込み中...</p>
  if (posts.length === 0) return <p style={styles.message}>まだ投稿がありません</p>

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} style={styles.post}>
          <div style={styles.avatar}>
            {post.user_id.slice(0, 1).toUpperCase()}
          </div>
          <div style={styles.body}>
            <span style={styles.userId}>{post.user_id.slice(0, 8)}...</span>
            <p style={styles.content}>{post.content}</p>
            <span style={styles.time}>
              {new Date(post.created_at).toLocaleString('ja-JP')}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  message: {
    textAlign: 'center',
    color: '#888',
    padding: '32px',
  },
  post: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    borderBottom: '1px solid #e5e5e5',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  body: {
    flex: 1,
  },
  userId: {
    fontSize: '13px',
    color: '#888',
    fontFamily: 'monospace',
  },
  content: {
    margin: '4px 0 6px',
    fontSize: '15px',
    lineHeight: '1.5',
    fontFamily: 'sans-serif',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  time: {
    fontSize: '13px',
    color: '#888',
  },
}
