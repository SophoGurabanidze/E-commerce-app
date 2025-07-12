import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetAllProductNamesQuery } from '../features/product/productApi';
import { useDebounce } from 'use-debounce';

const NavbarSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 400);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const { data: allProductNames = [], isLoading } = useGetAllProductNamesQuery();

  const wrapperRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = allProductNames.filter((name) =>
    name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setShowDropdown(false);
      setQuery('');
    }
  };

  const handleSelect = (name: string) => {
    navigate(`/search?query=${encodeURIComponent(name)}`);
    setShowDropdown(false);
    setQuery('');
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative w-full">
        {/* Search Icon */}
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search for anything..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          className="w-full border border-gray-300 rounded-full pl-10 pr-10 py-2 bg-white text-sm focus:outline-none"
        />

        {/* Clear X */}
        {query && (
          <X
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => {
              setQuery('');
              setShowDropdown(false);
            }}
          />
        )}
      </form>

      {/* Suggestions */}
      {showDropdown && debouncedQuery && (
        <div className="absolute z-50 bg-white border w-full mt-1 rounded shadow max-h-60 overflow-y-auto">
          {isLoading ? (
            <p className="px-3 py-2 text-gray-500">Loading...</p>
          ) : filteredSuggestions.length > 0 ? (
            filteredSuggestions.slice(0, 5).map((name) => (
              <button
                key={name}
                onClick={() => handleSelect(name)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                {name}
              </button>
            ))
          ) : (
            <p className="px-3 py-2 text-gray-500">No suggestions found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
