import React from 'react';
import MainLayout from '../../Components/Layouts/MainLayout';
import DataTable from '../../Components/Tables/DataTable';
import { useAPP } from '../../contexts/Appcontext';

const ListCar = () => {
  const { theme } = useAPP();

  // Define headers for the car data table
  const headers = [
    { key: 'name', label: 'Name', isImage: false, sortable: true },
    { key: 'image', label: 'Image', isImage: true, sortable: false },
    { key: 'number', label: 'Number', isImage: false, sortable: true },
    { key: 'owner', label: 'Owner', isImage: false, sortable: true },
  ];

  // Dummy arrays for generating random car data
  const carNames = [
    "Toyota Camry",
    "Honda Accord",
    "Ford Mustang",
    "Chevrolet Impala",
    "BMW 3 Series",
    "Audi A4",
    "Mercedes-Benz C-Class"
  ];
  const carNumbers = [
    "ABC-123",
    "XYZ-789",
    "LMN-456",
    "DEF-321",
    "GHI-654",
    "JKL-987",
    "QRS-246"
  ];
  const carStatuses = ["Available", "Sold", "Maintenance", "Reserved"];
  const carOwners = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie Black",
    "Diana Prince"
  ];

  // Generate dynamic dummy data for cars
  const data = Array.from({ length: 150 }, (_, i) => {
    const id = i + 1;
    const name = carNames[Math.floor(Math.random() * carNames.length)];
    const image = `https://picsum.photos/80?random=${i + 1}`; // Random image for each car
    const number = carNumbers[Math.floor(Math.random() * carNumbers.length)];
    const status = carStatuses[Math.floor(Math.random() * carStatuses.length)];
    const owner = carOwners[Math.floor(Math.random() * carOwners.length)];
    // The action field could be replaced with actual buttons/components later

    return { id, name, image, number, status, owner };
  });

  return (
    <MainLayout>
      <section>
        <h1
          className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          style={{ fontSize: '24px' }}
        >
          Car List Management
        </h1>
        <DataTable headers={headers} data={data} />
      </section>
    </MainLayout>
  );
};

export default ListCar;
