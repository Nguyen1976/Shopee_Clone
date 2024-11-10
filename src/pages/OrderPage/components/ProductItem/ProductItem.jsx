import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    decreaseAmount,
    increaseAmount,
    removeOrderProduct,
    removeOrderProductSelected,
    selectedOrder,
} from '~/redux/slices/OrderSlice';

function ProductItem({ item, checkedAll }) {
    const dispatch = useDispatch();

    const [checked, setChecked] = useState(false);

    const handleDecreaseAmount = () => {
        if (item.amount > 1) {
            dispatch(decreaseAmount({ idProduct: item.product }));
        }
    };

    const handleIncreaseAmount = () => {
        dispatch(increaseAmount({ idProduct: item.product }));
    };

    const handleRemoveProduct = () => {
        dispatch(removeOrderProduct({ idProduct: item.product }));
    };

    useEffect(() => {
        if (checked) {
            dispatch(selectedOrder({ idProduct: item.product }));
        } else {
            dispatch(removeOrderProductSelected({ idProduct: item.product }));
        }
    }, [checked, dispatch, item.product]);

    return (
        <li className="p-3 border-b-2 flex items-center justify-between">
            <div className="flex items-center gap-3 w-1/2">
                <input
                    className="rounded-sm"
                    type="checkbox"
                    checked={checkedAll || checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <img
                    className="object-cover h-20"
                    src={item.image[0]}
                    alt={item.name}
                />
                <div>{item.name}</div>
            </div>
            <div className="flex justify-between flex-1 mr-4">
                <div>{item.price}đ</div>
                <div className="h-9 w-32 border-1 rounded-sm border-zinc-300 text-zinc-300 text-center px-1 ml-5 flex items-center">
                    <button
                        className="h-full pr-1"
                        onClick={handleDecreaseAmount}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                        className="h-full w-3/5 text-center border-x-2 select-none"
                        type="number"
                        disabled
                        value={item.amount}
                    />
                    <button
                        className="h-full pl-1"
                        onClick={handleIncreaseAmount}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className="text-primary">đ{item.price * item.amount}</div>
                <button onClick={handleRemoveProduct}>
                    <FontAwesomeIcon className="text-primary" icon={faTrash} />
                </button>
            </div>
        </li>
    );
}

ProductItem.propTypes = {
    item: PropTypes.shape({
        product: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
    }).isRequired,
};

export default React.memo(ProductItem);
