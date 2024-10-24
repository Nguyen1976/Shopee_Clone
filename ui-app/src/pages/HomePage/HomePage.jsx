import Slider from '~/components/Slider'
import images from '~/assets/images'

function HomePage() {

    return (
        <div className='container mx-auto sm:px-6 md:px-8 lg:px-40'>
            <div className='bg-white mt-7 flex gap-1'>
                <div className='w-2/3'>
                    <Slider />
                </div>
                <div className='w-1/3 flex flex-col gap-1'>
                    <div>
                        <img src={images.banner1} alt="banner1" />
                    </div>
                    <div>
                        <img src={images.banner1} alt="banner2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
