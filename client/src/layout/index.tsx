import { Link } from "react-router-dom";

import { FaShopify } from "react-icons/fa";
import {
  useCheckAuthStatusQuery,
  useLogoutUserMutation,
} from "../features/auth/authApi";

function linkStyling(matcher: string): string {
  return window.location.pathname.startsWith(matcher)
    ? "text-orange-500"
    : "text-white";
}

export default function Layout({ children }: { children: React.ReactElement }) {
  const { data, refetch } = useCheckAuthStatusQuery("");
  const [logoutUser] = useLogoutUserMutation();
  const is_auth_route =
    window.location.pathname.startsWith("/login") ||
    window.location.pathname.startsWith("/signup");
  return (
    <>
      {!is_auth_route && (
        <header className="p-3 text-white bg-indigo-500 lg:px-0">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-3">
              <FaShopify className="text-4xl" />
              <p className="text-xl font-semibold">Shop Finder</p>
            </div>
            <div>
              {!!data && data.isAuthenticated ? (
                <div className="flex items-center space-x-6">
                  <div>
                    <Link to="/" className="p-2 text-base font-semibold">
                      All Shops
                    </Link>
                    <Link
                      to="/my-shops"
                      className={`p-2 text-base font-semibold ${linkStyling(
                        "/my-shops"
                      )}`}
                    >
                      My Shops
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      logoutUser("").then((res) => {
                        refetch();
                        // navigate("/");
                        // window.location.reload();
                        window.location.href = "/";
                      });
                    }}
                    className="p-3 py-1.5 bg-white rounded-full  text-indigo-500 text-base font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-3 py-1.5 bg-white rounded-full  text-indigo-500 text-base font-semibold"
                >
                  Seller Login
                </Link>
              )}
            </div>
          </div>
        </header>
      )}
      <main className="max-w-6xl py-6 mx-auto space-y-3">{children}</main>
    </>
  );
}
