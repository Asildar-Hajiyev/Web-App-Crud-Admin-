
function Dashboard() {
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
          <p className="text-xs font-semibold uppercase text-gray-400">Məhsullar</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">0</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold uppercase text-gray-400">Sifarişlər</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">0</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold uppercase text-gray-400">İstifadəçilər</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">0</p>
        </div>

      </div>

    </div>
  )
}

export default Dashboard
