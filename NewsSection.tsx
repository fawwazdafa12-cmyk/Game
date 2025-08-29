
import React from 'react';
import { NewsArticle } from '../types.ts';
import { ChevronRightIcon } from './icons/index.tsx';

interface NewsSectionProps {
  articles: NewsArticle[];
}

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
    <div className="flex-shrink-0 w-64 md:w-auto bg-gray-800 border border-gray-700 rounded-xl overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-1">
        <img src={article.imageUrl} alt={article.title} className="w-full h-32 object-cover"/>
        <div className="p-4">
            <h3 className="font-bold text-sm text-gray-200 leading-tight group-hover:text-[#7F1DFF] transition-colors">{article.title}</h3>
        </div>
    </div>
);

const NewsSection: React.FC<NewsSectionProps> = ({ articles }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-white">Berita & Informasi</h2>
        <a href="#" className="text-sm font-bold text-white hover:text-[#38BDF8] flex items-center transition-colors">
          Lihat semua
          <ChevronRightIcon className="w-4 h-4 ml-1" />
        </a>
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar md:contents">
            {articles.map(article => (
                <NewsCard key={article.id} article={article} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;