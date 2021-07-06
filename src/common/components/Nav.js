import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

const Nav = () => {
  const { user, error, isLoading } = useUser();

  return (
    <nav>
      {user ? (
        <div>
          <Link href="/owner">{user.name}</Link> <br></br>
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
    </nav>
  );
};

export default Nav;
