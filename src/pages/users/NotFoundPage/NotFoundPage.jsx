import { useEffect, useState } from 'react';

function NotFoundPage() {
    //Tạo ra để fix lỗi nhỏ tại App phần phân quyền cho admin truy cập cấc trang
    //khi không phải admin thì route return về null lên trang admin sẽ k tồn tại và hiện ra trang notFound này
    //Nhưng nó bị hiệu ứng là khi vào tragn admin với quyền là admin thì nó vẫn nhảy vào đây khoảng 1s r ms nhảy sang trang cần truy cập
    //Vậy lên t sẽ ẩn trang này đi khoảng 3s nếu thực sự k phải là admin thì sau 3s trang này sẽ hiện lên còn nếu pjhari thì phải 3s sau mới hiện trang lên nso chỉ lướt qua trang này.
    const [hidden, setHidden] = useState(true);
    useEffect(() => {
        const id = setTimeout(() => {
            setHidden(false);
        }, 1500);

        return () => clearTimeout(id);
    }, []);
    return (
        <>
            <div className={`${hidden ? 'hidden' : ''}`}>
                <div className="text-9xl text-center text-zinc-500">
                    Not Found
                </div>
                <div className="text-2xl text-zinc-600 text-center mt-5">
                    Đã có lỗi gì đó hãy thử lại sau ít phút
                </div>
            </div>
        </>
    );
}

export default NotFoundPage;
