/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Shopping_cart_solid from './Shopping_cart_solid';

const Product = ({ product }) => {
    const { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = product

    const AddToCartHandle = (e, { product, price, id, thumbnail }) => {
        e.preventDefault();
        const cart = {
            product: product,
            price: price,
            quantity: e.target.quantity.value,
            product_id: id,
            thumbnail: thumbnail
        }
        const cartDb = JSON.parse(localStorage.getItem('cart'))
        if (cartDb) {
            const filterCart = cartDb?.filter(i => i.product_id != cart?.product_id)
            const findCart = cartDb?.find(i => i.product_id == cart?.product_id)
            // findCart.quantity =
            if (findCart) {
                findCart.quantity = parseInt(findCart.quantity) + parseInt(cart.quantity)
            }
            const cartUpdate = [...filterCart, findCart ? findCart : cart]
            localStorage.setItem('cart', JSON.stringify(cartUpdate))
        }
        else {
            localStorage.setItem('cart', JSON.stringify([cart]))
        }

    }
    return (
        <tr>

            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className=" rounded-md w-12 h-12">
                            <img src={thumbnail} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{title}</div>
                        <Rating rating={rating} />
                    </div>
                </div>
            </td>
            <td>
                <span className="text-sm text-orange-500 font-bold">{brand}</span>
            </td>
            <td>
                <span className="text-sm text-orange-500 font-bold">{category}</span>
            </td>
            <td>
                <span className="text-sm text-green-500 font-bold">{stock > 0 ? stock : <p>Stock Out</p>}</span>
            </td>
            <td>
                <span className="text-sm font-bold">${price}</span>
            </td>


            <th>
                <form className='flex items-center' action="" onSubmit={(e) => AddToCartHandle(e, { id: id, price: price, product: title, thumbnail: thumbnail })}>
                    <input
                        type="number"
                        min='1'
                        max={stock}
                        name='quantity'
                        defaultValue='1'
                        className="input input-xs bg-gray-200 rounded-none"
                    />
                    <button className="btn btn-xs bg-black rounded-none">
                        <Shopping_cart_solid size='16' />
                    </button>
                </form>
            </th>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
            </th>
        </tr>
    );
};

export default Product;

const Rating = ({ rating }) => {
    const ratingFloor = Math.floor(rating);
    const ratingOr = (rating - ratingFloor) * 10 > 8 ? 2 : 1
    const ratingArr = ['bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-orange-500', 'bg-yellow-500', 'bg-yellow-500', 'bg-lime-500', 'bg-lime-500', 'bg-green-500', 'bg-green-500']
    return (
        <div>
            <div className="rating rating-xs rating-half">
                {
                    [...Array(10).keys()]?.map((r) => (
                        <input
                            key={r}
                            type="radio"
                            name="rating-10"
                            className={
                                (r % 2 == 0 ? 'mask-half-1' : 'mask-half-2') + " mask  mask-star-2 " +
                                (((ratingFloor * 2) + ratingOr - 1) >= r ? ratingArr[r] : '')
                            }
                            disabled={true}
                        />))
                }

                {/* <input type="radio" name="rating-10" className=" mask mask-star-2 mask-half-1" disabled={true} /> */}

            </div>
        </div>
    )
}