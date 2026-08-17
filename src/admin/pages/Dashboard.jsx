import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/userSlice";
import { getData } from "../../redux/counterSlice";
import { Link } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  
  // Redux store-dan həm istifadəçi, həm də sifariş/məhsul məlumatlarını çəkirik
  const { data: users, loading: usersLoading, error: usersError } = useSelector((state) => state.user);
  const { data: orders, loading: ordersLoading } = useSelector((state) => state.counter);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getData());
  }, [dispatch]);

  const isLoading = usersLoading || ordersLoading;

  if (isLoading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4">
          Xəta baş verdi: {usersError}
        </div>
      </div>
    );
  }

  // Son 5 istifadəçi
  const recentUsers = users.slice(-5).reverse();

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header / Salamlama */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Xoş gəldiniz 👋</h1>
          <p className="text-sm text-gray-500 mt-1">
            Admin panelin ümumi statistikasını və son fəaliyyətləri buradan izləyə bilərsiniz.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/admin/users"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            + Yeni İstifadəçi
          </Link>
          <Link
            to="/admin/orders"
            className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            Sifarişlərə keç
          </Link>
        </div>
      </div>

      {/* Statistik Kartlar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kart 1: İstifadəçilər */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              İstifadəçilər
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
            <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">
              ● Aktiv bazada
            </span>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>

        {/* Kart 2: Sifarişlər / Məhsullar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Sifarişlər / Məhsullar
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
            <span className="text-xs text-blue-600 font-medium mt-1 inline-block">
              Ümumi qeydiyyat
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>

        {/* Kart 3: Ümumi Qiymət Həcmi */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Məhsul Dəyəri
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {orders.reduce((acc, item) => acc + (Number(item.price) || 0), 0)} ₼
            </p>
            <span className="text-xs text-gray-400 font-medium mt-1 inline-block">
              Katalog dəyəri
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Kart 4: Sistem Statusu */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Sistem Statusu
            </p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">Aktiv</p>
            <span className="text-xs text-gray-400 font-medium mt-1 inline-block">
              Server: Normal
            </span>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Əsas Kontent Bölməsi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Tərəf: Son Əlavə Olunan İstifadəçilər (2 kolon) */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-900">Son Əlavə Olunan İstifadəçilər</h2>
            <Link to="/admin/users" className="text-xs text-blue-600 font-semibold hover:underline">
              Hamısına bax →
            </Link>
          </div>

          {recentUsers.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8">
              Məlumat tapılmadı
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentUsers.map((u) => (
                <div key={u.id} className="py-3 flex items-center justify-between gap-3 hover:bg-gray-50/50 rounded-lg px-2 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={u.image || "https://via.placeholder.com/40"}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 bg-gray-100 border border-gray-100"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {u.name} {u.surname}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{u.phone}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full shrink-0">
                    {u.age} yaş
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sağ Tərəf: Qısayollar və Sistem Bildirişləri (1 kolon) */}
        <div className="space-y-6">
          {/* Qısayollar */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Sürətli Əməliyyatlar
            </h2>
            <div className="space-y-2">
              <Link
                to="/admin/users"
                className="w-full flex items-center justify-between p-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
              >
                <span>İstifadəçiləri idarə et</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                to="/admin/orders"
                className="w-full flex items-center justify-between p-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
              >
                <span>Sifariş siyahısını aç</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

             
            </div>
          </div>

          {/* Sistem Qeydi */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="font-semibold text-sm">💡 Tövsiyə</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              İstifadəçi məlumatlarını mütəmadi olaraq yeniləyin və silinmə əməliyyatlarında diqqətli olun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;