import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Dashboard from "./layouts/Dashboard";
import Add from "./pages/admin/Add";
import View from "./pages/admin/View";
import Edit from "./pages/admin/Edit";
import NotFound from "./pages/NotFound";
import UserPage from "./authorization/UserPage";
import AdminPage from "./authorization/AdminPage";
import Order from "./pages/Order";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <UserPage>
              <Layout>
                <Home></Home>
              </Layout>
            </UserPage>
          }
        ></Route>
        <Route
          path="/:fishId"
          element={
            <UserPage>
              <Layout>
                <Single></Single>
              </Layout>
            </UserPage>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Layout>
              <Register></Register>
            </Layout>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Layout>
              <Login></Login>
            </Layout>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <AdminPage>
              <Dashboard>
                <View></View>
              </Dashboard>
            </AdminPage>
          }
        ></Route>
        <Route
          path="/admin/:fishId"
          element={
            <AdminPage>
              <Dashboard>
                <Edit></Edit>
              </Dashboard>
            </AdminPage>
          }
        ></Route>
        <Route
          path="/admin/create"
          element={
            <AdminPage>
              <Dashboard>
                <Add></Add>
              </Dashboard>
            </AdminPage>
          }
        ></Route>
        <Route
          path="/orders"
          element={
            <UserPage>
              <Layout>
                <Orders></Orders>
              </Layout>
            </UserPage>
          }
        ></Route>

        <Route
          path="/order/:orderId"
          element={
            <UserPage>
              <Layout>
                <Order></Order>
              </Layout>
            </UserPage>
          }
        ></Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
