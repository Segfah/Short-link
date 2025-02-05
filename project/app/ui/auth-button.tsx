
import { auth, signIn, signOut } from "@/auth"
 
export default async function AuthButton({ is_mobile }: { is_mobile: boolean }) {
  const session = await auth();
  const user = session?.user;

  return user ?
  (
    <>
      <div className={`${is_mobile ? "flex justify-between items-center border-t-2 pt-2" : "hidden sm:flex"}`}>
        <div className={`${is_mobile ? "" : "relative"}`}>	
          <button type="submit" onClick={async () => {
            "use server"
            await signOut()
          }} className="bg-red-100 text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-sky-700 hover:border-sky-700">
            Se deconnecter
          </button>
        </div>
      </div>
    </>
  )
  :
  (
    <>
      <div className={`${is_mobile ? "flex justify-between items-center border-t-2 pt-2" : "hidden sm:flex"}`}>
        <div className={`${is_mobile ? "" : "relative"}`}>
          <button type="submit" onClick={async () => {
            "use server"
            await signIn("google")
          }} className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-sky-700 hover:border-sky-700">
            Se connecter / S'inscrire
          </button>
        </div>
      </div>
    </>
  )
} 
