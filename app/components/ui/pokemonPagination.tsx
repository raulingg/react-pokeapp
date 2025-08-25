import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

type Offset = number | null;

type PokemonPaginationProps = {
  next: Offset;
  prev: Offset;
};

export default function PokemonPagination({
  next,
  prev,
}: PokemonPaginationProps) {
  const isPrevDisabled = prev === null;
  const isNextDisabled = next === null;

  function handlePrevClick(event: React.SyntheticEvent) {
    if (isPrevDisabled) {
      event.preventDefault();
    }
  }

  function handleNextClick(event: React.SyntheticEvent) {
    if (isNextDisabled) {
      event.preventDefault();
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={`?offset=${prev}`}
            onClick={handlePrevClick}
            aria-disabled={isPrevDisabled}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            to={`?offset=${next}`}
            onClick={handleNextClick}
            aria-disabled={isNextDisabled}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
