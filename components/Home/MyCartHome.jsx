/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const MyCartHome = ({ cartDb, setCartDb }) => {
    // const [total, setTotal] = useState(1);
    let subTotal = 0
    let total = 0
    if (typeof cartDb?.forEach == 'function') {
        cartDb?.forEach(d => {
            const price = Number(d.price) * parseInt(d.quantity)
            // setTotal(total + price)
            total += price
            subTotal += price
        })
    }


    const router = useRouter()
    return (
        <div>
            <div className="overflow-x-auto w-full grid grid-cols-12">
                <table className="table w-full col-span-8">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            typeof cartDb?.forEach == 'function' && cartDb?.map((cart, index) => <CartDetails key={index} cart={cart} cartDb={cartDb} setCartDb={setCartDb} index={index} />)
                        }
                    </tbody>
                </table>
                <div className='col-span-3 ml-6'>
                    <div>
                        <h1 className='font-bold'>Cart Totals:</h1>
                    </div>
                    <table className='table w-full'>
                        <tbody>
                            <tr>
                                <td>
                                    Subtotal:
                                </td>
                                <td>
                                    {
                                        subTotal
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className='font-bold'>
                                    Total:
                                </td>
                                <td>
                                    {
                                        total
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='btn btn-sm w-full bg-[#1246AF] hover:bg-[#2e6ae2]' onClick={() => router.replace('/welcome')}>
                        Proceed to pay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyCartHome;

const CartDetails = ({ cart, setCartDb, cartDb, index }) => {

    const { product, quantity, price, thumbnail, product_id } = cart

    const deleteProduct = (id) => {
        const filter = cartDb.filter(d => d.product_id != id)
        setCartDb(filter)
        localStorage.setItem('cart', JSON.stringify(filter))
    }

    const increaseQuantityDecrease = (method, id) => {
        const find = cartDb?.find(d => d.product_id == id)
        if (method == 'd') {
            const newQ = parseInt(find.quantity) > 0 ? (parseInt(find.quantity) - 1) : parseInt(find.quantity)
            find.quantity = newQ;
            const cart = cartDb;
            cart[index] = find;
            setCartDb(cart)
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
            const newQ = parseInt(find.quantity) + 1;
            find.quantity = newQ;
            const cart = cartDb;
            cart[index] = find;
            setCartDb(cart)
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    return (
        <tr>
            <th>
                <button className='btn btn-ghost' onClick={() => deleteProduct(product_id)}>
                    X
                </button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className=" rounded-md w-12 h-12">
                            <img src={thumbnail} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                    </div>
                </div>
            </td>
            <td className='font-bold'>
                ${price}
            </td>
            <td>
                <div className='flex items-center border  border-gray-500 w-fit rounded-3xl'>
                    <button className='btn btn-ghost rounded-none rounded-l-3xl' onClick={() => increaseQuantityDecrease('d', product_id)}>
                        -
                    </button>
                    <p className='p-2'>
                        {quantity}
                    </p>
                    <button className='btn btn-ghost rounded-none rounded-r-3xl ' onClick={() => increaseQuantityDecrease('i', product_id)}>
                        +
                    </button>
                </div>
            </td>
            <th>
                ${parseInt(quantity) * Number(price)}
            </th>
        </tr>
    )

}