import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './common/Navbar.jsx';
import { allRoles, ProtectedCredentials, ProtectedRoute } from './Routes/ProtectedRoute.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import the components that will be rendered based on the current location
import Login from './Components/Credentials/Login/Login.jsx';
import Register from './Components/Credentials/Register/Register.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import Home from './Components/Home/Home.jsx';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthProvider.jsx';
import axios from './API/axios.js';
import CPanelHome from './Components/CPanel/CPanelHome.jsx';
import UsersControl from './Components/CPanel/Controls/UsersControl';
import SplashScreen from './common/SplashScreen.jsx';
import CategoriesControl from './Components/CPanel/Controls/CategoriesControl';
import ProductsControl from './Components/CPanel/Controls/ProductsControl';
import FormPage from './common/FormPage.jsx';
import WishlistPage from './Components/Wishlist/Wishlist';



function App() {  

  const contextValue = useContext(AuthContext);
  const { auth, setAuth } = contextValue || {}
  const [loading, setLoading] = useState(true)

  const validateUser = async () => {
    try {
      const response = await axios.get("/users/profile");
      if (response.data?.data?.user) {
        setAuth(response.data.data.user)
      } else {
        setAuth(null)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const res = await axios.get("/users/logout");
      setAuth(null)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    validateUser()
  }, [])


  return <>
    {loading ? <SplashScreen /> : <div className="App text-gray-900 dark:text-gray-50">
      <BrowserRouter>
        <Navbar logout={logout} />  {/* Navbar with NavLinks */}
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='login' element={<ProtectedCredentials> <Login validateUser={validateUser} /> </ProtectedCredentials>} />
          <Route path='register' element={<ProtectedCredentials> <Register /> </ProtectedCredentials>} />

          <Route path='cpanel'>
            <Route
              index
              element={<ProtectedRoute> <CPanelHome /></ProtectedRoute>}
            />
            <Route
              path="users"
            >
              <Route
                index
                element={<ProtectedRoute roles={[allRoles.A, allRoles.SA]}> <UsersControl /></ProtectedRoute>}
              />
              <Route
                path="add"
                element={<ProtectedRoute roles={[allRoles.SA]}> <FormPage /></ProtectedRoute>}
              />
              <Route
                path="*"
                element={<Navigate to="/404" />}
              />

            </Route>
            <Route
              path="categories"
            >
              <Route
                index
                element={<ProtectedRoute roles={[allRoles.A, allRoles.SA]}> <CategoriesControl /></ProtectedRoute>}
              />
              <Route
                path="add"
                element={<ProtectedRoute roles={[allRoles.A, allRoles.SA]}> <FormPage /></ProtectedRoute>}
              />
              <Route
                path="*"
                element={<Navigate to="/404" />}
              />

            </Route>
            <Route
              path="products"
            >
              <Route
                index
                element={<ProtectedRoute roles={[allRoles.A, allRoles.SA, allRoles.U]}> <ProductsControl /></ProtectedRoute>}
              />
              <Route
                path="add"
                element={<ProtectedRoute roles={[allRoles.U]}> <FormPage /></ProtectedRoute>}
              />
              <Route
                path="*"
                element={<Navigate to="/404" />}
              />

            </Route>
            <Route
              path="*"
              element={<Navigate to="/404" />}
            />
          </Route>

          <Route
            path='wishlist'
            element={<ProtectedRoute roles={[allRoles.U]}> <WishlistPage /></ProtectedRoute>}
          />

          {/* <Route path='profile' element={<Profile crrUser={crrUser} currentUser={currentUser} />} >
            <Route
              index
              element={<Info />}
            />
            <Route
              path="info/:id"
              element={<Info />}
            />
            <Route
              path="info"
              element={<Info />}
            />
            <Route
              path="wishlist"
              element={<Wishlist />}
            />
            <Route
              path="activity"
              element={<Activity />}
            />
            <Route
              path="following"
              element={<Followers crrUser={crrUser} />}
            />
            <Route
              path="games"
              element={<Games />}
            />
          </Route> */}
          {/* <Route path='details/:slug/:id' element={<Details currentUser={crrUser} getCart={getCart} cart={cart} />} /> */}

          <Route path='404' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/404' />} />

        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        stacked
        theme='dark'
      />
    </div>}
  </>
}

export default App;
