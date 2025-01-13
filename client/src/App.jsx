import { useSelector } from "react-redux";
import { Footer, NavigationBar } from "./components";
import { 
  Outlet, 
  Navigate, 
  Route, 
  Routes, 
  useLocation 
} from "react-router-dom";
import {
  About,
  AuthenticationPage,
  Companies,
  CompanyProfile,
  FindJobs,
  JobDetail,
  UploadJob,
  UserProfile,
} from "./pages";

/** Creates a function that checks user authentication *
 * if the user is authenticated, sends to Outlet       *
 * if not, sends to Authentication page                */

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/user-auth' state={{ from: location }} replace />
  );
}

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <main className='bg-[#f7fdfd]'>
      <NavigationBar />
      <Routes>
        <Route 
          element={<Layout />}
        >
          <Route
            path='/'
            element={
              <Navigate to='/find-jobs' replace={true} />
            }
          />

          <Route 
            path='/find-jobs' 
            element={<FindJobs />} 
          />

          <Route 
            path='/companies' 
            element={<Companies/>} 
          />

          <Route
            path={
              user?.user?.accountType === "seeker"
                ? "/user-profile"
                : "/user-profile/:id"
            }
            element={<UserProfile />}
          />

          <Route 
            path={"/company-profile"} 
            element={<CompanyProfile />} 
          />

          <Route 
            path={"/company-profile/:id"} 
            element={<CompanyProfile />} 
          />

          <Route 
            path={"/upload-job"} 
            element={<UploadJob />} 
          />

          <Route 
            path={"/job-detail/:id"} 
            element={<JobDetail />}
          />
        </Route>
        <Route 
          path='/about-us' 
          element={<About />} 
        />

        <Route 
          path='/user-auth' 
          element={<AuthenticationPage />} 
        />
      </Routes>
    {/** Only shows footer if user exists */}
      {user && <Footer />}
    </main>
  );
}

export default App;