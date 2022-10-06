import React, { useState } from 'react';
import Search_s from './Search_s';
import Shopping_cart_solid from './Shopping_cart_solid';

const Filter = ({ setFilterProducts, categories, products, setCartDb }) => {
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState({})
    const setFilterProductHandle = (e) => {
        const search = e.target.value;
        setCategory(search)
        const low = price?.low;
        const heigh = price?.heigh
        console.log((Object.keys(price)))
        const filter = products?.filter(d => {
            return (d.category == search) && (Object.keys(price).length ? (d.price >= low && d.price >= heigh) : true)
        })
        setFilterProducts(filter)
    }

    const priceFilterHandle = (e) => {
        const getPrice = e.target.value;
        const splitPrice = getPrice.split('-')

        const low = Number(splitPrice[0]?.trim()?.slice(1))
        const heigh = Number(splitPrice[1]?.trim()?.slice(1))
        const p = {
            low, heigh
        }
        setPrice(p)

        const filter = products?.filter(d => {
            return (category ? d.category == category : true) && (d.price >= low && d.price >= heigh)
        })
        setFilterProducts(filter)
    }

    const searchHandle = (e) => {
        e.preventDefault()
        const value = document.getElementById('searchForm').value.toLowerCase()
        console.log(value)
        const filter = products?.filter(d => {
            const title = d?.title?.toLowerCase()?.includes(value);
            const brand = d?.brand?.toLowerCase()?.includes(value);
            const category = d?.category?.toLowerCase()?.includes(value);
            const description = d?.description?.toLowerCase()?.includes(value);
            return (title || brand || category || description)
        })
        setFilterProducts(filter)
    }

    const showMyCartHandle = () => {
        const cartDb = JSON.parse(localStorage.getItem('cart'))
        setCartDb(cartDb ? cartDb : [])
       
        document.getElementById('MyCart').style.width = '100%'
    }
    return (
        <div className='m-4 mb-5 flex gap-5 items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <div>
                    <select name="" id="" onChange={setFilterProductHandle} className='select select-sm rounded-none border-gray-400'>

                        <optgroup label='Category' />
                        {
                            categories?.map((data, i) => <option key={i}>{data}</option>)
                        }
                    </select>
                </div>

                <div>
                    <select name="" id="" onChange={priceFilterHandle} className='select select-sm rounded-none border-gray-400'>
                        <optgroup label='Price' />
                        <option>$0 - $500</option>
                        <option>$501 - $1000</option>
                        <option>$1001 - $1500</option>
                        <option>$1501 - $2000</option>
                        <option>$2001 - $2500</option>

                    </select>
                </div>
                <div>
                    <button className='btn btn-sm rounded-none btn-primary text-white' onClick={() => {
                        setFilterProducts(products)
                        setPrice({})
                        setCategory('')
                    }}>
                        Reset
                    </button>
                </div>

            </div>
            <div className='flex items-center gap-2'>
                <form action="" onSubmit={searchHandle} className='flex items-center'>
                    <input
                        onChange={searchHandle}
                        type="text"
                        name='searchForm'
                        id='searchForm'
                        className="input input-sm bg-gray-200 rounded-none"
                    />
                    <button className="btn btn-sm text-white rounded-none btn-primary">
                        <Search_s size='16' />
                    </button>
                </form>
                <button className="btn btn-sm text-white rounded-none btn-primary" onClick={showMyCartHandle}>
                    My Cart  <Shopping_cart_solid size='20' strokeWidth='0.5' />
                </button>
            </div>

        </div>
    );

};

export default Filter;