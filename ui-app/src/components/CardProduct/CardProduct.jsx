import images from '~/assets/images';

function CardProduct() {
    return (  
        <div className='bg-white w-48 h-72 relative'>
            <div className='absolute top-0 right-0 bg-[#feeeea]'>
                <span className='text-primary text-xs px-1 leading-none'>-50%</span>
            </div>
            <div>
                <img src={images.product} alt="product" />
            </div>
            <div className='absolute top-0'>
                <img src={images.currentEvent} alt="event" />
            </div>
            <div className='p-2 flex flex-col'>
                <div className='text-md leading-none line-clamp-2 max-h-12 overflow-hidden'>
                    Bộ HUB chuyển đổi 5 trong 1 / 6 trong 1 / 8 trong 1
                </div>
                <div className='flex justify-between mt-5'>
                    <div className='text-primary'>đ85.000</div>
                    <div className='text-sm'><span>Đã bán</span> 42</div>
                </div>
            </div>
        </div>
    );
}

export default CardProduct;