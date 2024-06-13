export const ElectionHeader = ({ election }) => {
  return (
    <div className="flex items-center w-full gap-10 px-4 capitalize bg-white/40 h-11">
      <span>{election.name}</span>{" "}
      <span
        className={`text-xs flex justify-center px-2 py-1 border shadow-md rounded ${
          election.status === "PENDING"
            ? "bg-orange-400/35 text-orange-800 shadow-orange-800 border-orange-800"
            : election.status === "OPEN"
            ? "bg-emerald-400/35 text-emerald-800 shadow-emerald-800 border-emerald-800"
            : "bg-red-400/35 text-red-800 shadow-red-800 border-red-800"
        }`}
      >
        {election.status}
      </span>
    </div>
  );
};
