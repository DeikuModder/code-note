import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignOut = () => {
  return (
    <form action="/api/auth/signout">
      <button type="submit" className="flex items-center text-2xl gap-2 mb-4">
        Logout <FontAwesomeIcon icon={faSignOut} />
      </button>
    </form>
  );
};

export default SignOut;
