import { useEffect } from "react";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 font-sans text-gray-800 py-8 sm:py-12 px-4 sm:px-6">
      <main className="max-w-5xl mx-auto flex flex-col justify-center space-y-8 sm:space-y-12">

        {/* Hero / Başlıq Hissəsi */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Haqqımızda
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            İnnovativ və Təhlükəsiz İdarəetmə Paneli
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            Biz platformamız vasitəsilə istifadəçilərə rahat, sürətli və müasir idarəetmə təcrübəsi təqdim edirik.
          </p>
        </div>

        {/* Info Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

          {/* Kart 1: Yüksək Sürət */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all space-y-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Yüksək Sürət</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Müasir texnologiyalarla qurulmuş interfeysimiz sayəsində bütün əməliyyatlarınızı anında həyata keçirin.
            </p>
          </div>

          {/* Kart 2: Təhlükəsizlik */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all space-y-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 002-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Təhlükəsizlik</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Məlumatlarınız tam təhlükəsiz şəraitdə saxlanılır və icazəsiz girişlərdən qorunur.
            </p>
          </div>

          {/* Kart 3: İntuitiv UI */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all space-y-3 sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">İntuitiv UI</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              İstifadəçi dostu dizaynımız sayəsində istənilən paneli və parametri rahatlıqla idarə edin.
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}

export default About