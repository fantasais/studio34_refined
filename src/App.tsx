import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ScrollProgressIndicator from "./components/ScrollProgressIndicator";
import HomePage from "./pages/HomePage";
import IdeologyPage from "./pages/IdeologyPage";
import WorkPage from "./pages/WorkPage";

const rootRoute = createRootRoute({
  component: () => (
    <div className="font-barlow">
      <ScrollProgressIndicator />
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const workRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/work",
  component: WorkPage,
});

const ideologyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ideology",
  component: IdeologyPage,
});

const routeTree = rootRoute.addChildren([homeRoute, workRoute, ideologyRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
