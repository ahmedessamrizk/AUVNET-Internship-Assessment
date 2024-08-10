import React from "react";
import {
    Navigate,
    Route,
    Router,
    RouterProvider,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

// Import the components that will be rendered based on the current location
import NotFound from './../Components/NotFound/NotFound';
import { ProtectedCredentials } from "./ProtectedRoute.jsx";
import Login from "../Components/Credentials/Login/Login.jsx";
import Register from "../Components/Credentials/Register/Register.jsx";
import Home from './../Components/Home/Home';


const AppRoutes = () => {
    <Routes>
        <Route path='' element={<Home />} />
        <Route path='login' element={<ProtectedCredentials> <Login /> </ProtectedCredentials>} />
        <Route path='register' element={<ProtectedCredentials> <Register /> </ProtectedCredentials>} />

        {/* <Route path='cpanel' element={<CPanel removeUser={removeUser} />}>
                        <Route
                            index
                            element={<CPNav />}
                        />
                        <Route
                            path="games"
                            element={<GameControl />}
                        />
                        <Route
                            path="users"
                            element={<UserControl />}
                        />
                        <Route
                            path="genres"
                            element={<GenreControl />}
                        />
                        <Route
                            path="support"
                            element={<MySupport />}
                        />
                        <Route
                            path="*"
                            element={<Navigate to="/404" />}
                        />
                    </Route> */}

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
};

export default AppRoutes;
