import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignOut = () => {
  return (
    <form action="/api/auth/signout">
      <button type="submit">
        <FontAwesomeIcon icon={faSignOut} className="text-4xl" />
      </button>
    </form>
  );
};

export default SignOut;
