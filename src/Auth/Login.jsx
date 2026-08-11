function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 font-sans text-gray-800">

      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Sol Tərəf: Logo və Başlıq */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11c0 2.473.345 4.866.99 7.132m14.02 0c-.822-2.116-2.112-3.957-3.733-5.32" />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Admin Panele Giriş
              </h1>
              <p className="mt-3 text-gray-500 text-sm md:text-base leading-relaxed">
                İdarəetmə panelinə daxil olmaq üçün e-poçt və parolunuzu qeyd edin.
              </p>
            </div>
          </div>

          {/* Sağ Tərəf: Form UI */}
          <form className="space-y-5 bg-gray-50/50 p-6 md:p-8 rounded-2xl border border-gray-100">

            {/* E-mail */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="ornek@email.com"
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 text-sm transition-colors shadow-sm placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Parol */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Parol
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 002-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 text-sm transition-colors shadow-sm placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#forgot" className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Parolu unutmusunuz?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
            >
              Daxil Ol
            </button>
          </form>

        </div>
      </main>
    </div>
  )
}

export default Login