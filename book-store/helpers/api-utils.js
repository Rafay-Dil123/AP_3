import data from '../Data.json'

export const getAllbooks=()=>{
    return data.books;
}
export const getBookById=(id)=>{
    return data.books.find((i)=>{
        return i.id===id
    });
}

export const getFeaturedBooks = () => {
    return data.books
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3); // Get top 3 rated books
};

export const getBooksByGenre = (genreId) => {
    return data.books.filter(book => book.genreId === genreId);
};
export const getAllGenres = () => {
    return data.genres;
};
export const getAllAuthors=()=>{
    return data.authors;
};
  
export const getGenreById = (id) => {
    return data.genres.find(genre => genre.id === id);
};
export const getAuthorById=(id)=>{
    return data.authors.find((i)=>{
        return i.id===id
    });
}