import axios from 'axios';
import React, { useState } from 'react';
import Product_Listing from '../components/Home/Product_Listing';

const Index = ({ products, categories }) => {
  return (
    <div className='lg:m-10 xl:m-16'>
      <Product_Listing
        products={products?.products}
        categories={categories}
      />
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const url = "https://dummyjson.com/products?limit=1000&skip=0"
  const data = await (await fetch(url)).json()

  const categories = await axios.get('https://dummyjson.com/products/categories')

  return {
    props: { products: data, categories: categories?.data }, // will be passed to the page component as props
  }
}