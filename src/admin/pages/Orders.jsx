import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { getData, addData, updateData, deleteData } from "../../redux/counterSlice";
import { orderValidationSchema, initialOrderValues } from "../../schemas/AdminModalProductSchemas";

function Orders() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.counter);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  // Formik Quraşdırılması
  const formik = useFormik({
    initialValues: initialOrderValues,
    validationSchema: orderValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        if (editingItem) {
          await dispatch(
            updateData({ id: editingItem.id, updatedData: values })
          ).unwrap();
          toast.success("Məhsul uğurla yeniləndi");
        } else {
          await dispatch(addData(values)).unwrap();
          toast.success("Məhsul uğurla əlavə olundu");
        }
        closeModal();
        resetForm();
      } catch (err) {
        toast.error("Xəta baş verdi: " + (err.message || "Uğursuz əməliyyat"));
      } finally {
        setSubmitting(false);
      }
    },
  });

  const openCreateModal = () => {
    setEditingItem(null);
    formik.resetForm({ values: initialOrderValues });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    formik.resetForm({
      values: {
        name: item.name || item.title || "",
        price: item.price || "",
        image: item.image || "",
      },
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    formik.resetForm({ values: initialOrderValues });
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteData(deleteTarget.id)).unwrap();
      toast.success("Məhsul silindi");
      setDeleteTarget(null);
    } catch (err) {
      toast.error("Silinmə xətası: " + (err.message || "Uğursuz əməliyyat"));
    }
  };

  // Axtarış üzrə filtrləmə
  const filteredData = data.filter((item) => {
    const itemName = item.name || item.title || "";
    return itemName.toLowerCase().includes(search.toLowerCase());
  });

  // Ümumi statistika
  const totalValue = data.reduce(
    (acc, item) => acc + (Number(item.price) || 0),
    0
  );

  if (loading && data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4">
          Xəta baş verdi: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Məhsullar / Sifarişlər</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Mövcud məhsulları idarə edin, yenisini əlavə edin və ya məlumatları yeniləyin.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Yeni Məhsul Əlavə Et
        </button>
      </div>

      {/* Mini Statistika & Axtarış Barı */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase">Ümumi Məhsul</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{data.length}</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase">Ümumi Məbləğ</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{totalValue.toLocaleString()} ₼</p>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Axtarış Inputu */}
        <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex items-center px-3">
          <svg className="w-5 h-5 text-gray-400 shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Məhsul adı ilə axtar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Cədvəl */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/60 border-b border-gray-100 text-gray-400 uppercase text-[11px] font-semibold tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Məhsul</th>
                <th className="px-5 py-3.5">ID</th>
                <th className="px-5 py-3.5">Qiymət</th>
                <th className="px-5 py-3.5 text-right">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item) => {
                const itemName = item.name || item.title || "Adsız Məhsul";
                return (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || "https://via.placeholder.com/40"}
                          alt={itemName}
                          className="w-9 h-9 rounded-lg object-cover bg-gray-100 border border-gray-100 shrink-0"
                        />
                        <span className="truncate max-w-[200px] sm:max-w-xs">{itemName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 font-mono text-xs">#{item.id}</td>
                    <td className="px-5 py-3.5 text-gray-900 font-semibold">
                      {item.price ? `${item.price} ₼` : "-"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          Redaktə
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-gray-400 text-sm">
                    {search ? "Axtarışa uyğun məhsul tapılmadı." : "Siyahı boşdur."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900">
                {editingItem ? "Məhsulu Redaktə Et" : "Yeni Məhsul Əlavə Et"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Məhsul Adı */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Məhsul Adı
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Məs: iPhone 15 Pro"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                      : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
                )}
              </div>

              {/* Qiymət */}
              <div>
                <label htmlFor="price" className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Qiymət (₼)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Məs: 2499"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                    formik.touched.price && formik.errors.price
                      ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                      : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-xs text-red-500 mt-1">{formik.errors.price}</p>
                )}
              </div>

              {/* Şəkil URL */}
              <div>
                <label htmlFor="image" className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Şəkil URL-i (İsteğe bağlı)
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.image}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                    formik.touched.image && formik.errors.image
                      ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                      : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {formik.touched.image && formik.errors.image && (
                  <p className="text-xs text-red-500 mt-1">{formik.errors.image}</p>
                )}
              </div>

              {/* Action Düymələri */}
              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="px-4 py-2.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-colors shadow-sm"
                >
                  {formik.isSubmitting ? "Yüklənir..." : "Yadda Saxla"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-base font-bold text-gray-900">Məhsul silinsin?</h2>
              <p className="text-xs text-gray-500">
                "<span className="font-semibold text-gray-700">{deleteTarget.name || deleteTarget.title}</span>" həmişəlik silinəcək. Bu əməliyyatı geri qaytarmaq mümkün deyil.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="w-1/2 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Ləğv et
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="w-1/2 py-2.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors shadow-sm"
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