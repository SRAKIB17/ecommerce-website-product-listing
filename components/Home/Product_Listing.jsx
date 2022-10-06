import React, { useState } from 'react';
import Filter from './Filter';
import MyCartHome from './MyCartHome';
import Product from './Product';

const Product_Listing = ({ categories, products }) => {
    const [filterProducts, setFilterProducts] = useState(products)
    const closeMyCart = () => {
        document.getElementById('MyCart').style.width = '0%'
    }

    const [cartDb, setCartDb] = useState([]);

    return (
        <div>
            <Filter setFilterProducts={setFilterProducts} categories={categories} products={products} setCartDb={setCartDb} />
            <div className="overflow-x-auto w-full">
                <table className="table  w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Buy</th>
                            <th>

                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            filterProducts?.map((product, index) => <Product product={product} key={index} />)
                        }
                    </tbody>
                    {/* <!-- foot -->
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot> */}

                </table>
            </div>

            <div id='MyCart' className='bg-base-100'>
                <button className='btn bg-red-500 hover:bg-red-400 text-white btn-sm rounded-full absolute right-20 top-5' onClick={closeMyCart}>
                    x
                </button>
                <div className='h-full overflow-auto'>
                    <MyCartHome cartDb={cartDb} setCartDb={setCartDb} />
                </div>
            </div>
        </div>
    );
};

export default Product_Listing;