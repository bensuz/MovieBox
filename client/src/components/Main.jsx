import { Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import NewMovie from "./NewMovie";
import MovieDetails from "./MovieDetails";
import UpdateMovie from "./UpdateMovie";
import DiscoverDetails from "./DiscoverDetails";
import Register from "./Register";
import MyList from "./MyList";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Profile from "./Profile";
import Search from "./Search";
import SearchIcon from "./SearchIcon";

const Main = () => {
    return (
        <main className="min-h-screen">
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/movies/new" element={<NewMovie />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/movies/:id/update" element={<UpdateMovie />} />
                <Route
                    path="/movies/discover/:id"
                    element={<DiscoverDetails />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<SearchIcon />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/mylist" element={<MyList />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </main>
    );
};

export default Main;
