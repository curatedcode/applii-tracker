import { BoardSectionProps } from "../customVariables";
import BoardSectionCard from "./BoardSectionCard";

export default function BoardSection({
  title,
  Icon,
  cards,
  sortBy,
}: BoardSectionProps) {
  return (
    <div
      className="flex w-full max-w-board-section flex-col items-center gap-2"
      data-testid={`${title} section`}
    >
      <div className="flex items-center justify-center gap-1 text-xl">
        {Icon}
        <h2 className="font-medium">{title}</h2>
      </div>
      <div className="content-scrollbar grid h-board-section w-full auto-rows-min gap-2 overflow-auto rounded-md border-[0.4rem] border-light-secondary bg-light-secondary p-[0.4rem] dark:border-dark-secondary dark:bg-dark-secondary">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <BoardSectionCard key={index} {...card} sortBy={sortBy} />
          ))
        ) : (
          <span className="mt-4 justify-self-center">
            Nothing to show yet...
          </span>
        )}
      </div>
    </div>
  );
}
