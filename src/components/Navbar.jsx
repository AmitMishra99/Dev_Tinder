import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="bg-red-500 p-3 flex justify-between items-center">
      <h1 className="text-3xl ">DevTinder</h1>
      {user && (
        <div className="bg-amber-50 w-13 h-13 rounded-full flex items-center justify-center overflow-hidden ">
          <img
            className="w-full h-full object-cover object-top"
            src={user.img}
            alt="user_img"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
