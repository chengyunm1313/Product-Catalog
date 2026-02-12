/**
 * Firebase Auth Session 管理
 * Client 端的認證狀態管理
 */

'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import type { UserRole } from '@/types'

interface AuthState {
  user: User | null
  role: UserRole | null
  loading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getIdToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | null>(null)

/** Auth Provider */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 取得 Custom Claims 中的角色
        const tokenResult = await user.getIdTokenResult()
        const role = (tokenResult.claims.role as UserRole) || 'viewer'
        setState({ user, role, loading: false, error: null })
      } else {
        setState({ user: null, role: null, loading: false, error: null })
      }
    })

    return () => unsubscribe()
  }, [])

  /** 登入 */
  const signIn = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : '登入失敗',
      }))
      throw err
    }
  }

  /** 登出 */
  const signOut = async () => {
    await firebaseSignOut(auth)
    setState({ user: null, role: null, loading: false, error: null })
  }

  /** 取得 ID Token */
  const getIdToken = async (): Promise<string | null> => {
    if (!state.user) return null
    return state.user.getIdToken()
  }

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut, getIdToken }}>
      {children}
    </AuthContext.Provider>
  )
}

/** 使用 Auth Context */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必須在 AuthProvider 內使用')
  }
  return context
}
