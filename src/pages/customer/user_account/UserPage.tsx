import { Navigate, Outlet } from "react-router-dom";
import NavButton from "./NavButton";
import { useAppContext } from "@context/AppContext";
import { customerLogout } from "@api" 
import { useMutation } from "@tanstack/react-query";
import { APIProvider } from '@vis.gl/react-google-maps';

export default () => {
  const { state, setState } = useAppContext();

  const userLogoutMutation = useMutation({
    mutationFn: (token) => customerLogout(token),
    onSuccess: (resp) => {
      setState({
        token: null,
        user: null
      })
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const handleLogout = () => {
    userLogoutMutation.mutate(state.token)
  }

  if (state.token == null) {
    return <Navigate to="/auth/customer" replace />
  }

  return (
    <>
      <div className="p-8">
        <div className="nav-title pb-5">
          <h1 className="text-primary text-6xl font-bold">My Account</h1>
        </div>
        <div className="flex gap-3">
          <nav style={{ width: "300px" }}>
            <ul className="flex flex-col">
              <NavButton to="profile">Profile</NavButton>
              <NavButton to="delivery-addresses">Addresses</NavButton>
              <NavButton to="change-password">Change Password</NavButton>
              <NavButton to="orders">Order List</NavButton>
              <NavButton to="wishlist">Wishlist</NavButton>
              <NavButton to="chats">Chats</NavButton>
              <li>
                <button
                  className="px-4 py-2 rounded font-semibold transition-colors duration-200 bg-red-500 text-white hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <div className="w-full user-details">
            <APIProvider
              apiKey={"AIzaSyCgSCMZFzvmUGXGCp1dBJHnSOU1iRBmyDY"}
              onLoad={() => console.log('Maps API has loaded.')}
            >
              <Outlet />
            </APIProvider>
          </div>
        </div>
      </div>
    </>
  );
}