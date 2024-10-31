import images from '~/assets/images';

function CardProduct({
    countInStock = '',
    price = '',
    image = '',
    name = '',
    discount = '',

}) {
    return (  
        <div className='bg-white w-48 h-72 relative'>
            {discount && <div className='absolute top-0 right-0 bg-[#feeeea]'>
                <span className='text-primary text-xs px-1 leading-none'>-{discount}%</span>
            </div>}
            <div className='h-48'>
                <img className='object-cover h-full' src={image} alt="product" />
            </div>
            <div className='absolute top-0'>
                <img src={images.currentEvent} alt="event" />
            </div>
            <div className='p-2 flex flex-col'>
                <div className='text-md leading-none line-clamp-2 max-h-12 overflow-hidden'>
                    {name}
                </div>
                <div className='flex justify-between mt-5 items-center'>
                    <div className='text-primary line-clamp-1 overflow-hidden'>đ{price}</div>
                    <div className='text-sm line-clamp-1 overflow-hidden ml-2'><span>Còn</span> {countInStock} <span>sản phẩm</span></div>
                </div>
            </div>
        </div>
    );
}

export default CardProduct;