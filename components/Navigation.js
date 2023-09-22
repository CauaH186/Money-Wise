'use client'
import { ImStatsBars } from "react-icons/im"
import { useContext } from "react"
import { authContext } from "@/lib/store/auth-context"

function Nav() {

  const { user, loading, logout } = useContext(authContext)

  return (
    <header className="container max-w-2xl px-4 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Information */}
        {user && !loading && (
          <div className="flex items-center gap-2">
            {/* Profile Picture */}
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden">

              {user.photoURL && (
                <img
                  className="object-cover w-full h-full"
                  src={user.photoURL}
                  alt={user.displayName} referrerPolicy="no-referrer" />
              )}

              {!user.photoURL &&(
              <img
                className="object-cover w-full h-full"
                alt="panda"
                src="https://images.pexels.com/photos/247480/pexels-photo-247480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              )}
            </div>

            {/* User Name */}
            {user.displayName && (
              <h1>Olá, {user.displayName}</h1>
            )}

            {!user.displayName && (
            <p>Olá, Usuário</p>
            )}
          </div>
        )}

        {/* Right side of Nav */}
        {user && !loading && (

          <nav className="flex items-center gap-4">
            <div>
              <ImStatsBars className="text-2xl" />
            </div>

            <div>
              <button onClick={logout} className="btn btn-danger">Sair</button>
            </div>

          </nav>
        )}
      </div>
    </header>
  )
}

export default Nav