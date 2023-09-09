import { CardApplicationType } from "../customVariables";
import BoardSectionCard from "./BoardSectionCard";

export type BoardBlockProps = {
  title: "Need To Apply" | "Applied" | "Interviewing" | "Offer" | "Closed";
  Icon: React.ReactNode;
  cards: CardApplicationType[] | [];
};

export default function BoardSection({ title, Icon, cards }: BoardBlockProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-1 items-center justify-center text-xl">
        {Icon}
        <h2 className="font-medium">{title}</h2>
      </div>
      <div className="bg-neutral-500 border-2 border-neutral-400 rounded-md px-3 py-3 h-[26rem] w-72 overflow-y-scroll board-section-scrollbar gap-2 grid">
        {cards.length > 0 ? (
          cards.map((card, index) => <BoardSectionCard key={index} {...card} />)
        ) : (
          <span className="justify-self-center">Nothing to show yet...</span>
        )}
      </div>
    </div>
  );
}
