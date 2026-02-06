## Task List for onetwomuch

1. **Create AuthContext**
- [x] Create src/components/AuthContext.jsx
- [x] Set up user state and loading state
- [x] Check for existing session on mount
- [x] Set up auth state change listener
- [x] Provide user data to app

  **learn:**
- React.createContext()
- useContext() hook
- Supabase getSession() method
- Supabase onAuthStateChange() listener
- useEffect cleanup functions

---

2. **Create useAuth Hook**

- [x] Create src/hooks/useAuth.js (or export from AuthContext)
- [x] Wrap useContext(AuthContext) for easy access

**learn:**
- Custom hooks pattern
- When to use custom hooks

3. Wrap App in Provider
- [x]Update main.jsx
- [x] Wrap entire app in <AuthProvider>

**learn:**
- Component composition
- Provider pattern/wrapping

---

4. **Create Protected Route Component**

- [x] Create src/components/ProtectedRoute.jsx
- [x] Check if user exists
- [x] Redirect to /login if not
- [x] Show children if authenticated

**learn:**
- Navigate component from react-router-dom
- Conditional rendering
- Loading states

---

5. **Update Routes in App.jsx**
- [] Wrap protected routes with ProtectedRoute component
- [] Keep /login and /sign-up public

**learn:**
- Route composition
- Public vs protected routes

---

6. **Add Logout Functionality**
- [] Add logout button (maybe in sidebar?)
- [] Use signOut() from useAuth
- [] Redirect after logout

**learn:**
- Supabase signOut() method
- Navigation after logout

7. **Test Everything**
- [] Try accessing / while logged out → should redirect to login
- [] Login → should access protected pages
- [] Logout → should redirect to login
- [] Add task while logged in → should work!