import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_CULxlDpc.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://ubikala.com");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { currentPage, totalPages, baseUrl, preserveParams = {} } = Astro2.props;
  function buildUrl(page) {
    const params = new URLSearchParams(preserveParams);
    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }
  function getPageNumbers() {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("ellipsis");
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }
      pages.push(totalPages);
    }
    return pages;
  }
  const pageNumbers = getPageNumbers();
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;
  return renderTemplate`${totalPages > 1 && renderTemplate`${maybeRenderHead()}<nav class="flex items-center justify-center gap-1 sm:gap-2" aria-label="Paginación"><!-- Previous button -->${hasPrevious ? renderTemplate`<a${addAttribute(buildUrl(currentPage - 1), "href")} class="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1" aria-label="Página anterior"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg><span class="hidden sm:inline">Anterior</span></a>` : renderTemplate`<span class="px-3 py-2 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg><span class="hidden sm:inline">Anterior</span></span>`}<!-- Page numbers --><div class="flex items-center gap-1">${pageNumbers.map((page) => page === "ellipsis" ? renderTemplate`<span class="px-2 py-2 text-gray-400">...</span>` : page === currentPage ? renderTemplate`<span class="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium" aria-current="page">${page}</span>` : renderTemplate`<a${addAttribute(buildUrl(page), "href")} class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">${page}</a>`)}</div><!-- Next button -->${hasNext ? renderTemplate`<a${addAttribute(buildUrl(currentPage + 1), "href")} class="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1" aria-label="Página siguiente"><span class="hidden sm:inline">Siguiente</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a>` : renderTemplate`<span class="px-3 py-2 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed flex items-center gap-1"><span class="hidden sm:inline">Siguiente</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></span>`}</nav>`}`;
}, "D:/portal PropiedadEnRD.com/src/components/Pagination.astro", void 0);

export { $$Pagination as $ };
