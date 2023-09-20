import { ImStatsBars } from "react-icons/im"

function Nav() {
  return (
    <header className="container max-w-2xl px-4 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Information */}
        <div className="flex items-center gap-2">
          {/* Profile Picture */}
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src="https://thispersondoesnotexist.com"
              alt="Profile-Image" />
          </div>
          {/* User Name */}
          <h1>Olá, Caua</h1>
        </div>

        {/* Right side of Nav */}
        <nav className="flex items-center gap-4">
          <div>
            <ImStatsBars className="text-2xl" />
          </div>

          <div>
            <button className="btn btn-danger">Sair</button>
          </div>

        </nav>
      </div>
    </header>
  )
}

export default Nav