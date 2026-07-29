export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
        R
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Restor
        </h1>

        <p className="text-xs text-gray-500">
          Food Delivery
        </p>
      </div>
    </div>
  );
}