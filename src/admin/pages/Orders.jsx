import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, addData, updateData, deleteData } from "../../redux/counterSlice";
import { toast } from "react-toastify";

function Orders() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.counter);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null = yeni əlavə, obyekt = redaktə
  const [form, setForm] = useState({ name: "", price: "" });
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  // Modal açanda: yeni ya redaktə
  const openCreateModal = () => {
    setEditingItem(null);
    setForm({ name: "", price: "" });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({ name: item.name, price: item.price });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        // UPDATE
        await dispatch(updateData({ id: editingItem.id, updatedData: form })).unwrap();
        toast.success("Yeniləndi");
      } else {
        // CREATE
        await dispatch(addData(form)).unwrap();
        toast.success("Əlavə olundu");
      }
      closeModal();
    } catch (err) {
      toast.error("Xəta baş verdi: " + err.message);
    }
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteData(deleteTarget.id)).unwrap();
      toast.success("Silindi");
      setDeleteTarget(null);
    } catch (err) {
      toast.error("Silinmə xətası: " + err.message);
    }
  };

  if (loading && data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-600 text-sm">Xəta: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Sifarişlər</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Yeni əlavə et
        </button>
      </div>

      {/* Cədvəl */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">Ad</th>
              <th className="px-4 py-3 font-medium">Qiymət</th>
              <th className="px-4 py-3 font-medium text-right">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800">{item.name}</td>
                <td className="px-4 py-3 text-gray-800">{item.price}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-blue-600 hover:underline text-xs font-medium"
                  >
                    Redaktə
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="text-red-600 hover:underline text-xs font-medium"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                  Məlumat yoxdur
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {editingItem ? "Redaktə et" : "Yeni əlavə et"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Ad</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Qiymət</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  Yadda saxla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Silmək istəyirsiniz?</h2>
            <p className="text-sm text-gray-500">
              "{deleteTarget.name}" həmişəlik siləcək. Bu əməliyyatı geri qaytarmaq olmaz.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Ləğv et
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;