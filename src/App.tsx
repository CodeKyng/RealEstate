import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Subscribe from "./pages/Subscribe"
import  SignUp from "./pages/SignUp"
import  Login from "./pages/Login"

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        404
      </p>
      <h1 className="text-4xl font-bold">Page not found</h1>
      <Link
        to="/"
        className="rounded-full bg-primary px-5 py-2 text-primary-foreground"
      >
        Back to Home
      </Link>
    </main>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
