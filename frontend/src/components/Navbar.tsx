interface NavbarProps {
  view: 'form' | 'admin';
  setView: (view: 'form' | 'admin') => void;
}

const Navbar = ({ view, setView }: NavbarProps) => {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Company Incorporation Tool</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setView('form')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'form' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Form
            </button>
            <button
              onClick={() => setView('admin')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'admin' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;