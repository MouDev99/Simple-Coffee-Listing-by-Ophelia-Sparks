import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  return (
    <div className='relative flex justify-center'>
      <img src='../public/bg-cafe.jpg'/>
      <div className='rounded-md absolute top-20 pt-12 pb-3 px-9 bg-[#1B1D1F]'>
        <h1 className='text-white text-[32px] text-center'>Our Collection</h1>
        <p className='text-[#6F757C] text-center mx-auto max-w-lg'>
          Introducing our Coffee Collection, a selection of unique coffees from different roast types and origins, expertly roasted in small batches and shipped fresh weekly.
        </p>
        <ProductsNavigation />
      </div>
    </div>
  )
}

export default App


function ProductsNavigation() {
  const [activeTab, setActiveTab] = useState("All Products");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json")
    .then(response => response.json())
    .then(data => {
      if (activeTab === "All Products") setProducts(data);
      else if (activeTab === "Available Now") {
        setProducts(data.filter(productData => productData.available))
      }
    })
    .catch(error => {
      console.log(error)
    })
  }, [activeTab])

  return (
    <div className='w-fit mx-auto mt-2'>
        <div className='flex gap-5 mb-2 justify-center'>
          <button
            className={`text-white rounded-md px-3 py-1 ${activeTab === 'All Products' ? 'bg-[#6F757C]' : ''}`}
            onClick={() => setActiveTab("All Products")}
          >
            All Products
          </button>
          <button
            className={`text-white rounded-md px-3 py-1 ${activeTab === 'Available Now' ? 'bg-[#6F757C]' : ''}`}
            onClick={() => setActiveTab("Available Now")}
          >
            Available Now
          </button>
        </div>

        <div className='grid gap-x-5 gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '>
          {products.map( (data, i) => <ProductCard key={i} data={data} />)}
        </div>
    </div>
  )
}

function ProductCard({data}) {
  const {
    name,
    price,
    image,
    rating,
    votes,
    popular,
    available
  } = data;

  const RatingStar = rating ?
    <img src='../public/Star_fill.svg' /> :
    <img src='../public/Star.svg' />;

  const Popular = popular ?
    <p className='absolute top-2 left-2 px-2 rounded-lg bg-[#F6C768] text-[#111315] text-[12px] font-bold'>
      Popular
    </p> : null;

  const SoldOut = available ? null :
    <p className='text-[#ED735D]'>sold out</p>;

  return (
    <div className='relative mt-6'>
      <img src={image} alt='image' className='rounded-md' />
      <div className='flex justify-between mt-2'>
        <p>{name}</p>
        <p className='bg-[#BEE3CC] rounded-md px-2 text-[#111315]'>{price}</p>
      </div>
      <div className='flex justify-between items-center mt-1'>
        <div className='flex text-[12px] items-center mt-1'>
          {RatingStar}
          <p className='mx-1'>{rating}</p>
          <p className='text-[#6F757C]'>({votes} votes)</p>
        </div>
        {SoldOut}
      </div>
      {Popular}
    </div>
  )
}
