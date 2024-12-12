import { useEffect, useState } from 'react';

import Loading from '~/components/Loading';
import * as ProductService from '~/services/ProductService';

function ProductAdminPage() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await ProductService.getAllProduct();
                console.log(res);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    return <Loading isLoading={isLoading}></Loading>;
}

export default ProductAdminPage;
