import React from 'react';
import MainLayout from '../../Components/Layouts/MainLayout';
import DataTable from '../../Components/Tables/DataTable';
import { useAPP } from '../../contexts/Appcontext';

const ListCoupon = () => {
    const { theme } = useAPP();
    
    const headers = [
        { key: 'title', label: 'Title', isImage: false, sortable: true },
        { key: 'subtitle', label: 'Subtitle', isImage: false, sortable: true },
        { key: 'code', label: 'Code', isImage: false, sortable: true },
        { key: 'image', label: 'Image', isImage: true, sortable: false },
        { key: 'expiry', label: 'Expire Date', isImage: false, sortable: true },
        { key: 'minValue', label: 'Min Amount', isImage: false, sortable: true },
        { key: 'value', label: 'Discount', isImage: false, sortable: true },
    ];

    const titles = [
        "Special Discount", "Summer Sale", "Flash Offer", "Weekend Bonanza", "Holiday Deal"
    ];
    
    const subtitles = [
        "Limited Time Offer", "Exclusive for Members", "Hurry! Only Today", "Buy More, Save More", "Don't Miss Out"
    ];
    
    const statuses = ["Active", "Expired", "Upcoming"];
    
    const data = Array.from({ length: 150 }, (_, i) => {
        const id = i + 1;
        const title = titles[Math.floor(Math.random() * titles.length)];
        const subtitle = subtitles[Math.floor(Math.random() * subtitles.length)];
        const code = `COUPON${id}`;
        const image = `https://picsum.photos/80?random=${id}`;
        const expiry = `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
        const minValue = (Math.random() * 100 + 50).toFixed(2); // Between 50 and 150
        const value = (Math.random() * 30 + 5).toFixed(2); // Between 5 and 35
        const status = statuses[id % statuses.length];

        return { id, title, subtitle, code, image, expiry, minValue, value, status };
    });

    return (
        <MainLayout>
            <section>
                <h1 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'color-2b'}`} style={{ fontSize: '24px' }}>
                    Coupon List Management
                </h1>
                <DataTable headers={headers} data={data} />
            </section>
        </MainLayout>
    );
};

export default ListCoupon;
