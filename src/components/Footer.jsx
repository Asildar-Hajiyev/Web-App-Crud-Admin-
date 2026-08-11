function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} My Company. Bütün hüquqlar qorunur.</p>
      </div>
    </footer>
  )
}

export default Footer