const BUTTONS = [
  { type: "recent", text: "Most Recent" },
  { type: "stars", text: "Most Stars" },
  { type: "forks", text: "Most Forks" },
];
const SortRepos = ({ sortType, onSort }) => {
  return (
    <div className="mb-2 flex justify-center lg:justify-end">
      {BUTTONS.map((item) => (
        <button
          key={item.type}
          onClick={() => onSort(`${item.type}`)}
          type="button"
          className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
          ${sortType === `${item.type}` ? " border-blue-500" : " "}          
          `}
        >
          {/* if get an error in sort check 1:45:48 */}
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default SortRepos;
