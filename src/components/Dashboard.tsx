import React, { useState, useEffect } from 'react';
import { MapPin, Heart, Calendar, Clock, Phone, Mail, Users, Home, DollarSign } from 'lucide-react';

interface Institution {
  id: string;
  name: string;
  type: 'orphanage' | 'old-age-home';
  address: string;
  phone: string;
  email: string;
  capacity: number;
  currentResidents: number;
  distance: string;
  urgent: boolean;
}

const Dashboard: React.FC = () => {
  const [userLocation, setUserLocation] = useState<string>('');
  const [showMoneyDonation, setShowMoneyDonation] = useState(false);
  const [showFoodBooking, setShowFoodBooking] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  // Mock data for institutions
  const mockInstitutions: Institution[] = [
    {
      id: '1',
      name: 'Sunshine Orphanage',
      type: 'orphanage',
      address: '123 Hope Street, Downtown',
      phone: '+1 234-567-8901',
      email: 'contact@sunshineorphanage.org',
      capacity: 50,
      currentResidents: 42,
      distance: '2.3 km',
      urgent: true
    },
    {
      id: '2',
      name: 'Golden Years Senior Home',
      type: 'old-age-home',
      address: '456 Care Avenue, Midtown',
      phone: '+1 234-567-8902',
      email: 'info@goldenyears.org',
      capacity: 80,
      currentResidents: 67,
      distance: '3.1 km',
      urgent: false
    },
    {
      id: '3',
      name: 'Little Angels Home',
      type: 'orphanage',
      address: '789 Children Lane, Uptown',
      phone: '+1 234-567-8903',
      email: 'help@littleangels.org',
      capacity: 30,
      currentResidents: 28,
      distance: '4.2 km',
      urgent: true
    },
    {
      id: '4',
      name: 'Peaceful Haven Senior Care',
      type: 'old-age-home',
      address: '321 Serenity Road, Suburbs',
      phone: '+1 234-567-8904',
      email: 'contact@peacefulhaven.org',
      capacity: 60,
      currentResidents: 45,
      distance: '5.8 km',
      urgent: false
    }
  ];

  useEffect(() => {
    // Simulate location detection
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setUserLocation('Downtown, Your City');
          setInstitutions(mockInstitutions);
        },
        () => {
          setUserLocation('Location not available');
          setInstitutions(mockInstitutions);
        }
      );
    } else {
      setUserLocation('Location not supported');
      setInstitutions(mockInstitutions);
    }
  }, []);

  const handleDonateFood = (institution: Institution) => {
    setSelectedInstitution(institution);
    setShowFoodBooking(true);
  };

  const handleMoneyDonation = () => {
    setShowMoneyDonation(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                FoodBank Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{userLocation}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={handleMoneyDonation}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Donate Money
          </button>
          <button className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <Calendar className="w-5 h-5 mr-2" />
            View My Bookings
          </button>
        </div>

        {/* Institutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutions.map((institution) => (
            <div
              key={institution.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              {/* Institution Header */}
              <div className={`p-6 ${institution.type === 'orphanage' ? 'bg-gradient-to-r from-orange-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-teal-500'} text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {institution.type === 'orphanage' ? (
                      <Users className="w-6 h-6" />
                    ) : (
                      <Home className="w-6 h-6" />
                    )}
                    <span className="text-sm font-medium">
                      {institution.type === 'orphanage' ? 'Orphanage' : 'Senior Home'}
                    </span>
                  </div>
                  {institution.urgent && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      Urgent
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold">{institution.name}</h3>
                <p className="text-sm opacity-90">{institution.distance} away</p>
              </div>

              {/* Institution Details */}
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{institution.address}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">{institution.phone}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">{institution.email}</p>
                  </div>
                </div>

                {/* Capacity Info */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Capacity</span>
                    <span className="text-sm text-gray-600">
                      {institution.currentResidents}/{institution.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        institution.currentResidents / institution.capacity > 0.8
                          ? 'bg-red-500'
                          : institution.currentResidents / institution.capacity > 0.6
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{
                        width: `${(institution.currentResidents / institution.capacity) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleDonateFood(institution)}
                  className="w-full mt-4 bg-gradient-to-r from-orange-500 to-green-500 text-white py-3 rounded-xl hover:from-orange-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Donate Food & Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Money Donation Modal */}
      {showMoneyDonation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Donate Money</h2>
              <button
                onClick={() => setShowMoneyDonation(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount
                </label>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[10, 25, 50, 100, 250, 500].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donor Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your message to the orphanages..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Food Booking Modal */}
      {showFoodBooking && selectedInstitution && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Book Food Donation</h2>
              <button
                onClick={() => setShowFoodBooking(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">{selectedInstitution.name}</h3>
              <p className="text-sm text-gray-600">{selectedInstitution.address}</p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time Slot
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Morning (9:00 AM - 12:00 PM)</option>
                  <option>Afternoon (12:00 PM - 3:00 PM)</option>
                  <option>Evening (3:00 PM - 6:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Food Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Cooked Meals</option>
                  <option>Packaged Food</option>
                  <option>Fresh Groceries</option>
                  <option>Snacks & Beverages</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Quantity (Number of people)
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Any special requirements or notes..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-600 transition-all duration-300"
              >
                Book Donation Slot
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;