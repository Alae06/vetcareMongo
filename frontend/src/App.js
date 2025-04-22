import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import OwnersList from './pages/owners/OwnersList';
import OwnerDetails from './pages/owners/OwnerDetails';
import OwnerForm from './pages/owners/OwnerForm';
import PetsList from './pages/pets/PetsList';
import PetDetails from './pages/pets/PetDetails';
import PetForm from './pages/pets/PetForm';
import VisitsList from './pages/visits/VisitsList';
import VisitDetails from './pages/visits/VisitDetails';
import VisitForm from './pages/visits/VisitForm';
import VetsList from './pages/vets/VetsList';
import VetDetails from './pages/vets/VetDetails';
import VetForm from './pages/vets/VetForm';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container mt-4 mb-5">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          
          {/* Owner Routes */}
          <Route path="/owners" element={<OwnersList />} />
          <Route path="/owners/add" element={<OwnerForm />} />
          <Route path="/owners/edit/:id" element={<OwnerForm />} />
          <Route path="/owners/:id" element={<OwnerDetails />} />
          
          {/* Pet Routes */}
          <Route path="/pets" element={<PetsList />} />
          <Route path="/pets/add" element={<PetForm />} />
          <Route path="/pets/add/:ownerId" element={<PetForm />} />
          <Route path="/pets/edit/:id" element={<PetForm />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          
          {/* Visit Routes */}
          <Route path="/visits" element={<VisitsList />} />
          <Route path="/visits/add" element={<VisitForm />} />
          <Route path="/visits/add/:petId" element={<VisitForm />} />
          <Route path="/visits/edit/:id" element={<VisitForm />} />
          <Route path="/visits/:id" element={<VisitDetails />} />
          
          {/* Veterinarian Routes */}
          <Route path="/vets" element={<VetsList />} />
          <Route path="/vets/add" element={<VetForm />} />
          <Route path="/vets/edit/:id" element={<VetForm />} />
          <Route path="/vets/:id" element={<VetDetails />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App; 