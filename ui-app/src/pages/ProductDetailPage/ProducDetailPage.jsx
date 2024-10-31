import { useParams } from "react-router-dom";

function ProducDetailPage() {
    const param = useParams();
    console.log(param.id);
    return (  
        <>ProducDetailPage</>
    );
}

export default ProducDetailPage;