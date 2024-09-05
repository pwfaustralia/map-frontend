import { typesenseMultiSearch } from '@/app/(actions)/typesense/actions';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import useDebounce from '@/lib/hooks/use-debounce';
import { INTERNAL_ROUTES } from '@/lib/routes';
import { getUniqueArray } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { MultiSearchRequestSchema } from 'typesense/lib/Typesense/MultiSearch';

export default function SearchClient({ open = false, onClose = () => {} }: { open?: boolean; onClose?: () => void }) {
  const inputRef = useRef<any>();
  const [isOpen, setIsOpen] = useState(open);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResponse<any>[]>([]);
  const { debouncedValue: _searchText, destroy } = useDebounce<string>(searchText, 500);

  const fetchData = async (params: MultiSearchRequestSchema) => {
    if (!params.q?.length) {
      setIsLoading(false);
      return;
    }
    let query = await typesenseMultiSearch({
      searches: [params],
    });
    setSearchResults(query.results);
    setIsLoading(false);
  };

  const handleClose = () => {
    setSearchResults([]);
    setSearchText('');
    setIsOpen(false);
    onClose();
    destroy();
  };

  useEffect(() => {
    if (!open || !_searchText) return;
    fetchData({
      q: _searchText,
      collection: 'clients',
      query_by: '*',
      page: 1,
      group_by: 'email',
      per_page: 50,
    });
  }, [_searchText, open]);

  useEffect(() => {
    setIsOpen(open!);
  }, [open]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="search-client"
          variants={{
            initial: { opacity: 0 },
            enter: {
              opacity: 1,
            },
          }}
          animate="enter"
          transition={{
            opacity: { duration: 0.1 },
          }}
          exit="initial"
          initial="initial"
          className="fixed inset-0 z-40 overflow-auto bg-black/40 backdrop-blur-[2px] flex flex-col justify-between items-center py-14"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <div></div>
          <motion.div
            variants={{
              initial: { transform: 'scale(0.7)' },
              enter: {
                transform: 'scale(1)',
              },
            }}
            transition={{
              transform: { type: 'spring', duration: 0.4 },
            }}
            animate="enter"
            exit="initial"
            initial="initial"
          >
            <Command className="height-auto rounded-lg border shadow-md md:min-w-[550px]" shouldFilter={false}>
              <CommandInput
                ref={inputRef}
                placeholder="Type a command or search..."
                onInput={(e) => {
                  destroy();
                  setSearchResults([]);
                  setIsLoading(true);
                  setSearchText(e.currentTarget.value);
                }}
              />
              <CommandList className="max-h-none">
                {isLoading && <CommandEmpty>Searching...</CommandEmpty>}
                {searchResults[0]?.found === 0 && <CommandEmpty>No results found.</CommandEmpty>}
                {searchResults[0]?.found > 0 && (
                  <CommandGroup heading="Search Results">
                    {searchResults[0].grouped_hits?.map((q) => {
                      let hit = q.hits[0];
                      let description =
                        hit.highlights
                          ?.map((q) => q.snippet)
                          .slice(0, 4)
                          .join(' | ') || '';
                      return (
                        <CommandItem className="cursor-pointer my-3" asChild key={hit.document.id}>
                          <Link
                            href={INTERNAL_ROUTES['My Clients'].path + '/' + hit.document.user_id}
                            onClick={() => onClose()}
                          >
                            <div className="flex flex-col">
                              <div className="flex space-x-1 items-center">
                                <UsersIcon className="mr-2 h-4 w-4" />
                                <h3 className="font-semibold text-md">
                                  {hit.document.first_name} {hit.document.last_name} ({hit.document.email})
                                </h3>
                              </div>
                              <span className="pl-7" dangerouslySetInnerHTML={{ __html: description }} />
                            </div>
                          </Link>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
                {searchText.length === 0 && (
                  <CommandGroup heading="Suggestions">
                    <CommandItem className="cursor-pointer" asChild>
                      <Link href={INTERNAL_ROUTES['My Clients'].path} onClick={() => onClose()}>
                        <UsersIcon className="mr-2 h-4 w-4" />
                        <span>View Clients</span>
                      </Link>
                    </CommandItem>
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </motion.div>
          <div></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
