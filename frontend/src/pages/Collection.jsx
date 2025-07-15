// Import necessary libraries and components
import React, { useContext, useEffect, useState } from 'react'; // React and its hooks
import { ShopContext } from '../context/ShopContext'; // Context to fetch products data
import { assets } from '../assets/assets'; // Importing assets like icons
import Title from '../components/Title'; // Component to render the title
import ProductItems from "../components/ProductItems"; // Component to render individual product items

function Collection() {
  // Fetch the 'products' array from the ShopContext
  const { products } = useContext(ShopContext);
  const {showSearch , setShowSearch} = useContext(ShopContext);
  const {search , setSearch} = useContext(ShopContext)

  // State variables
  const [showFilter, setShowFilter] = useState(false); // To toggle the visibility of the filter menu
  const [filterProducts, setFilterProducts] = useState([]); // To store filtered products
  const [category, setCategory] = useState([]); // To store selected categories
  const [subCategory, setSubCategory] = useState([]); // To store selected subcategories
  const [sortType, setSortType] = useState("relavent"); // To store the selected sorting type

  // Toggle function for adding/removing categories from the filter
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      // Remove the category if it's already selected
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      // Add the category if it's not selected
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  // Toggle function for adding/removing subcategories from the filter
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      // Remove the subcategory if it's already selected
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      // Add the subcategory if it's not selected
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  // Function to filter products based on selected categories and subcategories
  const applyFilter = () => {
    let productCopy = products.slice(); // Create a copy of the products array

    if(showSearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }


    if (category.length > 0) {
      // Filter products by selected categories
      productCopy = productCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      // Further filter products by selected subcategories
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productCopy); // Update the filtered products
  };

  // Function to sort products based on the selected sorting type
  const sortProduct = () => {
    let fpcopy = filterProducts.slice(); // Create a copy of the filtered products

    switch (sortType) {
      case "low-high":
        // Sort products by price in ascending order
        setFilterProducts(fpcopy.sort((a, b) => (a.price - b.price)));
        break;

      case "high-low":
        // Sort products by price in descending order
        setFilterProducts(fpcopy.sort((a, b) => (b.price - a.price)));
        break;

      default: 
        // Default case: apply the existing filter without sorting
        applyFilter();
    }
  };

  // Apply filters whenever the category or subcategory selection changes
  useEffect(() => {
    applyFilter();
  }, [category, subCategory,search,showSearch,products]);

  // Sort products whenever the sorting type changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter options section */}
      <div className='min-w-60'>
        <p 
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => { setShowFilter(!showFilter); }}
        >
          FILTERS
          <img 
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} 
            src={assets.dropdown_icon} 
            alt="" 
          />
        </p>
        
        {/* Categories filter */}
        <div className={`border border-gray-300 pl-5 py-5 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={(e) => { toggleCategory(e); }} value={"Men"} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={(e) => { toggleCategory(e); }} value={"Women"} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={(e) => { toggleCategory(e); }} value={"Kids"} /> Kids
            </p>
          </div>
        </div>

        {/* Subcategories filter */}
        <div className={`border border-gray-300 pl-5 py-5 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Topwear"} onChange={(e) => { toggleSubCategory(e); }} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Bottomwear"} onChange={(e) => { toggleSubCategory(e); }} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Winterwear"} onChange={(e) => { toggleSubCategory(e); }} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Products display section */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'> 
          {/* Display the title */}
          <Title text1={"ALL"} text2={"COLLECTION"} />

          {/* Sorting options */}
          <select 
            onChange={(e) => { setSortType(e.target.value); }} 
            className='border-2 border-gray-300 text-sm px-2'
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Display the filtered and sorted products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItems 
                key={index} 
                id={item._id} 
                image={item.image} 
                name={item.name} 
                price={item.price} 
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Collection;
