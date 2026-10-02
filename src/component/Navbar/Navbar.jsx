function Navbar() {
  return (
    <nav className="w-full bg-[#5331BB] px-16 py-6">
      <div className="flex w-full items-center justify-between">
        {/* Left Side */}
        <div>
          <h1 className="text-[32px] font-bold tracking-wide text-[#F5F3FF]">
            Jaspreet Kaur Ahuja
          </h1>

          <p className="mt-1 text-[18px] text-[#E7E2FF]">
            Orchids International School, Noida
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-28 pr-8 text-[#F5F3FF]">
          <div className="text-center">
            <h2 className="text-[28px] font-bold">150</h2>
            <p className="mt-2 text-[17px]">Students</p>
          </div>

          <div className="text-center">
            <h2 className="text-[28px] font-bold">05</h2>
            <p className="mt-2 text-[17px]">Subjects</p>
          </div>

          <div className="text-center">
            <h2 className="text-[28px] font-bold">84</h2>
            <p className="mt-2 text-[17px]">Exams</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
