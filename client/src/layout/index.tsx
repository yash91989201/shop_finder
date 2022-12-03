import { Link } from "react-router-dom";

import { FaShopify } from "react-icons/fa";
import { BiLogOut, BiLogIn } from "react-icons/bi";
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
          <div className="flex items-center justify-between max-w-6xl px-6 mx-auto md:px-0">
            <div className="flex items-center space-x-3">
              <FaShopify className="text-4xl" />
              <p className="hidden text-xl font-semibold md:block">
                Shop Finder
              </p>
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
                        window.location.href = "/";
                      });
                    }}
                    className="p-3 py-1.5 bg-white rounded-full  text-indigo-500 text-base font-semibold"
                  >
                    <span className="hidden md:block">Logout</span>
                    <BiLogOut className="md:hidden" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-2 rounded-md md:p-3 md:py-1.5 bg-white md:rounded-full  text-indigo-500 text-base font-semibold"
                >
                  <span className="hidden md:inline">Seller Login</span>
                  <BiLogIn className="inline md:hidden" />
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
