import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// lazy lazy(() => ...) — wraps that dynamic import so React knows how to handle it: render nothing (or a fallback) until the chunk finishes downloading, then render the real component once it resolves.

const Home = lazy(() => import('./components/Home'));
const Properties = lazy(() => import('./components/properties/Properties'));
const MoreInfoOnProperties = lazy(() => import('./components/properties/MoreInfoOnProperties'));
const Aruna = lazy(() => import('./components/Aruna'));
const Fa = lazy(() => import('./components/Fa'));
const Gallery = lazy(() => import('./components/Gallery'));
const ArunaResidence = lazy(() => import('./components/properties/ArunaResidence'));
const Preview360 = lazy(() => import('./components/properties/Preview360'));
const ErrorPage = lazy(() => import('./components/Error'));
const FacultyandAmenities = lazy(() => import('./components/FacutyandAmenities'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const GalleryWithFaqs = lazy(() => import('./components/GalleryWithFaqs'));
const RequestTourModal = lazy(() => import('./components/RequestTourModal'));
const AuthFlow = lazy(() => import('./components/AuthFlow'));
const Dashboard = lazy(() => import('./components/Dashboard'));
import DashboardPopup from './components/DashboardPopup';
import BrochureRequestModal from './components/RequestBrochure';

function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={<div className="min-h-screen p-10 text-lg">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/amenities" element={<Fa />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<div className="min-h-screen p-10 text-xl">Blog coming soon.</div>} />
            <Route path="/MoreInfoOnProperties" element={<MoreInfoOnProperties />} />
            <Route path="/Aruna" element={<Aruna />} />
            <Route path="/ArunaResidence" element={<ArunaResidence />} />
            <Route path="/Preview360" element={<Preview360 />} />
            <Route path="/FacultyandAmenities" element={<FacultyandAmenities />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/GalleryWithFaqs" element={<GalleryWithFaqs />} />
            <Route path="/RequestTourModal" element={<RequestTourModal open={true} onClose={() => {}} />} />
            <Route path="/AuthFlow" element={<AuthFlow />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/DashboardPopup" element={<DashboardPopup open={true} onClose={() => {}} />} />
            <Route path="/RequestBrochureModal" element={<BrochureRequestModal open={true} onClose={() => {}} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App;