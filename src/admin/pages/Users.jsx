import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../../redux/userSlice";
import { toast } from "react-toastify";

function Users() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const SubmitHandle = (e) => {
    e.preventDefault(); //bu bizim datamizin submit olmasini gozleyir

    //eger tutaq ki image yoxdursa bos gonderme ve s.
    if(!image || !age || !name || !surname || !phone){
      toast.error("Zəhmət olmasa bütün sahələri doldurun")
      return
    }

    if (editId) {
      dispatch(
        updateUser({
          id: editId,
          updateUser: { image, name, surname, phone, age },
        }),
      );
      setEditId(null); // redaktə bitdi, geri "əlavə et" rejiminə qayıt
    } else {
      dispatch(createUser({ image, name, surname, phone, age }));
    }

    // formu təmizləyirik
    setImage("");
    setName("");
    setSurname("");
    setPhone("");
    setAge("");
  };
  // "Redaktə" düyməsinə basanda: formu köhnə dəyərlərlə doldur
  const editHandleClick = (item) => {
    setName(item.name);
    setSurname(item.surname);
    setAge(item.age);
    setImage(item.image);
    setPhone(item.phone);
    setEditId(item.id);
  };

  const deleteHandle = (id) => {
    dispatch(deleteUser(id));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4">
          Xəta: {error}
        </div>
      </div>
    );
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-xl font-bold text-gray-900">İstifadəçilər</h1>

      {/* Form kartı */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          {editId ? "İstifadəçini redaktə et" : "Yeni istifadəçi əlavə et"}
        </h2>
        <form
          onSubmit={SubmitHandle}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
        >
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Şəkil URL"
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ad"
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors"
          />
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Soyad"
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon"
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors"
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Yaş"
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-colors"
          />

          <div className="sm:col-span-2 lg:col-span-5 pt-1">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              {editId ? "Yenilə" : "Əlavə et"}
            </button>
          </div>
        </form>
      </div>

      {/* Siyahı */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {data.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-10">
            Heç bir istifadəçi tapılmadı
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {data.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4 hover:bg-gray-50/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0 bg-gray-100"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {item.name} {item.surname}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.phone} · {item.age} yaş
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => editHandleClick(item)}
                    className="text-blue-600 hover:bg-blue-50 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Redaktə
                  </button>
                  <button
                    onClick={() => deleteHandle(item.id)}
                    className="text-red-600 hover:bg-red-50 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Users;
