import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { menuConfig } from "./routes/router";
import NotFound from "./pages/NotFound";
import RouteGuard from "./routes/routerGuard";
 

function AppContent() {
  return (
    <Routes>
      {menuConfig.map((v, k) => (
        <Route
          key={k}
          path={v.path}
          element={
            <RouteGuard guest={v.guest}>
              <v.component />
            </RouteGuard>
          }
        />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
