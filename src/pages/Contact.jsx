import { useEffect } from "react";

function Contact() {
      useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 font-sans text-gray-800">
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 space-y-8">
          {/* Başlıq */}
          <div className="text-center space-y-3">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Əlaqə
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Bizimlə Əlaqə Saxlayın
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Suallarınız, təklifləriniz və ya dəstək üçün aşağıdakı əlaqə
              vasitələrindən istifadə edə bilərsiniz.
            </p>
          </div>

          {/* Əlaqə Məlumatları Grid-i */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* E-poçt */}
            <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-gray-400">
                  E-poçt
                </p>
                <p className="text-sm md:text-base font-semibold text-gray-800 truncate">
                  info@example.com
                </p>
              </div>
            </div>

            {/* Telefon */}
            <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Telefon
                </p>
                <p className="text-sm md:text-base font-semibold text-gray-800">
                  +994 (50) 000-00-00
                </p>
              </div>
            </div>

            {/* Ünvan */}
            <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors sm:col-span-2">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Ünvan
                </p>
                <p className="text-sm md:text-base font-semibold text-gray-800">
                  Bakı şəhəri, Nərimanov r., Əhməd Rəcəbli küç.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contact;
