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

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home></Home>
            </Layout>
          }
        ></Route>
        <Route
          path="/:fishId"
          element={
            <Layout>
              <Single></Single>
            </Layout>
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
            <Dashboard>
              <View></View>
            </Dashboard>
          }
        ></Route>
        <Route
          path="/admin/:fishId"
          element={
            <Dashboard>
              <Edit></Edit>
            </Dashboard>
          }
        ></Route>
        <Route
          path="/admin/create"
          element={
            <Dashboard>
              <Add></Add>
            </Dashboard>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
