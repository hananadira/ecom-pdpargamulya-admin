export default function Example() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2"> {/* Grid dengan dua kolom */}
        
        {/* Kartu Pertama */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
          <div className="px-8 pt-8"> {/* Flex-1 membuat bagian konten tumbuh */}
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
              Master 1
            </p>
          </div>
        </div>

        {/* Kartu Kedua */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
          <div className="px-8 pt-8 flex-1"> {/* Flex-1 juga diterapkan di sini */}
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
              Master 2
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
