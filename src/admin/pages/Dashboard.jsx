import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/userSlice";

function Dashboard() {
 const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.user);

  useEffect(()=>{
    dispatch(getUser())
  },[dispatch])
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
    <div className="space-y-6">
      {/* Salamlama */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Xoş gəldiniz 👋</h2>
        <p className="text-sm text-gray-500 mt-1">
          Admin panelin ümumi vəziyyətinə buradan baxa bilərsiniz.
        </p>
      </div>

      {/* Sadə statistik kartlar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold uppercase text-gray-400">
            Məhsullar
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{data.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold uppercase text-gray-400">
            Sifarişlər
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">0</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold uppercase text-gray-400">
            İstifadəçilər
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
