import React from 'react';
import PropTypes from 'prop-types';

import { formater } from '~/utils/formater';

function TotalItems({ totalItems }) {
    return (
        <div className="border-t-[1px] border-zinc-300 mt-5">
            <div className="p-6 flex justify-end gap-3">
                <span>Tồng số tiền (các sản phẩm) : </span>
                <span className="text-primary text-lg">
                    {formater(totalItems)}
                </span>
            </div>
        </div>
    );
}

TotalItems.propTypes = {
    totalItems: PropTypes.number,
};

export default React.memo(TotalItems);
