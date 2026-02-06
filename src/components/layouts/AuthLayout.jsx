export function AuthLayout({ children }) {
  return (
    <div className="bg-[var(--background)] flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md">
            {children}
        </div>
    </div>
  )
}

export default AuthLayout