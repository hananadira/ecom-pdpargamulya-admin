import React, { useState, useEffect } from 'react';
import { GoBell } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setAuthUser , clearAuth } from '../redux/slice/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../redux/services/UserApi';
import { fetchSearchResults } from '../redux/services/SearchApi'; // Import fungsi pencarian

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { results, status } = useSelector((state) => state.search || {});
  const { data: userData, error: userError, isLoading: userLoading } = useGetUsersQuery();
  
  // Local state for dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // State for search
  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);

  // Get authentication status and user data from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Loading state
  if (userLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Error state
  if (userError) {
    console.error("Error fetching data:", userError);
    return <div className="text-center p-4 text-red-600">Terjadi kesalahan saat mengambil data.</div>;
  }

  // Handle logout
  const handleLogout = () => {
    dispatch(clearAuth());  // Clear user and token from Redux
    setDropdownOpen(false);  // Close dropdown
    navigate('/login');  // Redirect to login page
    console.log("User  logged out");
  };

  // If user data is available, display their username
  const userName = user?.email || userData?.[0]?.email;  // Fallback to first user from the API response if no user in Redux

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      dispatch(fetchSearchResults(query)); // Kirim query ke Redux
    }
  };

  return (
    <div className="flex justify-between items-center p-4">
      <div className="p-5">
        <h1 className="text-xs">Welcome Back</h1>
        <p className="text-xl font-semibold">{userName}</p>
      </div>
      <div className="flex items-center space-x-5">
        <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
        />
        {status === 'loading' && <p>Searching...</p>}
        {status === 'succeeded' && (
          <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-64">
            {Object.keys(results).map((key) => (
              results[key].map((item) => (
                <div key={item.id} className="p-2 hover:bg-indigo-100 cursor-pointer">
                  {key === 'orders' && `${item.username} - ${item.no_ref_order}`}
                  {key === 'products' && `${item.name_product} - ${item.description}`}
                  {key === 'users' && `${item.username} - ${item.email}`}
                  {key === 'shipping' && `${item.no_ref_order} - ${item.status}`}
                  {key === 'payment' && `${item.method}`}
                  {key === 'rekening' && `${item.payment_method}`}
                  {key === 'categories' && `${item.name_category}`}
                  {key === 'sections' && `${item.name_section}`}
                  {key === 'contents' && `${item.title}`}
                  {key === 'navbar' && `${item.page}`}
                </div>
              ))
            ))}
          </div>
        )}
        </div>
        <div className="flex items-center space-x-5 p-5">
          <div className="relative">
            <img 
              className="w-8 h-8 rounded-full border-2 border-indigo-400 cursor-pointer"   
              src={user?.image || "/img/logo.png"} 
              alt="User  Image" 
              onClick={() => setDropdownOpen(!dropdownOpen)}  // Toggle dropdown
            />
            {dropdownOpen && isAuthenticated && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border">
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;