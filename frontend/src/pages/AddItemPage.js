// src/pages/AddItemPage.js
import Sidebar from '../components/Sidebar';
import AddNewItemForm from '../components/AddNewItemForm';

export default function AddItemPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <AddNewItemForm />
      </div>
    </div>
  );
}
