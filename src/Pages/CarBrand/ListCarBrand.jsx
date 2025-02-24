import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import DataTable from '../../Components/Tables/DataTable'
import { useAPP } from '../../contexts/Appcontext'

const ListCarBrand = () => {
    const { theme } = useAPP();
    const headers = [

        { key: 'title', label: 'Car Brand Title', isImage: false, sortable: true },
        { key: 'image', label: 'Car Brand Image', isImage: true, sortable: false }
    ]

    const data = Array.from({ length: 150 }, (_, i) => {
        const id = i + 1;
        // Cycle through these categories and statuses
        // const categories = ["Cars", "Trucks", "SUV", "Bikes"];
        const statuses = ["publish", "Draft"];
        const title = `Brand ${id}`;
        // const category = categories[id % categories.length];
        const status = statuses[id % statuses.length];
        // Use id in the random query parameter to get different images
        const image = `https://picsum.photos/80?random=${id}`;
        return { id, title,image, status };
      })
    return (
        <MainLayout>
            <section>
                <h1 className={`font-semibold mb-4 ${theme == 'dark' ? 'text-white' : 'color-2b'}`} style={{ fontSize: '24px' }}>Car Brand List Management
                </h1>
                <DataTable headers={headers} data={data} />
            </section>

        </MainLayout>
    )
}

export default ListCarBrand