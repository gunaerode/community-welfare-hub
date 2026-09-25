import { createHashRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AdminPage from "../pages/AdminPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import JoinMemberPage from "../pages/JoinMemberPage";
import MemberProfilePage from "../pages/MemberProfilePage";
import MembersPage from "../pages/MembersPage";
import NotFoundPage from "../pages/NotFoundPage";
import RulesPage from "../pages/RulesPage";

/**
 * HashRouter is used instead of BrowserRouter so client-side routes work
 * reliably on GitHub Pages without server-side rewrite configuration.
 */
export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/members", element: <MembersPage /> },
      { path: "/members/join", element: <JoinMemberPage /> },
      { path: "/members/:memberId", element: <MemberProfilePage /> },
      { path: "/rules", element: <RulesPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/admin", element: <AdminPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
