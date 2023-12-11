import { gql } from '@apollo/client';

//replaces createUser
export const CREATE_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
        token
        }
    }
`;

//replaces loginUser
export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            username
            email
        }
        }
    }    
`;

//replaces saveBook
export const SAVE_BOOK = gql`
    mutation Mutation($description: String!, $bookId: String!, $title: String!) {
        saveBook(description: $description, bookId: $bookId, title: $title) {
        _id
        authors
        bookId
        description
        image
        link
        title
        }
    }
`;

//replaces deleteBook
export const DELETE_BOOK = gql`
    mutation Mutation($bookId: String!) {
        deleteBook(bookId: $bookId) {
        _id
        title
        }
    }
`;

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  };
  