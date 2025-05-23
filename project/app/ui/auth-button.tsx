import { auth, signIn, signOut } from "@/auth"
import { prisma } from '@/app/lib/prisma';
import { User } from '@/interfaces/User';

async function handleUserAuthentication(user: User | undefined) {
  if (user?.email) {
    try {
      const findUser = await prisma.users.findUnique({
        where: {
          email: user?.email
        }
      });

      if (!findUser) {
        await prisma.users.create({
          data: {
            email: user.email
          }
        });
      }
    } catch (error) {
      console.error("Error handling user authentication:", error);
    }
  }
}

export default async function AuthButton({ is_mobile }: { is_mobile: boolean }) {
  const session = await auth();
  const user = session?.user;

  await handleUserAuthentication(user);
  const isAuthenticated = Boolean(user);
  const handleClick = async () => {
    "use server";
    if (isAuthenticated) {
      await signOut();
    } else {
      await signIn("google");
    }
  };

  return (
    <div className={`${is_mobile ? "flex justify-between items-center border-t-2 pt-2" : "hidden sm:flex"}`}>
      <div className={`${is_mobile ? "" : "relative"}`}>
        <button
          type="submit"
          onClick={handleClick}
          className={`text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-sky-700 hover:border-sky-700 ${
            isAuthenticated ? "bg-red-100" : ""
          }`}
        >
          {isAuthenticated ? "Se déconnecter" : "Se connecter / S'inscrire"}
        </button>
      </div>
    </div>
  );
};