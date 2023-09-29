import { CardApplicationType } from "../customVariables";
import BoardSectionCard from "./BoardSectionCard";

export type BoardBlockProps = {
  title: "Need To Apply" | "Applied" | "Interviewing" | "Offer" | "Closed";
  Icon: React.ReactNode;
  cards: CardApplicationType[] | [];
};

export default function BoardSection({ title, Icon, cards }: BoardBlockProps) {
  return (
    <div
      className="flex flex-col items-center gap-2"
      data-testid={`${title} section`}
    >
      <div className="flex items-center justify-center gap-1 text-xl">
        {Icon}
        <h2 className="font-medium">{title}</h2>
      </div>
      <div className="board-section-scrollbar grid h-[26rem] w-80 gap-2 overflow-auto rounded-md border-[0.4rem] border-site-section bg-site-section p-[0.4rem]">
        {cards.length > 0 ? (
          cards.map((card, index) => <BoardSectionCard key={index} {...card} />)
        ) : (
          <span className="justify-self-center">Nothing to show yet...</span>
        )}
      </div>
    </div>
  );
}
